"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Search, Plus, Minus, Crosshair, Layers, MapPin, BarChart3 } from "lucide-react";
import { WorldMap } from "@/components/map/WorldMap";
import { Waypoint } from "@/components/map/Waypoint";
import { ProjectDrawer } from "@/components/map/ProjectDrawer";
import Ferrofluid from "@/components/ui/Ferrofluid";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { INITIAL_PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

interface ProjectsMapProps {
  onShowHud?: (show: boolean) => void;
}

export function ProjectsMap({ onShowHud }: ProjectsMapProps) {
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
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Ferrofluid
          colors={["#FF5733", "#6C3AED", "#A855F7"]}
          speed={0.3}
          scale={1.2}
          turbulence={0.6}
          fluidity={0.15}
          rimWidth={0.15}
          sharpness={3}
          shimmer={0.8}
          glow={1.5}
          flowDirection="down"
          opacity={0.35}
          mouseInteraction={false}
        />
      </div>

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

        <div className="glass-premium rounded-xl px-3 py-2 flex items-center gap-2 w-40 sm:w-48 md:w-52 flex-shrink-0 border border-white/[0.06]">
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

      {/* Right controls */}
      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
        {/* Developer stats button */}
        {onShowHud && (
          <motion.button
            onClick={() => onShowHud(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-coral hover:bg-coral/10 hover:shadow-[0_0_8px_rgba(255,87,51,0.2)] border border-white/[0.06] transition-all md:hidden"
            title="Developer Stats"
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </motion.button>
        )}
        <motion.button
          onClick={handleZoomIn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver hover:bg-white/[0.06] border border-white/[0.06] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.button>
        <motion.button
          onClick={handleZoomOut}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-silver hover:bg-white/[0.06] border border-white/[0.06] transition-all"
        >
          <Minus className="w-3.5 h-3.5" />
        </motion.button>
        <div className="w-8 h-px bg-white/[0.06] my-1" />
        <motion.button
          onClick={handleCenter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-premium w-8 h-8 rounded-lg flex items-center justify-center text-silver-dim hover:text-coral hover:bg-coral/10 hover:shadow-[0_0_8px_rgba(255,87,51,0.2)] border border-white/[0.06] transition-all"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </motion.button>
        <motion.button
          onClick={handleToggleGrid}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`glass-premium w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.06] transition-all ${
            showGrid ? "text-coral bg-coral/10 shadow-[0_0_8px_rgba(255,87,51,0.2)]" : "text-silver-dim hover:text-silver hover:bg-white/[0.06]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
        </motion.button>
        <div className="glass-premium w-8 h-6 rounded-md flex items-center justify-center mt-1 border border-white/[0.06]">
          <span className="text-[9px] font-mono text-silver-dim">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
        <div className="glass-premium rounded-xl px-4 py-2.5 flex items-center justify-between border border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_6px_rgba(255,87,51,0.5)]" />
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
