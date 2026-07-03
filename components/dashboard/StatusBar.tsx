"use client";

import { useClock } from "@/lib/hooks/useClock";
import { Battery, Wifi, User } from "lucide-react";

export function StatusBar() {
  const time = useClock();

  return (
    <div className="col-span-3 h-12 bg-panel/80 backdrop-blur-md border-b border-border flex items-center justify-between px-5">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-coral/20 border border-coral/30 flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-coral" />
        </div>
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
