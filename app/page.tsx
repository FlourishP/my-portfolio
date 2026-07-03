"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ControlDock } from "@/components/dashboard/ControlDock";
import { Viewport } from "@/components/dashboard/Viewport";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";
import { MobileDock } from "@/components/dashboard/MobileDock";
import { MobileHudDrawer } from "@/components/dashboard/MobileHudDrawer";
import type { ActiveApp } from "@/lib/types";

export default function Dashboard() {
  const [activeApp, setActiveApp] = useState<ActiveApp>("navigation");
  const [showMobileHud, setShowMobileHud] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_280px] grid-rows-[48px_1fr] h-screen overflow-hidden bg-mesh-dark">
      <StatusBar />

      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <ControlDock activeApp={activeApp} onNavigate={setActiveApp} />
      </div>

      {/* Mobile HUD trigger — visible only on mobile */}
      <div className="fixed top-3 right-16 z-50 md:hidden">
        <button
          onClick={() => setShowMobileHud(true)}
          className="w-9 h-9 rounded-xl glass-premium flex items-center justify-center text-silver-dim hover:text-coral transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>

      <Viewport activeApp={activeApp} />

      {/* Desktop HUD — hidden on mobile */}
      <div className="hidden md:block">
        <PerformanceHUD />
      </div>

      {/* Mobile bottom dock — hidden on desktop */}
      <MobileDock activeApp={activeApp} onNavigate={setActiveApp} />

      {/* Mobile HUD drawer */}
      <MobileHudDrawer
        isOpen={showMobileHud}
        onClose={() => setShowMobileHud(false)}
      />
    </div>
  );
}
