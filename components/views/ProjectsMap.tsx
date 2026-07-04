"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Layers, MapPin, BarChart3, Move, ExternalLink, Github, X } from "lucide-react";
import { SatelliteMap } from "@/components/map/SatelliteMap";
import { FerrofluidWrapper } from "@/components/ui/FerrofluidWrapper";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { useSound } from "@/lib/hooks/useSound";
import { INITIAL_PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/types";

interface ProjectsMapProps {
  onShowHud?: (show: boolean) => void;
}

export function ProjectsMap({ onShowHud }: ProjectsMapProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeRoutingProject, setActiveRoutingProject] = useState<Project | null>(null);
  const { playClick } = useSound();
  const [showMapOnboarding, setShowMapOnboarding] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(5);
  const [showOverlay, setShowOverlay] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { repos, loading } = useGitHubRepos();

  const projects: Project[] = repos.map((repo) => ({
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
    gridPosition: { x: 0, y: 0 },
  }));

  const displayProjects = loading || projects.length === 0 ? INITIAL_PROJECTS : projects;

  const filteredProjects = searchQuery
    ? displayProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayProjects;

  const handleToggleOverlay = useCallback(() => {
    setShowOverlay((g) => !g);
  }, []);

  const handlePinClick = useCallback((project: Project) => {
    setActiveRoutingProject(project);
  }, []);

  const handleDismissModal = useCallback(() => {
    setActiveRoutingProject(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      onWheel={() => setHasInteracted(true)}
      onPointerDown={() => setHasInteracted(true)}
    >
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FerrofluidWrapper
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
        />
      </div>

      {/* Leaflet satellite map */}
      <SatelliteMap
        projects={filteredProjects}
        showOverlay={showOverlay}
        onZoomChange={setZoom}
        onCenterChange={setMapCenter}
        onProjectSelect={handlePinClick}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-3 md:p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-base sm:text-lg font-bold text-silver tracking-tight flex items-center gap-2 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]">
            <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
            <span className="truncate">Project Navigator</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-silver mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {filteredProjects.length} locations &middot; scroll to zoom &middot; drag to pan
          </p>
        </div>

        <div className="glass-map rounded-xl px-3 py-2 flex items-center gap-2 w-40 sm:w-48 md:w-52 flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-silver flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs font-mono text-silver placeholder:text-silver/60 outline-none w-full min-w-0"
          />
        </div>
      </div>

      {/* Onboarding banner */}
      <AnimatePresence>
        {showMapOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md"
          >
            <div className="backdrop-blur-xl bg-[#0a0a10]/95 border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center justify-between gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5733] animate-pulse shadow-[0_0_10px_#FF5733] flex-shrink-0" />
              <p className="text-slate-100 text-xs sm:text-sm font-medium tracking-wide leading-relaxed flex-1 min-w-0">
                Welcome to my portfolio! The pins anchored on this map represent my featured development projects. Click any label to explore.
              </p>
              <button
                onClick={() => { playClick(); setShowMapOnboarding(false); }}
                className="text-[#FF5733] hover:text-white transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer pl-2 flex-shrink-0"
              >
                GOT IT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right controls */}
      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1">
        {onShowHud && (
          <motion.button
            onClick={() => { playClick(); onShowHud(true); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-map w-8 h-8 rounded-lg flex items-center justify-center text-silver hover:text-coral hover:bg-coral/15 hover:shadow-[0_0_10px_rgba(255,87,51,0.3)] transition-all md:hidden"
            title="Developer Stats"
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </motion.button>
        )}
        <div className="glass-map w-8 h-6 rounded-md flex items-center justify-center mt-1">
          <span className="text-[9px] font-mono font-bold text-silver drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">z{Math.round(zoom)}</span>
        </div>
        <div className="w-8 h-px bg-white/10 my-1" />
        <motion.button
          onClick={() => { playClick(); handleToggleOverlay(); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`glass-map w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            showOverlay ? "text-coral bg-coral/15 shadow-[0_0_10px_rgba(255,87,51,0.3)]" : "text-silver hover:text-silver hover:bg-white/10"
          }`}
          title="Toggle street labels"
        >
          <Layers className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Drag hint */}
      {!hasInteracted && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 glass-map rounded-full px-4 py-2 flex items-center gap-2 pointer-events-none animate-pulse">
          <Move className="w-3.5 h-3.5 text-silver" />
          <span className="text-[10px] font-mono font-bold text-silver drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Scroll to zoom &middot; Drag to explore</span>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <div className="glass-map rounded-xl px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_6px_rgba(255,87,51,0.5)]" />
              <span className="text-[10px] font-mono font-bold text-silver drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Live</span>
            </div>
            <div className="text-[10px] font-mono font-bold text-silver drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {loading ? "Syncing..." : `${displayProjects.length} repos`}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-silver drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              z{Math.round(zoom)}
            </span>
            <div className="w-1 h-1 rounded-full bg-silver/30" />
            <span className="text-[10px] font-mono font-bold text-silver drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Labels: {showOverlay ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Routing Modal ═══ */}
      <AnimatePresence>
        {activeRoutingProject && (
          <>
            {/* Backdrop scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => { playClick(); handleDismissModal(); }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 m-auto h-fit z-50 w-full max-w-sm px-4"
            >
              <div className="bg-[#0a0a10]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={() => { playClick(); handleDismissModal(); }}
                  className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-silver-dim hover:text-silver hover:border-coral/40 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-coral/15 border border-coral/25 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-coral" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-silver leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {activeRoutingProject.title}
                    </h3>
                    <p className="text-[10px] font-mono text-coral mt-0.5">
                      {activeRoutingProject.category}
                    </p>
                  </div>
                </div>

                {/* Question */}
                <p className="text-xs font-mono text-silver/80 mb-5 leading-relaxed">
                  Where would you like to navigate?
                </p>

                {/* Action buttons */}
                <div className="flex flex-col gap-2.5">
                  {/* Button A — Live Website (hidden if no homepage) */}
                  {activeRoutingProject.liveUrl && (
                    <a
                      href={activeRoutingProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick()}
                      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-coral to-[#FF8C42] text-[#050508] font-display font-bold text-sm hover:shadow-[0_0_20px_rgba(255,87,51,0.4)] transition-shadow"
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span>Launch Live Website</span>
                    </a>
                  )}

                  {/* Button B — Source Code */}
                  <a
                    href={activeRoutingProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-silver font-display font-bold text-sm hover:border-coral/30 hover:bg-white/[0.06] hover:shadow-[0_0_12px_rgba(255,87,51,0.15)] transition-all"
                  >
                    <Github className="w-4 h-4 flex-shrink-0" />
                    <span>Explore Source Code</span>
                  </a>
                </div>

                {/* Tech stack preview */}
                <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-white/[0.06]">
                  {activeRoutingProject.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/[0.04] text-silver/60 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
