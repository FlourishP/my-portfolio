"use client";

import { ExternalLink, Figma } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LINKS } from "@/lib/constants";

export function DesignsView() {
  return (
    <div className="h-full flex flex-col p-6 gap-5">
      <div className="flex items-center justify-between">
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
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-coral/10 border border-coral/30 text-coral text-xs font-display font-bold hover:bg-coral/20 transition-all"
        >
          <Figma className="w-3.5 h-3.5" />
          Open in Figma
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <GlassPanel className="flex-1 overflow-hidden relative">
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
