"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import { useSound } from "@/lib/hooks/useSound";
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
  const { playClick } = useSound();
  return (
    <div className="flex flex-col items-center justify-center h-full glass-premium border-r border-white/[0.06] py-6 gap-1 relative rounded-none z-20">
      {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
        const isActive = activeApp === id;
        return (
          <motion.button
            key={id}
            onClick={() => { playClick(); onNavigate(id); }}
            title={label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
              isActive
                ? "text-coral bg-coral/10 shadow-[0_0_12px_rgba(255,87,51,0.2)]"
                : "text-silver-dim hover:text-silver hover:bg-white/[0.06]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-coral rounded-r-full shadow-[0_0_8px_rgba(255,87,51,0.5)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className="w-5 h-5" />
          </motion.button>
        );
      })}

      <div className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-coral/50 shadow-[0_0_6px_rgba(255,87,51,0.4)]" />
    </div>
  );
}
