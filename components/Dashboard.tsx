"use client";

import { useState } from "react";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ControlDock } from "@/components/dashboard/ControlDock";
import { Viewport } from "@/components/dashboard/Viewport";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";
import { MobileDock } from "@/components/dashboard/MobileDock";
import { MobileHudDrawer } from "@/components/dashboard/MobileHudDrawer";
import type { ActiveApp } from "@/lib/types";

export function Dashboard() {
  const [activeApp, setActiveApp] = useState<ActiveApp>("navigation");
  const [showMobileHud, setShowMobileHud] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_280px] grid-rows-[auto_1fr] h-dvh md:h-screen md:overflow-hidden overflow-auto bg-mesh-dark">
      <StatusBar />

      <div className="hidden md:block">
        <ControlDock activeApp={activeApp} onNavigate={setActiveApp} />
      </div>

      <div className="min-h-0 h-full">
        <Viewport activeApp={activeApp} onShowHud={setShowMobileHud} />
      </div>

      <div className="hidden md:block">
        <PerformanceHUD />
      </div>

      <MobileDock activeApp={activeApp} onNavigate={setActiveApp} />

      <MobileHudDrawer
        isOpen={showMobileHud}
        onClose={() => setShowMobileHud(false)}
      />
    </div>
  );
}
