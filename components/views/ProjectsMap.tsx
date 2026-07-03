"use client";

import { useState } from "react";
import { Search, Plus, Minus, Crosshair, Layers, MapPin } from "lucide-react";
import { WorldMap } from "@/components/map/WorldMap";
import { Waypoint } from "@/components/map/Waypoint";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { INITIAL_PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

export function ProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const displayProjects = loading || projects.length === 0 ? INITIAL_PROJECTS : projects;

  const filteredProjects = searchQuery
    ? displayProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayProjects;

  return (
    <div className="relative min-h-full md:h-full w-full overflow-hidden">
      <WorldMap />

      {/* Map pins */}
      <div className="absolute inset-0">
        {filteredProjects.map((project) => (
          <Waypoint
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Top bar - Title + Search */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-silver tracking-tight flex items-center gap-2">
            <MapPin className="w-4 h-4 text-coral" />
            Project Navigator
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mt-1">
            {filteredProjects.length} locations &middot; Live GPS
          </p>
        </div>

        {/* Search bar */}
        <div className="glass-premium rounded-xl px-3 py-2 flex items-center gap-2 w-52">
          <Search className="w-3.5 h-3.5 text-silver-dim" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs font-mono text-silver placeholder:text-silver-dim/50 outline-none w-full"
          />
        </div>
      </div>

      {/* Right controls - Zoom */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
        <button className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver transition-colors">
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver transition-colors">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="w-8 h-px bg-white/5 my-1" />
        <button className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-coral transition-colors">
          <Crosshair className="w-3.5 h-3.5" />
        </button>
        <button className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver transition-colors">
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
        <div className="glass-premium rounded-xl px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-[10px] font-mono text-silver-dim">Live</span>
            </div>
            <div className="text-[10px] font-mono text-silver-dim">
              {loading ? "Syncing..." : `${displayProjects.length} repos`}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-silver-dim">
              6.45&deg;N &middot; 3.39&deg;E
            </span>
            <div className="text-[10px] font-mono text-coral">
              Lagos, NG
            </div>
          </div>
        </div>
      </div>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
