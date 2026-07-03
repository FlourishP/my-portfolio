"use client";

import { useState } from "react";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ControlDock } from "@/components/dashboard/ControlDock";
import { Viewport } from "@/components/dashboard/Viewport";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";
import type { ActiveApp } from "@/lib/types";

export default function Dashboard() {
  const [activeApp, setActiveApp] = useState<ActiveApp>("navigation");

  return (
    <div className="grid grid-cols-[64px_1fr_280px] grid-rows-[48px_1fr] h-screen overflow-hidden bg-surface">
      <StatusBar />
      <ControlDock activeApp={activeApp} onNavigate={setActiveApp} />
      <Viewport activeApp={activeApp} />
      <PerformanceHUD />
    </div>
  );
}
