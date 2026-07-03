"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ActiveApp } from "@/lib/types";
import { ProjectsMap } from "@/components/views/ProjectsMap";
import { TechStackPlayer } from "@/components/views/TechStackPlayer";
import { ContactHUD } from "@/components/views/ContactHUD";
import { DesignsView } from "@/components/views/DesignsView";
import { AboutSettings } from "@/components/views/AboutSettings";

interface ViewportProps {
  activeApp: ActiveApp;
}

const VIEW_MAP: Record<ActiveApp, React.ComponentType> = {
  navigation: ProjectsMap,
  media: TechStackPlayer,
  climate: ContactHUD,
  designs: DesignsView,
  settings: AboutSettings,
};

export function Viewport({ activeApp }: ViewportProps) {
  const ActiveView = VIEW_MAP[activeApp];

  return (
    <div className="relative h-full min-h-0 overflow-auto md:overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:absolute md:inset-0 relative h-full"
        >
          <ActiveView />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
