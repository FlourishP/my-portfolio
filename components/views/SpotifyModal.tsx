"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Globe, ExternalLink } from "lucide-react";

interface SpotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpotifyModal({ isOpen, onClose }: SpotifyModalProps) {
  function handleStreamWeb() {
    onClose();
  }

  function handleOpenApp() {
    window.open(
      "spotify:playlist:37i9dQZF1DX5trt9i14X7j",
      "_blank"
    );
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] glass-premium rounded-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-silver">
                Play Music
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-[#FFFFFF08] border border-border flex items-center justify-center text-silver-dim hover:text-silver transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-silver/70 mb-5">
              Choose how you&apos;d like to listen to the coding soundtrack.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleStreamWeb}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-coral/10 border border-coral/30 hover:bg-coral/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center text-coral">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-display font-bold text-coral">
                    Stream on Web
                  </p>
                  <p className="text-[10px] text-silver-dim">
                    Listen directly in the browser
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-coral opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={handleOpenApp}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#FFFFFF08] border border-border hover:border-coral/30 hover:bg-[#FFFFFF12] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF08] border border-border flex items-center justify-center text-silver">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-display font-bold text-silver">
                    Open Spotify App
                  </p>
                  <p className="text-[10px] text-silver-dim">
                    Deep link to the playlist
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-silver-dim opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
