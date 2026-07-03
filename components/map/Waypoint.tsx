"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/types";

interface WaypointProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export function Waypoint({ project, onSelect, index }: WaypointProps) {
  return (
    <motion.button
      onClick={() => onSelect(project)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      aria-label={`${project.title} — ${project.category}`}
      className="absolute z-10 group cursor-pointer focus-ring"
      style={{
        left: `${project.gridPosition.x}%`,
        top: `${project.gridPosition.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 w-8 h-8 -m-1 rounded-full bg-coral/20 animate-pulse-ring" />
        <div className="w-6 h-6 rounded-full bg-coral/80 border-2 border-coral shadow-[0_0_16px_#F9706660] flex items-center justify-center relative z-10 group-hover:scale-125 group-focus-visible:scale-125 transition-transform">
          <div className="w-2 h-2 rounded-full bg-surface" />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none">
        <div className="px-3 py-1.5 bg-panel/90 backdrop-blur-md border border-border rounded-lg">
          <p className="text-xs font-display font-bold text-silver">
            {project.title}
          </p>
          <p className="text-xs font-mono text-coral">{project.category}</p>
        </div>
      </div>
    </motion.button>
  );
}
