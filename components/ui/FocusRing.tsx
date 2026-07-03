"use client";

import type { ReactNode } from "react";

interface FocusRingProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
}

export function FocusRing({ children, className = "", as: Tag = "div" }: FocusRingProps) {
  return (
    <Tag className={`focus-ring focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2 ${className}`}>
      {children}
    </Tag>
  );
}
