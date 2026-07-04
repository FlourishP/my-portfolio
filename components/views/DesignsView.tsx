"use client";

import { ExternalLink, Figma } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useSound } from "@/lib/hooks/useSound";
import { LINKS } from "@/lib/constants";
import { FerrofluidWrapper } from "@/components/ui/FerrofluidWrapper";

export function DesignsView({ onShowHud: _onShowHud }: { onShowHud?: (show: boolean) => void }) {
  const { playClick } = useSound();
  return (
    <div className="min-h-full md:h-full flex flex-col p-6 pb-24 md:pb-6 gap-5 relative">
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FerrofluidWrapper
          colors={["#6C3AED", "#FF5733", "#A855F7"]}
          speed={0.22}
          scale={1.5}
          turbulence={0.45}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3}
          shimmer={1.2}
          glow={2}
          flowDirection="down"
          opacity={0.3}
        />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h2 className="font-display text-lg font-bold text-silver tracking-tight">
            Design Portfolio
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mt-1">
            Figma explorations &amp; UI concepts
          </p>
        </div>
        <a
          href={LINKS.figma}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClick()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral text-xs font-display font-bold hover:bg-coral/20 hover:shadow-[0_0_12px_rgba(255,87,51,0.2)] transition-all"
        >
          <Figma className="w-3.5 h-3.5" />
          Open in Figma
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <GlassPanel variant="premium" className="flex-1 overflow-hidden relative z-10">
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
            LINKS.figma
          )}`}
          className="w-full h-full border-0 rounded-2xl"
          allowFullScreen
          title="Figma Design"
        />
      </GlassPanel>
    </div>
  );
}
