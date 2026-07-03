# EV Dashboard Refactor — Implementation Plan

> **For Claude:** Use the `executing-plans` skill to implement this plan task-by-task.

**Goal:** Transform the flat dark portfolio into a premium luxury EV Infotainment Dashboard with theme system, world map, Spotify integration, light mode, and mobile responsiveness.

**Architecture:** Incremental refactor of 23 existing source files. Add React context for theme state, CSS custom properties for light/dark tokens, inline SVG world map, Spotify iframe embed, and responsive grid with floating bottom dock.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, Lucide React icons.

---

## Task 1: Theme Context Provider

**Files:**
- Create: `lib/hooks/useTheme.ts`
- Modify: `lib/types.ts` (add Theme type)

**Step 1: Add Theme type to types.ts**

Add to `lib/types.ts`:
```typescript
export type Theme = "dark" | "light";
```

**Step 2: Create useTheme.ts hook**

Create `lib/hooks/useTheme.ts`:
```typescript
"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored) setThemeState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  function toggle() {
    setThemeState((p) => (p === "dark" ? "light" : "dark"));
  }

  function setTheme(t: Theme) {
    setThemeState(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS (no errors)

**Step 4: Commit**

```bash
git add lib/types.ts lib/hooks/useTheme.ts
git commit -m "feat: add theme context provider with localStorage persistence"
```

---

## Task 2: Light/Dark Mode CSS Tokens

**Files:**
- Modify: `app/globals.css`

**Step 1: Add light mode tokens and utilities**

Replace the entire content of `app/globals.css` with:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@300;500;700&display=swap");
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;

  --color-surface: #0A0A0F;
  --color-panel: #111114;
  --color-coral: #F97066;
  --color-coral-dim: #F9706680;
  --color-coral-glow: #F9706640;
  --color-silver: #E2E2E2;
  --color-silver-dim: #6B6B6B;
  --color-glass: #FFFFFF08;
  --color-glass-hover: #FFFFFF12;
  --color-border: #1E1E22;
}

[data-theme="light"] {
  --color-surface: #F5F5F0;
  --color-panel: #FFFFFF;
  --color-coral: #E8604E;
  --color-coral-dim: #E8604E80;
  --color-coral-glow: #E8604E40;
  --color-silver: #1A1A1A;
  --color-silver-dim: #6B6B6B;
  --color-glass: #00000008;
  --color-glass-hover: #00000012;
  --color-border: #E5E5E5;
}

@layer base {
  body {
    background-color: var(--color-surface);
    color: var(--color-silver);
    font-family: var(--font-sans);
    overflow: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  ::selection {
    background-color: var(--color-coral);
    color: #FFFFFF;
  }

  [data-theme="light"] ::selection {
    color: #FFFFFF;
  }
}

.bg-mesh-dark {
  background: radial-gradient(ellipse at 20% 50%, #111118 0%, #0A0A0F 50%, #08080C 100%);
}

.bg-mesh-light {
  background: radial-gradient(ellipse at 20% 50%, #FAFAF8 0%, #F5F5F0 50%, #EEEDE8 100%);
}

.glass-premium {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .glass-premium {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.glow-coral {
  box-shadow: 0 0 15px rgba(249, 112, 102, 0.3);
}

[data-theme="light"] .glow-coral {
  box-shadow: 0 0 15px rgba(232, 96, 78, 0.3);
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}

@keyframes equalizer-bar {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}

@keyframes equalizer-bar-2 {
  0%, 100% { height: 40%; }
  50% { height: 80%; }
}

@keyframes equalizer-bar-3 {
  0%, 100% { height: 60%; }
  50% { height: 30%; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-eq-1 { animation: equalizer-bar 1.2s ease-in-out infinite; }
.animate-eq-2 { animation: equalizer-bar-2 0.9s ease-in-out infinite 0.1s; }
.animate-eq-3 { animation: equalizer-bar-3 1.4s ease-in-out infinite 0.2s; }
.animate-eq-4 { animation: equalizer-bar 1.1s ease-in-out infinite 0.15s; }
.animate-eq-5 { animation: equalizer-bar-2 1.3s ease-in-out infinite 0.05s; }
```

