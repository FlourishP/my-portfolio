"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import { useSound } from "@/lib/hooks/useSound";
import type { ActiveApp } from "@/lib/types";

interface MobileDockProps {
  activeApp: ActiveApp;
  onNavigate: (app: ActiveApp) => void;
}

const NAV_ITEMS: { id: ActiveApp; icon: typeof Map; label: string }[] = [
  { id: "navigation", icon: Map, label: "Projects" },
  { id: "media", icon: Music, label: "Tech" },
  { id: "climate", icon: Thermometer, label: "Contact" },
  { id: "designs", icon: Pen, label: "Designs" },
  { id: "settings", icon: Settings, label: "About" },
];

export function MobileDock({ activeApp, onNavigate }: MobileDockProps) {
  const { playClick } = useSound();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
      <div className="glass-premium rounded-t-2xl px-2 sm:px-4 pt-2 pb-2 sm:pb-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const isActive = activeApp === id;
            return (
              <motion.button
                key={id}
                onClick={() => { playClick(); onNavigate(id); }}
                title={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-colors duration-200 ${
                  isActive ? "text-coral" : "text-silver-dim hover:text-silver"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-dock-indicator"
                    className="absolute -top-1 w-5 h-0.5 bg-coral rounded-full shadow-[0_0_6px_rgba(255,87,51,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                <span className="text-[8px] sm:text-[9px] font-mono">{label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
