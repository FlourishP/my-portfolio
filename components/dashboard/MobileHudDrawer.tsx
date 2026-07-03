"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";

interface MobileHudDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileHudDrawer({ isOpen, onClose }: MobileHudDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[300px] z-50 md:hidden"
          >
            <div className="relative h-full">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-silver-dim hover:text-silver hover:border-coral/40 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <PerformanceHUD />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
