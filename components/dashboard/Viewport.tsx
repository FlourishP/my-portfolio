"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ViewType } from "@/lib/types";
import { ProjectsMap } from "@/components/views/ProjectsMap";
import { TechStackPlayer } from "@/components/views/TechStackPlayer";
import { ContactHUD } from "@/components/views/ContactHUD";
import { DesignsView } from "@/components/views/DesignsView";
import { AboutSettings } from "@/components/views/AboutSettings";

interface ViewportProps {
  activeView: ViewType;
}

const VIEW_MAP: Record<ViewType, React.ComponentType> = {
  navigation: ProjectsMap,
  media: TechStackPlayer,
  climate: ContactHUD,
  designs: DesignsView,
  settings: AboutSettings,
};

export function Viewport({ activeView }: ViewportProps) {
  const ActiveView = VIEW_MAP[activeView];

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <ActiveView />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
