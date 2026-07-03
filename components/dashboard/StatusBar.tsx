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
    <div className="col-span-1 md:col-span-3 h-11 sm:h-12 glass-premium border-b border-white/[0.06] flex items-center justify-between px-3 sm:px-5 rounded-none safe-area-top relative z-20">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <img
          src={avatarUrl}
          alt="GitHub avatar"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-coral/40 object-cover flex-shrink-0 shadow-[0_0_8px_rgba(255,87,51,0.3)]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-[11px] sm:text-xs font-display font-semibold tracking-wide text-silver truncate">
          Princess
        </span>
      </div>

      <div className="font-mono text-xs sm:text-sm font-medium tracking-widest text-silver/80 flex-shrink-0 mx-2">
        {time}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <div className="hidden xs:flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-coral" />
          <span className="text-[10px] font-mono font-bold text-coral">5G</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-silver/60" />
          <span className="text-[10px] font-mono text-silver/60">87%</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d39980]" />
      </div>
    </div>
  );
}
