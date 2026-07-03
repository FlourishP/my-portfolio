"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-[380px] glass-premium border-l border-white/[0.06] z-30 flex flex-col rounded-none"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <h3 className="font-display text-lg font-bold text-silver">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-silver-dim hover:text-silver hover:border-coral/40 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-coral/10 border border-coral/30 text-[10px] font-mono uppercase tracking-widest text-coral">
                  {project.category}
                </span>
              </div>

              <p className="text-sm text-silver/70 leading-relaxed">
                {project.description}
              </p>

              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-silver/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {Object.keys(project.languages).length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-silver-dim mb-2">
                    Languages
                  </h4>
                  <div className="w-full h-2 rounded-full bg-surface overflow-hidden flex">
                    {Object.entries(project.languages).map(([lang, pct], i) => (
                      <div
                        key={lang}
                        className="h-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: i === 0 ? "#FF5733" : i === 1 ? "#FF573380" : "#FF573340",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3 mt-1.5">
                    {Object.entries(project.languages).map(([lang, pct]) => (
                      <span key={lang} className="text-[10px] text-silver-dim">
                        {lang} {pct}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-white/[0.06] flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-coral to-[#FF8C42] text-surface font-display font-bold text-xs hover:shadow-[0_0_16px_rgba(255,87,51,0.4)] transition-shadow"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-silver font-display font-bold text-xs hover:border-coral/30 hover:bg-white/[0.06] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                Repository
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
