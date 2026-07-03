"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SpotifyModal } from "@/components/views/SpotifyModal";
import Ferrofluid from "@/components/ui/Ferrofluid";
import { SKILL_TRACKS } from "@/lib/constants";

export function TechStackPlayer({ onShowHud: _onShowHud }: { onShowHud?: (show: boolean) => void }) {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);

  function handlePlay(index: number) {
    if (activeTrack === index) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(index);
      setIsPlaying(true);
    }
  }

  function handleMainPlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setShowSpotifyModal(true);
    }
  }

  function handlePrev() {
    setActiveTrack((p) => (p > 0 ? p - 1 : SKILL_TRACKS.length - 1));
    setIsPlaying(true);
  }

  function handleNext() {
    setActiveTrack((p) => (p < SKILL_TRACKS.length - 1 ? p + 1 : 0));
    setIsPlaying(true);
  }

  return (
    <div className="min-h-full md:h-full flex flex-col lg:flex-row p-6 pb-24 md:pb-6 gap-6 relative">
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Ferrofluid
          colors={["#A855F7", "#FF5733", "#6C3AED"]}
          speed={0.25}
          scale={1.4}
          turbulence={0.5}
          fluidity={0.12}
          rimWidth={0.18}
          sharpness={2.5}
          shimmer={1}
          glow={1.8}
          flowDirection="down"
          opacity={0.3}
          mouseInteraction={false}
        />
      </div>

      <div className="lg:w-[320px] flex-shrink-0 relative z-10">
        <GlassPanel className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden" variant="premium">
          <div className="absolute inset-0 bg-gradient-to-br from-violet/[0.06] via-transparent to-coral/[0.04]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-coral/15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-violet/10" />

          {/* Metallic vinyl record - spins when playing */}
          <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center mb-6 ${isPlaying ? "animate-spin-slow" : ""}`}>
            {/* Vinyl body - dark metallic */}
            <div className="absolute inset-0 rounded-full bg-[#0A0A12] border border-white/[0.08] shadow-[0_0_40px_rgba(255,87,51,0.2),inset_0_2px_4px_rgba(255,255,255,0.05)]" />
            {/* Vinyl sheen overlay */}
            <div className="absolute inset-0 rounded-full vinyl-sheen opacity-60" />
            {/* Grooves */}
            <div className="absolute inset-2 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-4 rounded-full border border-white/[0.03]" />
            <div className="absolute inset-6 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-8 rounded-full border border-white/[0.03]" />
            {/* Center label - gradient coral */}
            <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-coral to-[#FF8C42] flex items-center justify-center shadow-[0_0_16px_rgba(255,87,51,0.5)]">
              <div className="w-2 h-2 rounded-full bg-[#0A0A12]" />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-coral mb-1 glow-coral-text">
              Now Playing
            </p>
            <h3 className="font-display text-xl font-bold text-silver mb-1">
              {SKILL_TRACKS[activeTrack].name}
            </h3>
            <p className="text-xs text-silver-dim">
              {SKILL_TRACKS[activeTrack].category}
            </p>
          </div>

          {/* Progress bar with gradient */}
          <div className="relative z-10 w-full mt-6">
            <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet via-coral to-[#FF8C42]"
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] font-mono text-silver-dim">0:00</span>
              <span className="text-[10px] font-mono text-silver-dim">3:00</span>
            </div>
          </div>

          {/* Playback controls */}
          <div className="relative z-10 flex items-center gap-6 mt-4">
            <button onClick={handlePrev} className="text-silver-dim hover:text-silver transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handleMainPlay}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-[#FF8C42] flex items-center justify-center text-surface hover:shadow-[0_0_24px_rgba(255,87,51,0.5)] transition-shadow"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button onClick={handleNext} className="text-silver-dim hover:text-silver transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </GlassPanel>
      </div>

      <div className="flex-1 relative z-10">
        <GlassPanel className="h-full p-5 flex flex-col" variant="premium">
          <h2 className="font-display text-lg font-bold text-silver mb-1">
            Tech Stack Playlist
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mb-4">
            {SKILL_TRACKS.length} skills loaded
          </p>

          <div className="flex-1 space-y-1">
            {SKILL_TRACKS.map((track, i) => {
              const isActive = activeTrack === i;
              return (
                <motion.button
                  key={track.number}
                  onClick={() => handlePlay(i)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left ${
                    isActive
                      ? "bg-coral/10 border border-coral/30"
                      : "bg-transparent border border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`w-6 text-center font-mono text-xs ${
                      isActive ? "text-coral" : "text-silver-dim"
                    }`}
                  >
                    {isActive && isPlaying ? (
                      <span className="inline-flex gap-[2px] items-end h-3">
                        <span className="w-[3px] rounded-full animate-eq-1 bg-gradient-to-t from-violet to-coral" />
                        <span className="w-[3px] rounded-full animate-eq-2 bg-gradient-to-t from-violet to-coral" />
                        <span className="w-[3px] rounded-full animate-eq-3 bg-gradient-to-t from-violet to-coral" />
                        <span className="w-[3px] rounded-full animate-eq-4 bg-gradient-to-t from-violet to-coral" />
                        <span className="w-[3px] rounded-full animate-eq-5 bg-gradient-to-t from-violet to-coral" />
                      </span>
                    ) : (
                      track.number
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-display font-bold truncate ${
                        isActive ? "text-coral" : "text-silver"
                      }`}
                    >
                      {track.name}
                    </p>
                    <p className="text-[10px] text-silver-dim">{track.category}</p>
                  </div>

                  {isActive && isPlaying && (
                    <div className="flex items-end gap-[2px] h-4">
                      <span className="w-[3px] rounded-full animate-eq-1 bg-gradient-to-t from-violet to-coral" />
                      <span className="w-[3px] rounded-full animate-eq-2 bg-gradient-to-t from-violet to-coral" />
                      <span className="w-[3px] rounded-full animate-eq-3 bg-gradient-to-t from-violet to-coral" />
                      <span className="w-[3px] rounded-full animate-eq-4 bg-gradient-to-t from-violet to-coral" />
                      <span className="w-[3px] rounded-full animate-eq-5 bg-gradient-to-t from-violet to-coral" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      <SpotifyModal
        isOpen={showSpotifyModal}
        onClose={() => setShowSpotifyModal(false)}
      />
    </div>
  );
}
