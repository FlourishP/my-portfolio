"use client";

import { useState, useCallback } from "react";
import { Search, Plus, Minus, Crosshair, Layers, MapPin } from "lucide-react";
import { WorldMap } from "@/components/map/WorldMap";
import { Waypoint } from "@/components/map/Waypoint";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { INITIAL_PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function ProjectsMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
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

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleCenter = useCallback(() => {
    setZoom(1);
  }, []);

  const handleToggleGrid = useCallback(() => {
    setShowGrid((g) => !g);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map container with zoom */}
      <div
        className="absolute inset-0 transition-transform duration-150 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <WorldMap showGrid={showGrid} />
      </div>

      {/* Map pins */}
      <div
        className="absolute inset-0 transition-transform duration-150 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        {filteredProjects.map((project) => (
          <Waypoint
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-3 md:p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-base sm:text-lg font-bold text-silver tracking-tight flex items-center gap-2">
            <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
            <span className="truncate">Project Navigator</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mt-1">
            {filteredProjects.length} locations
          </p>
        </div>

        <div className="glass-premium rounded-xl px-3 py-2 flex items-center gap-2 w-40 sm:w-48 md:w-52 flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-silver-dim flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs font-mono text-silver placeholder:text-silver-dim/50 outline-none w-full min-w-0"
          />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver hover:bg-white/5 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver hover:bg-white/5 transition-all active:scale-95"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="w-8 h-px bg-white/5 my-1" />
        <button
          onClick={handleCenter}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-coral hover:bg-coral/5 transition-all active:scale-95"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleToggleGrid}
          className={`glass-premium w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
            showGrid ? "text-coral bg-coral/10" : "text-silver-dim hover:text-silver hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
        <div className="glass-premium w-8 h-6 rounded-md flex items-center justify-center mt-1">
          <span className="text-[9px] font-mono text-silver-dim">{Math.round(zoom * 100)}%</span>
        </div>
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
              {Math.round(zoom * 100)}%
            </span>
            <div className="w-1 h-1 rounded-full bg-silver-dim/30" />
            <span className="text-[10px] font-mono text-silver-dim">
              Grid: {showGrid ? "ON" : "OFF"}
            </span>
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
