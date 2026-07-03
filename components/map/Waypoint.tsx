"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/types";

interface WaypointProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function Waypoint({ project, onSelect }: WaypointProps) {
  const variant = hashId(project.id) % 3;
  const badgeAlign = variant === 0
    ? "left-0"
    : variant === 1
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <motion.button
      onClick={() => onSelect(project)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: Math.random() * 0.4, type: "spring", stiffness: 300, damping: 22 }}
      className="group cursor-pointer focus:z-50 hover:z-50 relative"
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
        <div className={`absolute bottom-full mb-1 w-40 sm:w-44 pointer-events-none z-20 ${badgeAlign}`}>
          <div className="glass-map rounded-lg px-2 py-1.5">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[rgba(5,5,8,0.82)]" />

            <p className="text-[9px] sm:text-[10px] font-display font-bold text-silver truncate leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {project.title}
            </p>
            <p className="text-[7px] sm:text-[8px] font-mono text-silver/60 mt-0.5 leading-snug line-clamp-1">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
