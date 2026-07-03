"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import type { ViewType } from "@/lib/types";

interface ControlDockProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const NAV_ITEMS: { id: ViewType; icon: typeof Map; label: string }[] = [
  { id: "navigation", icon: Map, label: "Projects" },
  { id: "media", icon: Music, label: "Tech Stack" },
  { id: "climate", icon: Thermometer, label: "Contact" },
  { id: "designs", icon: Pen, label: "Designs" },
  { id: "settings", icon: Settings, label: "About" },
];

export function ControlDock({ activeView, onNavigate }: ControlDockProps) {
  return (
    <>
      {/* Desktop: left sidebar */}
      <div className="hidden lg:flex flex-col items-center justify-center h-full bg-panel/60 backdrop-blur-md border-r border-border py-6 gap-1 relative">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all focus-ring cursor-pointer ${
                isActive
                  ? "text-coral bg-coral/10"
                  : "text-silver-dim hover:text-silver hover:bg-glass"
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
            </button>
          );
        })}

        <div className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-coral/40" />
      </div>

      {/* Mobile: bottom nav bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-dock bg-panel/90 backdrop-blur-md border-t border-border px-2 py-1 safe-area-bottom" aria-label="Main navigation">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const isActive = activeView === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all focus-ring cursor-pointer min-w-[48px] min-h-[48px] justify-center ${
                  isActive
                    ? "text-coral"
                    : "text-silver-dim"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-coral rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
