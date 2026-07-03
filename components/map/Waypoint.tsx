"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/types";

interface WaypointProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function Waypoint({ project, onSelect }: WaypointProps) {
  return (
    <motion.button
      onClick={() => onSelect(project)}
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: Math.random() * 0.4, type: "spring", stiffness: 300, damping: 22 }}
      className="absolute z-10 group cursor-pointer"
      style={{
        left: `${project.gridPosition.x}%`,
        top: `${project.gridPosition.y}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      {/* Pin shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full bg-black/30 blur-[3px] group-hover:w-6 transition-all" />

      {/* Pin body - GPS marker shape */}
      <div className="relative flex flex-col items-center">
        {/* Pulse ring */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-coral/10 animate-pulse-ring" />

        {/* Marker head (teardrop) */}
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" className="relative z-10 drop-shadow-[0_2px_8px_rgba(249,112,102,0.4)] group-hover:scale-110 transition-transform">
          <path
            d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z"
            fill="#F97066"
            stroke="#fff"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          <circle cx="16" cy="15" r="7" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="15" r="3.5" fill="#F97066" />
        </svg>

        {/* Tooltip card */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
          <div className="bg-panel/95 backdrop-blur-xl border border-border rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-border" />

            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-md bg-coral/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-coral" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-display font-bold text-silver truncate">
                  {project.title}
                </p>
                <p className="text-[10px] font-mono text-coral mt-0.5">
                  {project.category}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-silver-dim mt-2 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/5 text-silver-dim border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 mt-2 text-[9px] font-mono text-coral">
              <span>Click to view details</span>
              <span className="text-silver-dim">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
