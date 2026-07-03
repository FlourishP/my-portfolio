import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className = "", hover = false }: GlassPanelProps) {
  return (
    <div
      className={`bg-[#FFFFFF08] backdrop-blur-md border border-border rounded-2xl ${
        hover ? "hover:bg-[#FFFFFF12] hover:border-coral/30 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
