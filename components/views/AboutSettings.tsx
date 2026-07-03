"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useTheme } from "@/lib/hooks/useTheme";
import { PROFILE, SKILL_TRACKS } from "@/lib/constants";
import Ferrofluid from "@/components/ui/Ferrofluid";

export function AboutSettings({ onShowHud: _onShowHud }: { onShowHud?: (show: boolean) => void }) {
  const { theme, toggle } = useTheme();
  const [toggles, setToggles] = useState({
    sound: false,
    animations: true,
  });

  function handleToggle(key: keyof typeof toggles) {
    setToggles((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="min-h-full md:h-full flex flex-col md:flex-row p-6 pb-24 md:pb-6 gap-6 relative">
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Ferrofluid
          colors={["#A855F7", "#FF5733", "#6C3AED"]}
          speed={0.28}
          scale={1.1}
          turbulence={0.65}
          fluidity={0.16}
          rimWidth={0.14}
          sharpness={3.2}
          shimmer={0.7}
          glow={1.4}
          flowDirection="down"
          opacity={0.35}
          mouseInteraction={false}
        />
      </div>

      <div className="w-full md:w-[380px] flex-shrink-0 relative z-10">
        <GlassPanel className="h-full p-6 flex flex-col" variant="premium">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://github.com/FlourishP.png"
              alt="Princess"
              className="w-16 h-16 rounded-2xl border-2 border-coral/40 object-cover shadow-[0_0_20px_rgba(255,87,51,0.3)]"
            />
            <div>
              <h2 className="font-display text-xl font-bold text-silver">
                {PROFILE.name}
              </h2>
              <p className="text-xs text-coral">{PROFILE.role}</p>
            </div>
          </div>

          <p className="text-sm text-silver/70 leading-relaxed mb-6">
            {PROFILE.bio}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-xs text-silver-dim">Company</span>
              <span className="text-xs text-silver">{PROFILE.company}</span>
            </div>
            <div className="w-full h-px bg-white/[0.06]" />
            <div className="flex justify-between">
              <span className="text-xs text-silver-dim">Location</span>
              <span className="text-xs text-silver">{PROFILE.location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-3 glow-coral-text">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_TRACKS.map((s) => (
                <span
                  key={s.name}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-silver/70"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
        <GlassPanel className="p-6" variant="premium">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-5 glow-coral-text">
            System Settings
          </h3>
          <div className="space-y-4">
            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
              <span className="text-sm text-silver">Dark Mode</span>
              <button
                onClick={toggle}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  theme === "dark" ? "bg-gradient-to-r from-coral to-[#FF8C42]" : "bg-surface border border-white/[0.06]"
                }`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-surface shadow-md"
                  animate={{ left: theme === "dark" ? "26px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Sound Effects toggle */}
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
              <span className="text-sm text-silver">Sound Effects</span>
              <button
                onClick={() => handleToggle("sound")}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  toggles.sound ? "bg-gradient-to-r from-coral to-[#FF8C42]" : "bg-surface border border-white/[0.06]"
                }`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-surface shadow-md"
                  animate={{ left: toggles.sound ? "26px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Animations toggle */}
            <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
              <span className="text-sm text-silver">Animations</span>
              <button
                onClick={() => handleToggle("animations")}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  toggles.animations ? "bg-gradient-to-r from-coral to-[#FF8C42]" : "bg-surface border border-white/[0.06]"
                }`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-surface shadow-md"
                  animate={{ left: toggles.animations ? "26px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 flex-1 flex flex-col justify-center items-center text-center" variant="premium">
          <img
            src="https://github.com/FlourishP.png"
            alt="Princess"
            className="w-16 h-16 rounded-2xl border border-coral/20 object-cover mb-4 shadow-[0_0_20px_rgba(255,87,51,0.3)]"
          />
          <h3 className="font-display text-lg font-bold text-silver mb-1">
            Silver Princess K.
          </h3>
          <p className="text-xs text-silver-dim mb-4">
            Full-Stack Developer &amp; Designer
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-lg bg-coral/10 border border-coral/30 text-[10px] font-mono text-coral">
              Othryn Ventures LTD
            </div>
            <div className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-silver-dim">
              Remote
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
