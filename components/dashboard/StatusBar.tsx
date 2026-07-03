"use client";

import { useState, useEffect } from "react";
import { useClock } from "@/lib/hooks/useClock";
import { Battery, Wifi } from "lucide-react";

const GITHUB_USERNAME = "FlourishP";

function getAvatarUrl() {
  return `https://github.com/${GITHUB_USERNAME}.png?t=${Math.floor(Date.now() / 60000)}`;
}

export function StatusBar() {
  const time = useClock();
  const [avatarUrl, setAvatarUrl] = useState(getAvatarUrl());

  useEffect(() => {
    const interval = setInterval(() => {
      setAvatarUrl(getAvatarUrl());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-1 md:col-span-3 h-12 glass-premium border-b border-border flex items-center justify-between px-5 rounded-none">
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt="GitHub avatar"
          className="w-7 h-7 rounded-full border border-coral/30 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-xs font-display font-semibold tracking-wide text-silver">
          Princess
        </span>
      </div>

      <div className="font-mono text-sm font-medium tracking-widest text-silver/80">
        {time}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-coral" />
          <span className="text-[10px] font-mono font-bold text-coral">5G</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="w-4 h-4 text-silver/60" />
          <span className="text-[10px] font-mono text-silver/60">87%</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d39980]" />
      </div>
    </div>
  );
}
