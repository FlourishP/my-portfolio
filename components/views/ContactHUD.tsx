"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Send,
  ExternalLink,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { DialControl } from "@/components/ui/DialControl";
import { LINKS } from "@/lib/constants";

const INQUIRY_TYPES = [
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Consult", value: "consult" },
];

export function ContactHUD() {
  const [inquiryType, setInquiryType] = useState("web");

  return (
    <div className="h-full flex p-6 gap-6">
      <div className="w-[340px] flex-shrink-0 flex flex-col gap-4">
        <GlassPanel variant="premium" className="p-5">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-4">
            Communication Channels
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                href: LINKS.email,
                external: false,
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                label: "WhatsApp",
                href: LINKS.whatsapp,
              },
              {
                icon: <Github className="w-5 h-5" />,
                label: "GitHub",
                href: LINKS.github,
              },
              {
                icon: <Linkedin className="w-5 h-5" />,
                label: "LinkedIn",
                href: LINKS.linkedin,
              },
            ].map((ch) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.external !== false ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-[#FFFFFF08] border border-border hover:border-coral/30 hover:bg-[#FFFFFF12] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral group-hover:scale-110 transition-transform">
                  {ch.icon}
                </div>
                <span className="text-xs font-medium text-silver/70 group-hover:text-silver transition-colors">
                  {ch.label}
                </span>
                <ExternalLink className="w-3 h-3 text-silver-dim opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel variant="premium" className="p-5 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-4">
            Inquiry Type
          </h3>
          <DialControl options={INQUIRY_TYPES} onChange={setInquiryType} />
        </GlassPanel>
      </div>

      <div className="flex-1">
        <GlassPanel variant="premium" className="h-full p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral">
              Message Console
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-[10px] font-mono text-silver-dim">Online</span>
            </div>
          </div>

          <div className="flex-1 bg-surface rounded-xl border border-border p-5 font-mono text-sm text-silver/60 leading-relaxed mb-4">
            <p className="text-coral/60 mb-1">&gt; new_message()</p>
            <p className="text-silver-dim mb-4">
              To: Princess ({inquiryType} inquiry)
            </p>
            <p className="text-silver/40">Hi Princess,</p>
            <p className="text-silver/40">
              I&apos;d like to discuss a {inquiryType} project with you.
            </p>
            <p className="text-silver/40 mt-2">Best regards,</p>
            <span className="inline-block w-[2px] h-4 bg-coral/60 animate-pulse ml-0.5" />
          </div>

          <motion.a
            href={LINKS.email}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-coral text-surface font-display font-bold text-sm hover:bg-coral/90 transition-colors shadow-[0_0_20px_#F9706640]"
          >
            <Send className="w-4 h-4" />
            Send Message
          </motion.a>
        </GlassPanel>
      </div>
    </div>
  );
}
