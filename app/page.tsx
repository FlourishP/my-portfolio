"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/Dashboard").then(m => m.Dashboard), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-mesh-dark">
      <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Page() {
  return <Dashboard />;
}
