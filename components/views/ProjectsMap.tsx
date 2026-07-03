"use client";

import { useState } from "react";
import { GridCanvas } from "@/components/map/GridCanvas";
import { Waypoint } from "@/components/map/Waypoint";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { INITIAL_PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

export function ProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { repos, loading } = useGitHubRepos();

  const projects: Project[] = repos.map((repo, i) => ({
    id: repo.name,
    title: repo.name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: repo.description || "No description available.",
    category: repo.language || "Code",
    techStack: repo.topics.length > 0 ? repo.topics : [repo.language || "Various"],
    liveUrl: repo.homepage || "",
    repoUrl: repo.html_url,
    languages: {},
    commits: 0,
    gridPosition: {
      x: 15 + (i % 4) * 22,
      y: 20 + Math.floor(i / 4) * 30,
    },
  }));

  const displayProjects = loading ? INITIAL_PROJECTS : projects;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GridCanvas />

      <div className="absolute inset-0">
        {displayProjects.map((project) => (
          <Waypoint
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      <div className="absolute top-5 left-6 z-10">
        <h2 className="font-display text-lg font-bold text-silver tracking-tight">
          Project Navigator
        </h2>
        <p className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mt-1">
          {displayProjects.length} repositories mapped
        </p>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
