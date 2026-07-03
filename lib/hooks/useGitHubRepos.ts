"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchRepos } from "../github";
import type { GitHubRepo } from "../types";

const CACHE_KEY = "github_repos_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
}

function getCachedRepos(): GitHubRepo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCachedRepos(data: GitHubRepo[]) {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage full or unavailable
  }
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cached = getCachedRepos();
    if (cached) {
      setRepos(cached);
      setLoading(false);
      // Still fetch fresh data in background
      fetchRepos()
        .then((fresh) => {
          setRepos(fresh);
          setCachedRepos(fresh);
        })
        .catch(() => {});
      return;
    }

    let lastError: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await fetchRepos();
        setRepos(data);
        setCachedRepos(data);
        setLoading(false);
        return;
      } catch (e) {
        lastError = e instanceof Error ? e : new Error("Failed to fetch repos");
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        }
      }
    }

    setError(lastError?.message || "Failed to fetch repos");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return { repos, loading, error, refetch: loadRepos };
}
