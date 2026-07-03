"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

export function ActionButton({ icon, label, href, external = true }: ActionButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-3 bg-[#FFFFFF08] backdrop-blur-md border border-border rounded-xl hover:bg-[#FFFFFF12] hover:border-coral/30 transition-all cursor-pointer group"
    >
      <div className="w-9 h-9 rounded-lg bg-coral/10 flex items-center justify-center text-coral group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-medium text-silver/80 group-hover:text-silver transition-colors">
        {label}
      </span>
    </motion.a>
  );
}
