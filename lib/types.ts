export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
}

export type ViewType =
  | "navigation"
  | "media"
  | "climate"
  | "designs"
  | "settings";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  languages: Record<string, number>;
  commits: number;
  gridPosition: { x: number; y: number };
}

export interface SkillTrack {
  number: string;
  name: string;
  category: string;
}
