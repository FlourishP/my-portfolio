"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import type { ActiveApp } from "@/lib/types";

interface ControlDockProps {
  activeApp: ActiveApp;
  onNavigate: (app: ActiveApp) => void;
}

const NAV_ITEMS: { id: ActiveApp; icon: typeof Map; label: string }[] = [
  { id: "navigation", icon: Map, label: "Projects" },
  { id: "media", icon: Music, label: "Tech Stack" },
  { id: "climate", icon: Thermometer, label: "Contact" },
  { id: "designs", icon: Pen, label: "Designs" },
  { id: "settings", icon: Settings, label: "About" },
];

export function ControlDock({ activeApp, onNavigate }: ControlDockProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full glass-premium border-r border-border py-6 gap-1 relative rounded-none">
      {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
        const isActive = activeApp === id;
        return (
          <motion.button
            key={id}
            onClick={() => onNavigate(id)}
            title={label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isActive
                ? "text-coral bg-coral/10"
                : "text-silver-dim hover:text-silver hover:bg-white/[0.06]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-coral rounded-r-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className="w-5 h-5" />
          </motion.button>
        );
      })}

      <div className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-coral/40" />
    </div>
  );
}
