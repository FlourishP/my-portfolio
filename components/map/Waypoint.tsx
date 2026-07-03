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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full bg-black/40 blur-[4px] group-hover:w-6 transition-all" />

      <div className="relative flex flex-col items-center">
        {/* Pulse ring */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-coral/15 animate-pulse-ring-neon" />

        {/* Teardrop pin */}
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" className="relative z-10 drop-shadow-[0_2px_12px_rgba(255,87,51,0.5)] group-hover:scale-110 transition-transform">
          <path
            d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z"
            fill="#FF5733"
            stroke="rgba(255,87,51,0.6)"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="15" r="7" fill="white" fillOpacity="0.95" />
          <circle cx="16" cy="15" r="3.5" fill="#FF5733" />
        </svg>

        {/* Permanent badge — always visible */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 sm:w-48 pointer-events-none z-20">
          <div className="glass-map rounded-lg px-2.5 py-2">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[rgba(5,5,8,0.82)]" />

            <p className="text-[10px] sm:text-xs font-display font-bold text-silver truncate leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {project.title}
            </p>
            <p className="text-[8px] sm:text-[9px] font-mono text-coral mt-0.5 leading-tight">
              {project.category}
            </p>
            <div className="flex flex-wrap gap-0.5 mt-1.5">
              {project.techStack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="px-1 py-px text-[7px] sm:text-[8px] font-mono rounded bg-white/[0.06] text-silver/70 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
