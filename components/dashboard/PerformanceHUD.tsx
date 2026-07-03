"use client";

import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useGitHubRepos } from "@/lib/hooks/useGitHubRepos";
import { LINKS } from "@/lib/constants";

export function PerformanceHUD() {
  const { repos, loading } = useGitHubRepos();

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return (
    <div className="h-full bg-panel/60 backdrop-blur-md border-l border-border flex flex-col p-4 gap-4 overflow-y-auto">
      <GlassPanel className="p-4">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-3">
          Developer Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-dim">Active Projects</span>
            <span className="text-sm font-display font-bold text-silver">
              {loading ? "—" : repos.length}
            </span>
          </div>
          <div className="w-full h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-dim">Stars Earned</span>
            <span className="text-sm font-display font-bold text-silver">
              {loading ? "—" : totalStars}
            </span>
          </div>
          <div className="w-full h-px bg-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-silver-dim">Experience</span>
            <span className="text-sm font-display font-bold text-silver">
              2+ Years
            </span>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-3">
          Connect
        </h3>
        <div className="space-y-2">
          {[
            {
              icon: <Github className="w-4 h-4" />,
              label: "GitHub",
              href: LINKS.github,
            },
            {
              icon: <Linkedin className="w-4 h-4" />,
              label: "LinkedIn",
              href: LINKS.linkedin,
            },
            {
              icon: <Mail className="w-4 h-4" />,
              label: "Email",
              href: LINKS.email,
              external: false,
            },
            {
              icon: <MessageCircle className="w-4 h-4" />,
              label: "WhatsApp",
              href: LINKS.whatsapp,
            },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external !== false ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FFFFFF08] border border-border hover:border-coral/30 hover:bg-[#FFFFFF12] transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-coral/10 flex items-center justify-center text-coral group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-medium text-silver/70 group-hover:text-silver transition-colors">
                {item.label}
              </span>
              <ExternalLink className="w-3 h-3 text-silver-dim ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-4">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <a
            href={LINKS.email}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-coral/10 border border-coral/30 text-coral text-xs font-semibold hover:bg-coral/20 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            Send Message
          </a>
        </div>
      </GlassPanel>
    </div>
  );
}
