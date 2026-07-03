import type { GitHubRepo } from "./types";
import { GITHUB_API_URL } from "./constants";

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API_URL}?type=public&sort=updated&per_page=100`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  return res.json();
}
