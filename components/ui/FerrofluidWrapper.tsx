"use client";

import dynamic from "next/dynamic";

const Ferrofluid = dynamic(() => import("./Ferrofluid"), {
  ssr: false,
  loading: () => null,
});

interface FerrofluidWrapperProps {
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: "up" | "down" | "left" | "right";
  opacity?: number;
}

export function FerrofluidWrapper(props: FerrofluidWrapperProps) {
  return (
    <Ferrofluid
      {...props}
      mouseInteraction={false}
    />
  );
}
