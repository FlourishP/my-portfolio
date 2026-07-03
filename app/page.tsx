"use client";

import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ControlDock } from "@/components/dashboard/ControlDock";
import { Viewport } from "@/components/dashboard/Viewport";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import type { ViewType } from "@/lib/types";

const VALID_VIEWS: ViewType[] = ["navigation", "media", "climate", "designs", "settings"];

function getInitialView(): ViewType {
  if (typeof window === "undefined") return "navigation";
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view") as ViewType | null;
  if (view && VALID_VIEWS.includes(view)) return view;
  return "navigation";
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewType>("navigation");

  useEffect(() => {
    setActiveView(getInitialView());
  }, []);

  const handleNavigate = useCallback((view: ViewType) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.pushState({}, "", url.toString());
  }, []);

  useEffect(() => {
    function handlePopState() {
      setActiveView(getInitialView());
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <StatusBar activeView={activeView} />
      <div className="grid grid-cols-1 grid-rows-[48px_1fr] lg:grid-cols-[64px_1fr_280px] lg:grid-rows-[48px_1fr] h-[calc(100vh-48px)] overflow-hidden bg-surface">
        <ControlDock activeView={activeView} onNavigate={handleNavigate} />
        <main id="main" className="relative overflow-hidden">
          <ErrorBoundary>
            <Viewport activeView={activeView} />
          </ErrorBoundary>
        </main>
        <PerformanceHUD className="hidden lg:flex" />
      </div>
    </>
  );
}
