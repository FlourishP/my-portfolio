"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import type { ActiveApp } from "@/lib/types";

interface MobileDockProps {
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

export function MobileDock({ activeApp, onNavigate }: MobileDockProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-premium rounded-t-2xl px-4 py-3">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const isActive = activeApp === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                title={label}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive ? "text-coral" : "text-silver-dim"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-dock-indicator"
                    className="absolute -top-1 w-5 h-0.5 bg-coral rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-mono">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
