"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PROFILE, SKILL_TRACKS } from "@/lib/constants";

export function AboutSettings() {
  const [toggles, setToggles] = useState({
    darkMode: true,
    sound: false,
    animations: true,
  });

  function toggle(key: keyof typeof toggles) {
    setToggles((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="h-full flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6">
      <div className="w-full lg:w-[380px] flex-shrink-0">
        <GlassPanel className="h-full p-5 lg:p-6 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-coral/20 border-2 border-coral/40 flex items-center justify-center">
              <span className="font-display text-xl lg:text-2xl font-bold text-coral">SP</span>
            </div>
            <div>
              <h2 className="font-display text-lg lg:text-xl font-bold text-silver">
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
            <div className="w-full h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-xs text-silver-dim">Location</span>
              <span className="text-xs text-silver">{PROFILE.location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-coral mb-3">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_TRACKS.map((s, i) => (
                <motion.span
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                  className="px-2.5 py-1 rounded-lg bg-glass border border-border text-xs text-silver/70"
                >
                  {s.name}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <GlassPanel className="p-5 lg:p-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-coral mb-5">
            System Settings
          </h3>
          <div className="space-y-4">
            {(
              [
                { key: "darkMode" as const, label: "Dark Mode", locked: true },
                { key: "sound" as const, label: "Sound Effects", locked: false },
                { key: "animations" as const, label: "Animations", locked: false },
              ] as const
            ).map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <span className="text-sm text-silver">{item.label}</span>
                <button
                  onClick={() => !item.locked && toggle(item.key)}
                  aria-label={`${item.label} ${toggles[item.key] ? "on" : "off"}`}
                  aria-pressed={toggles[item.key]}
                  className={`relative w-12 h-6 rounded-full transition-colors focus-ring cursor-pointer ${
                    toggles[item.key]
                      ? "bg-coral"
                      : "bg-surface border border-border"
                  } ${item.locked ? "cursor-default opacity-60" : ""}`}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-surface shadow-md"
                    animate={{ left: toggles[item.key] ? "26px" : "2px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5 lg:p-6 flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-coral/10 border border-coral/20 flex items-center justify-center mb-4">
            <span className="font-display text-xl lg:text-2xl font-bold text-coral">SP</span>
          </div>
          <h3 className="font-display text-lg font-bold text-silver mb-1">
            Silver Princess K.
          </h3>
          <p className="text-xs text-silver-dim mb-4">
            Full-Stack Developer &amp; Designer
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-lg bg-coral/10 border border-coral/30 text-xs font-mono text-coral">
              Othryn Ventures LTD
            </div>
            <div className="px-3 py-1 rounded-lg bg-glass border border-border text-xs font-mono text-silver-dim">
              Remote
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