**Step 2: Verify build**

Run: `npx next build`
Expected: PASS (clean build, no warnings)

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add light mode tokens, mesh gradients, glass-premium, glow-coral utilities"
```

---

## Task 3: GlassPanel Premium Variant

**Files:**
- Modify: `components/ui/GlassPanel.tsx`

**Step 1: Upgrade GlassPanel with variant prop**

Replace `components/ui/GlassPanel.tsx`:
```tsx
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "premium";
}

export function GlassPanel({
  children,
  className = "",
  hover = false,
  variant = "default",
}: GlassPanelProps) {
  const base =
    variant === "premium"
      ? "glass-premium rounded-2xl"
      : "bg-[#FFFFFF08] backdrop-blur-md border border-border rounded-2xl";

  return (
    <div
      className={`${base} ${
        hover ? "hover:bg-[#FFFFFF12] hover:border-coral/30 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add components/ui/GlassPanel.tsx
git commit -m "feat: add premium variant to GlassPanel for enhanced glassmorphism"
```

---

## Task 4: World Map Component

**Files:**
- Create: `components/map/WorldMap.tsx`
- Modify: `components/views/ProjectsMap.tsx` (update import)

**Step 1: Create WorldMap.tsx**

Create `components/map/WorldMap.tsx`:
```tsx
"use client";

export function WorldMap() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,112,102,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Grid overlay */}
        <rect width="100%" height="100%" fill="url(#map-grid)" />

        {/* Ambient glow */}
        <circle cx="500" cy="250" r="300" fill="url(#map-glow)" />

        {/* North America */}
        <path
          d="M 120 100 Q 140 80 180 85 Q 220 70 250 90 Q 270 85 280 100 Q 290 120 275 140 Q 260 160 240 170 Q 220 185 200 180 Q 180 190 160 175 Q 140 165 130 145 Q 115 130 120 100 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* South America */}
        <path
          d="M 220 220 Q 240 210 250 230 Q 260 260 255 290 Q 250 320 240 340 Q 225 360 215 350 Q 205 330 210 300 Q 200 270 210 240 Q 215 225 220 220 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Europe */}
        <path
          d="M 440 90 Q 460 80 480 85 Q 500 80 510 95 Q 520 110 510 125 Q 500 135 485 130 Q 470 140 455 130 Q 440 120 435 105 Q 438 95 440 90 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Africa */}
        <path
          d="M 460 160 Q 480 150 500 160 Q 520 180 525 210 Q 530 250 520 280 Q 510 310 495 320 Q 475 325 460 310 Q 445 290 440 260 Q 435 230 440 200 Q 445 175 460 160 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Asia */}
        <path
          d="M 540 70 Q 580 60 620 75 Q 660 80 700 90 Q 740 100 760 120 Q 770 140 750 155 Q 730 170 700 165 Q 670 175 640 160 Q 610 150 580 140 Q 555 125 545 105 Q 538 85 540 70 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Australia */}
        <path
          d="M 720 280 Q 750 270 780 280 Q 800 295 795 315 Q 785 330 765 335 Q 745 330 730 315 Q 718 300 720 280 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
      </svg>

      {/* Bottom legend */}
      <div className="absolute bottom-5 left-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-coral animate-pulse-ring" />
          <span className="text-[10px] font-mono text-silver-dim">Active Project</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-silver-dim" />
          <span className="text-[10px] font-mono text-silver-dim">Click to explore</span>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update ProjectsMap.tsx import**

In `components/views/ProjectsMap.tsx`, change:
```tsx
// OLD
import { GridCanvas } from "@/components/map/GridCanvas";

// NEW
import { WorldMap } from "@/components/map/WorldMap";
```

And change the JSX:
```tsx
// OLD
<GridCanvas />

// NEW
<WorldMap />
```

**Step 3: Delete old GridCanvas.tsx**

Run: `Remove-Item components/map/GridCanvas.tsx`

**Step 4: Verify build**

Run: `npx next build`
Expected: PASS

**Step 5: Commit**

```bash
git add components/map/WorldMap.tsx components/views/ProjectsMap.tsx
git rm components/map/GridCanvas.tsx
git commit -m "feat: replace grid canvas with SVG world map backdrop"
```

---

## Task 5: Spotify Modal Component

**Files:**
- Create: `components/views/SpotifyModal.tsx`
- Modify: `lib/constants.ts` (add SPOTIFY_PLAYLIST)

**Step 1: Add Spotify playlist constant**

In `lib/constants.ts`, add to LINKS:
```typescript
spotify:
  "https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j",
```

**Step 2: Create SpotifyModal.tsx**

Create `components/views/SpotifyModal.tsx`:
```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Globe, ExternalLink } from "lucide-react";
import { LINKS } from "@/lib/constants";

interface SpotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpotifyModal({ isOpen, onClose }: SpotifyModalProps) {
  function handleStreamWeb() {
    // The iframe will be rendered in the parent
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
```

**Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 4: Commit**

```bash
git add lib/constants.ts components/views/SpotifyModal.tsx
git commit -m "feat: add Spotify modal with web embed and deep link options"
```

---

## Task 6: TechStackPlayer Spotify Integration + Vinyl Spin

**Files:**
- Modify: `components/views/TechStackPlayer.tsx`

**Step 1: Update TechStackPlayer.tsx**

Replace the entire file with:
```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SpotifyModal } from "@/components/views/SpotifyModal";
import { SKILL_TRACKS } from "@/lib/constants";

export function TechStackPlayer() {
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
    <div className="h-full flex flex-col lg:flex-row p-6 gap-6 relative">
      <div className="lg:w-[320px] flex-shrink-0">
        <GlassPanel className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden" variant="premium">
          <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-coral/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-coral/10" />

          {/* Vinyl record - spins when playing */}
          <div className={`relative z-10 w-32 h-32 rounded-full bg-coral/10 border-2 border-coral/40 flex items-center justify-center mb-6 shadow-[0_0_40px_#F9706630] ${isPlaying ? "animate-spin-slow" : ""}`}>
            <div className="w-6 h-6 rounded-full bg-surface border-2 border-coral" />
          </div>

          <div className="relative z-10 text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-coral mb-1">
              Now Playing
            </p>
            <h3 className="font-display text-xl font-bold text-silver mb-1">
              {SKILL_TRACKS[activeTrack].name}
            </h3>
            <p className="text-xs text-silver-dim">
              {SKILL_TRACKS[activeTrack].category}
            </p>
          </div>

          <div className="relative z-10 w-full mt-6">
            <div className="w-full h-1 rounded-full bg-surface overflow-hidden">
              <motion.div
                className="h-full bg-coral rounded-full"
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] font-mono text-silver-dim">0:00</span>
              <span className="text-[10px] font-mono text-silver-dim">3:00</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6 mt-4">
            <button onClick={handlePrev} className="text-silver-dim hover:text-silver transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handleMainPlay}
              className="w-12 h-12 rounded-full bg-coral flex items-center justify-center text-surface hover:bg-coral/90 transition-colors shadow-[0_0_20px_#F9706640]"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button onClick={handleNext} className="text-silver-dim hover:text-silver transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </GlassPanel>
      </div>

      <div className="flex-1">
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
                      : "bg-transparent border border-transparent hover:bg-[#FFFFFF08]"
                  }`}
                >
                  <span
                    className={`w-6 text-center font-mono text-xs ${
                      isActive ? "text-coral" : "text-silver-dim"
                    }`}
                  >
                    {isActive && isPlaying ? (
                      <span className="inline-flex gap-[2px] items-end h-3">
                        <span className="w-[3px] bg-coral rounded-full animate-eq-1" />
                        <span className="w-[3px] bg-coral rounded-full animate-eq-2" />
                        <span className="w-[3px] bg-coral rounded-full animate-eq-3" />
                        <span className="w-[3px] bg-coral rounded-full animate-eq-4" />
                        <span className="w-[3px] bg-coral rounded-full animate-eq-5" />
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
                      <span className="w-[3px] bg-coral rounded-full animate-eq-1" />
                      <span className="w-[3px] bg-coral rounded-full animate-eq-2" />
                      <span className="w-[3px] bg-coral rounded-full animate-eq-3" />
                      <span className="w-[3px] bg-coral rounded-full animate-eq-4" />
                      <span className="w-[3px] bg-coral rounded-full animate-eq-5" />
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
```

**Step 2: Verify build**

Run: `npx next build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/views/TechStackPlayer.tsx
git commit -m "feat: integrate Spotify modal and vinyl spin animation in TechStackPlayer"
```

---

## Task 7: Update Email Across All Components

**Files:**
- Modify: `lib/constants.ts` (update LINKS.email)

**Step 1: Update email in constants.ts**

In `lib/constants.ts`, change:
```typescript
// OLD
email: "mailto:hello@silverprincessk.com",

// NEW
email: "mailto:princesssilver928@gmail.com",
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "fix: update email to princesssilver928@gmail.com across all constants"
```

---

## Task 8: Wire Dark Mode Toggle in AboutSettings

**Files:**
- Modify: `components/views/AboutSettings.tsx`

**Step 1: Update AboutSettings.tsx**

Replace the entire file with:
```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useTheme } from "@/lib/hooks/useTheme";
import { PROFILE, SKILL_TRACKS } from "@/lib/constants";

export function AboutSettings() {
  const { theme, toggle } = useTheme();
  const [toggles, setToggles] = useState({
    sound: false,
    animations: true,
  });

  function handleToggle(key: keyof typeof toggles) {
    setToggles((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className="h-full flex p-6 gap-6">
      <div className="w-[380px] flex-shrink-0">
        <GlassPanel className="h-full p-6 flex flex-col" variant="premium">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-coral/20 border-2 border-coral/40 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-coral">SP</span>
            </div>
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
            <div className="w-full h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-xs text-silver-dim">Location</span>
              <span className="text-xs text-silver">{PROFILE.location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-3">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_TRACKS.map((s) => (
                <span
                  key={s.name}
                  className="px-2.5 py-1 rounded-lg bg-[#FFFFFF08] border border-border text-[11px] text-silver/70"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <GlassPanel className="p-6" variant="premium">
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-coral mb-5">
            System Settings
          </h3>
          <div className="space-y-4">
            {/* Dark Mode toggle — wired to theme context */}
            <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm text-silver">Dark Mode</span>
              <button
                onClick={toggle}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  theme === "dark" ? "bg-coral" : "bg-surface border border-border"
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
            <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm text-silver">Sound Effects</span>
              <button
                onClick={() => handleToggle("sound")}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  toggles.sound ? "bg-coral" : "bg-surface border border-border"
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
            <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm text-silver">Animations</span>
              <button
                onClick={() => handleToggle("animations")}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  toggles.animations ? "bg-coral" : "bg-surface border border-border"
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
          <div className="w-16 h-16 rounded-2xl bg-coral/10 border border-coral/20 flex items-center justify-center mb-4">
            <span className="font-display text-2xl font-bold text-coral">SP</span>
          </div>
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
            <div className="px-3 py-1 rounded-lg bg-[#FFFFFF08] border border-border text-[10px] font-mono text-silver-dim">
              Remote
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npx next build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/views/AboutSettings.tsx
git commit -m "feat: wire dark mode toggle to theme context in AboutSettings"
```

---

## Task 9: Mobile Responsive Layout

**Files:**
- Create: `components/dashboard/MobileDock.tsx`
- Create: `components/dashboard/MobileHudDrawer.tsx`
- Modify: `app/page.tsx` (responsive grid + mobile components)

**Step 1: Create MobileDock.tsx**

Create `components/dashboard/MobileDock.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { Map, Music, Thermometer, Pen, Settings } from "lucide-react";
import type { ActiveApp } from "@/lib/types";

interface MobileDockProps {
  activeApp: ActiveApp;
  onNavigate: (app: ActiveApp) => void;
}

const NAV_ITEMS: { id: ActiveApp; icon: typeof Map; label: string }[] = [
  { id: "navigation", icon: Map, label: "Projects" },
  { id: "media", icon: Music, label: "Tech Stack" },
  { id: "climate", icon: Thermometer, label: "Contact" },
  { id: "designs", icon: Pen, label: "Designs" },
  { id: "settings", icon: Settings, label: "About" },
];

export function MobileDock({ activeApp, onNavigate }: MobileDockProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass-premium rounded-t-2xl px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const isActive = activeApp === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                title={label}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "text-coral"
                    : "text-silver-dim"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-dock-indicator"
                    className="absolute -top-1 w-5 h-0.5 bg-coral rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-mono">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create MobileHudDrawer.tsx**

Create `components/dashboard/MobileHudDrawer.tsx`:
```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, BarChart3 } from "lucide-react";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";

interface MobileHudDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileHudDrawer({ isOpen, onClose }: MobileHudDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[300px] z-50 md:hidden"
          >
            <div className="relative h-full">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-[#FFFFFF08] border border-border flex items-center justify-center text-silver-dim hover:text-silver transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <PerformanceHUD />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 3: Update page.tsx with responsive layout**

Replace `app/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ControlDock } from "@/components/dashboard/ControlDock";
import { Viewport } from "@/components/dashboard/Viewport";
import { PerformanceHUD } from "@/components/dashboard/PerformanceHUD";
import { MobileDock } from "@/components/dashboard/MobileDock";
import { MobileHudDrawer } from "@/components/dashboard/MobileHudDrawer";
import type { ActiveApp } from "@/lib/types";

export default function Dashboard() {
  const [activeApp, setActiveApp] = useState<ActiveApp>("navigation");
  const [showMobileHud, setShowMobileHud] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_280px] grid-rows-[48px_1fr] h-screen overflow-hidden bg-mesh-dark">
      <StatusBar />

      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <ControlDock activeApp={activeApp} onNavigate={setActiveApp} />
      </div>

      {/* Mobile HUD trigger — visible only on mobile */}
      <div className="fixed top-3 right-16 z-50 md:hidden">
        <button
          onClick={() => setShowMobileHud(true)}
          className="w-9 h-9 rounded-xl glass-premium flex items-center justify-center text-silver-dim hover:text-coral transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>

      <Viewport activeApp={activeApp} />

      {/* Desktop HUD — hidden on mobile */}
      <div className="hidden md:block">
        <PerformanceHUD />
      </div>

      {/* Mobile bottom dock — hidden on desktop */}
      <MobileDock activeApp={activeApp} onNavigate={setActiveApp} />

      {/* Mobile HUD drawer */}
      <MobileHudDrawer
        isOpen={showMobileHud}
        onClose={() => setShowMobileHud(false)}
      />
    </div>
  );
}
```

**Step 4: Verify build**

Run: `npx next build`
Expected: PASS

**Step 5: Commit**

```bash
git add components/dashboard/MobileDock.tsx components/dashboard/MobileHudDrawer.tsx app/page.tsx
git commit -m "feat: add mobile responsive layout with floating bottom dock and HUD drawer"
```

---

## Task 10: Layout Integration with ThemeProvider

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update layout.tsx with ThemeProvider**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silver Princess K. | Portfolio",
  description:
    "Full-Stack Developer & Designer — Building at the intersection of structure & storytelling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wrap app in ThemeProvider for global theme state"
```

---

## Task 11: Upgrade Remaining Views to Premium Glass

**Files:**
- Modify: `components/views/ContactHUD.tsx`
- Modify: `components/views/DesignsView.tsx`
- Modify: `components/dashboard/ControlDock.tsx`
- Modify: `components/dashboard/PerformanceHUD.tsx`
- Modify: `components/dashboard/StatusBar.tsx`
- Modify: `components/map/ProjectDrawer.tsx`

**Step 1: Add variant="premium" to all GlassPanel usages**

In each file, find `<GlassPanel` and add `variant="premium"`:
- `ContactHUD.tsx`: both `<GlassPanel` tags
- `DesignsView.tsx`: the `<GlassPanel` tag wrapping the iframe
- `ControlDock.tsx`: no GlassPanel usage, but update the container class to use `glass-premium`
- `PerformanceHUD.tsx`: all three `<GlassPanel` tags
- `StatusBar.tsx`: no GlassPanel, but container already uses `bg-panel/80 backdrop-blur-md` — update to `glass-premium`
- `ProjectDrawer.tsx`: the slide-in panel container

For ControlDock.tsx, update the outer div:
```tsx
// OLD
<div className="flex flex-col items-center justify-center h-full bg-panel/60 backdrop-blur-md border-r border-border py-6 gap-1 relative">

// NEW
<div className="flex flex-col items-center justify-center h-full glass-premium border-r border-border py-6 gap-1 relative rounded-none">
```

For StatusBar.tsx, update the outer div:
```tsx
// OLD
<div className="col-span-3 h-12 bg-panel/80 backdrop-blur-md border-b border-border flex items-center justify-between px-5">

// NEW
<div className="col-span-1 md:col-span-3 h-12 glass-premium border-b border-border flex items-center justify-between px-5 rounded-none">
```

**Step 2: Verify build**

Run: `npx next build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/views/ContactHUD.tsx components/views/DesignsView.tsx components/dashboard/ControlDock.tsx components/dashboard/PerformanceHUD.tsx components/dashboard/StatusBar.tsx components/map/ProjectDrawer.tsx
git commit -m "feat: upgrade all panels to premium glassmorphism variant"
```

---

## Task 12: Final Build Verification

**Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: PASS (zero errors)

**Step 2: Production build**

Run: `npx next build`
Expected: PASS (clean build, zero warnings)

**Step 3: Start dev server and verify**

Run: `npx next dev --port=3000`
Open: http://localhost:3000

Visual checks:
- [ ] Dark mode renders by default with mesh gradient background
- [ ] Glass panels have premium blur and shadow
- [ ] World map renders with continent outlines
- [ ] Coral waypoint pins pulse on the map
- [ ] Clicking a pin opens the project drawer
- [ ] Tech Stack view shows vinyl record and equalizer
- [ ] Play button opens Spotify modal
- [ ] "Stream on Web" and "Open App" options present
- [ ] About view dark mode toggle works
- [ ] Toggling to light mode transforms all panels
- [ ] Light mode has off-white background and white panels
- [ ] Mobile viewport shows bottom dock
- [ ] Mobile viewport hides sidebar and right panel
- [ ] Stats icon on mobile opens HUD drawer
- [ ] All social links functional (GitHub, LinkedIn, WhatsApp, Email)
- [ ] Email links to princesssilver928@gmail.com
- [ ] No console errors

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: final visual polish and responsive adjustments"
```

**Step 5: Push to GitHub**

```bash
git push origin main
```

---

## Summary

| Task | Files Changed | Est. Time |
|------|---------------|-----------|
| 1. Theme Context | +2 files | 5 min |
| 2. CSS Tokens | 1 file | 5 min |
| 3. GlassPanel Premium | 1 file | 3 min |
| 4. World Map | +1, -1, 1 mod | 10 min |
| 5. Spotify Modal | +1, 1 mod | 8 min |
| 6. TechStackPlayer | 1 file | 8 min |
| 7. Email Update | 1 file | 2 min |
| 8. Dark Mode Toggle | 1 file | 5 min |
| 9. Mobile Responsive | +2, 1 mod | 15 min |
| 10. Layout Integration | 1 file | 3 min |
| 11. Premium Glass Upgrade | 6 files | 10 min |
| 12. Final Verification | — | 10 min |
| **Total** | **18 files** | **~85 min** |
