import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className = "", hover = false }: GlassPanelProps) {
  return (
    <div
      className={`bg-glass backdrop-blur-md border border-border rounded-2xl ${
        hover ? "hover:bg-glass-hover hover:border-coral/30 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
