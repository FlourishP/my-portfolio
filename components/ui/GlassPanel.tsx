import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "premium";
}

export function GlassPanel({
  children,
  className = "",
  hover = false,
  variant = "default",
}: GlassPanelProps) {
  const base =
    variant === "premium"
      ? "glass-premium rounded-2xl"
      : "bg-white/[0.04] backdrop-blur-md border border-white/[0.06] rounded-2xl";

  return (
    <div
      className={`${base} ${
        hover ? "hover:bg-white/[0.06] hover:border-coral/30 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
