# EV Smart Dashboard Refactor — Design Spec

**Date:** 2026-07-03
**Author:** opencode (AI assistant)
**Status:** Approved — ready for implementation planning
**Deployment:** princessksilver.vercel.app

---

## 1. Goal

Refactor the current portfolio dashboard from a flat, dark mockup into a high-end, production-grade luxury EV Infotainment Dashboard. The existing component structure (23 source files, Next.js 15 App Router, Tailwind v4, Framer Motion) is solid — this is an enhancement pass, not a rewrite.

## 2. Constraints

- Framework: Next.js 15 App Router, React 19, TypeScript strict mode
- Styling: Tailwind CSS v4 with `@theme` tokens, Framer Motion for animations
- Layout: `h-screen overflow-hidden`, zero scroll on desktop
- Accent: Subtle Coral `#F97066`
- Fonts: Inter (body), Space Grotesk (headings) via Google Fonts
- No new npm dependencies (Spotify embed uses iframe, no SDK needed)
- Must deploy cleanly to Vercel

## 3. Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Theme approach | CSS custom properties + React context | No JS runtime cost for most styles; context only for toggle state |
| World map | Inline SVG (simplified continents) | No external API, no tile loading, ~5KB, works offline |
| Spotify integration | iframe embed + deep link | No OAuth needed, no API keys, works immediately |
| Light mode scope | Full implementation | User explicitly requested complete light theme |
| Mobile nav | Floating bottom dock | User chose this over slide-up sheet |
| Email | princesssilver928@gmail.com | User confirmed replacement |
| Map pin positions | Abstract (not geographic) | User chose decorative placement |

## 4. Architecture

### 4.1 Theme System

**New file: `lib/hooks/useTheme.ts`**

```tsx
// React context providing theme state
// Persists to localStorage
// Sets data-theme attribute on <html>
// Provides: theme ('dark' | 'light'), toggle(), setTheme()
```

**CSS strategy:**
- `globals.css` defines tokens under `@theme` (dark defaults)
- Light mode tokens defined under `[data-theme="light"]` selector
- All components use Tailwind utility classes that reference tokens (e.g., `bg-surface`, `text-silver`)
- Theme switch is instant via CSS custom property swap — no re-render needed for visual changes
- Smooth transition: `transition-colors duration-300` on body and glass panels

### 4.2 Color Tokens

**Dark mode (default):**
```
--color-surface: #0A0A0F      (main background)
--color-panel: #111114         (card/panel background)
--color-coral: #F97066         (accent)
--color-silver: #E2E2E2        (primary text)
--color-silver-dim: #6B6B6B    (secondary text)
--color-border: #1E1E22        (borders)
```

**Light mode:**
```
--color-surface: #F5F5F0       (warm off-white)
--color-panel: #FFFFFF         (crisp white)
--color-coral: #E8604E         (slightly deeper coral for contrast)
--color-silver: #1A1A1A        (deep charcoal text)
--color-silver-dim: #6B6B6B    (stays same — already accessible)
--color-border: #E5E5E5        (light gray borders)
```

### 4.3 Visual Depth Enhancements

**New CSS classes:**
- `.bg-mesh-dark` — `background: radial-gradient(ellipse at 20% 50%, #111118 0%, #0A0A0F 50%, #08080C 100%)`
- `.bg-mesh-light` — `background: radial-gradient(ellipse at 20% 50%, #FAFAF8 0%, #F5F5F0 50%, #EEEDE8 100%)`
- `.glass-premium` — `backdrop-blur-xl bg-white/[0.02] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]`
- `.glass-premium-light` — `backdrop-blur-xl bg-black/[0.02] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)]`
- `.glow-coral` — `shadow-[0_0_15px_rgba(249,112,102,0.3)]`

**GlassPanel.tsx upgrade:**
```tsx
interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'premium';  // new prop
}
```
- `default`: current behavior
- `premium`: uses `.glass-premium` or `.glass-premium-light` based on theme

## 5. Component Changes

### 5.1 `app/globals.css`
- Add light mode tokens under `[data-theme="light"]`
- Add `.bg-mesh-dark`, `.bg-mesh-light` utilities
- Add `.glass-premium`, `.glass-premium-light` utilities
- Add `.glow-coral` utility
- Add `@keyframes spin-slow` for vinyl record (3s rotation)
- Add `.animate-spin-slow` class

### 5.2 `app/layout.tsx`
- Wrap children in `<ThemeProvider>`
- Add `suppressHydrationWarning` to `<html>` for theme init

### 5.3 `app/page.tsx`
- Replace `bg-surface` with `bg-mesh-dark dark:bg-mesh-light` (or use theme context)
- Add responsive grid: `grid-cols-[64px_1fr_280px]` on desktop, `grid-cols-1` on mobile
- Add mobile bottom dock (visible only on `md:` breakpoint)
- Add mobile HUD drawer trigger (visible only on `md:` breakpoint)

### 5.4 `components/dashboard/StatusBar.tsx`
- No structural changes
- Theme-aware: text colors automatically adapt via tokens

### 5.5 `components/dashboard/ControlDock.tsx`
- Desktop: unchanged (left sidebar)
- Mobile: hidden, replaced by floating bottom dock in `page.tsx`
- Uses `premium` glass variant

### 5.6 `components/dashboard/PerformanceHUD.tsx`
- Desktop: unchanged (right panel)
- Mobile: hidden by default, slides in from right when triggered
- Uses `premium` glass variant

### 5.7 `components/dashboard/Viewport.tsx`
- No changes (already handles view switching correctly)

### 5.8 `components/views/ProjectsMap.tsx`
- Replace `<GridCanvas />` with `<WorldMap />`
- Waypoints stay the same (abstract positions)
- Title and count overlay stay the same

### 5.9 `components/map/GridCanvas.tsx` → rename to `components/map/WorldMap.tsx`
- Replace SVG grid pattern with simplified world map SVG
- Continent outlines as `<path>` elements (dark fill, light stroke)
- Subtle grid overlay on top of map (existing pattern, lower opacity)
- Legend at bottom stays the same

### 5.10 `components/map/Waypoint.tsx`
- No structural changes
- Hover tooltip stays the same
- Pulse ring animation stays the same

### 5.11 `components/map/ProjectDrawer.tsx`
- Uses `premium` glass variant for the slide-in panel
- No other structural changes

### 5.12 `components/views/TechStackPlayer.tsx`
- Add Spotify modal overlay (triggered by Play button)
- Modal has two options: "Stream on Web" (iframe embed) and "Open App" (deep link)
- Vinyl record gets `animate-spin-slow` when playing
- Equalizer bars stay the same
- Uses `premium` glass variant

### 5.13 `components/views/ContactHUD.tsx`
- Update email link to `mailto:princesssilver928@gmail.com`
- Uses `premium` glass variant
- No other structural changes

### 5.14 `components/views/DesignsView.tsx`
- Uses `premium` glass variant
- No other structural changes

### 5.15 `components/views/AboutSettings.tsx`
- Wire "Dark Mode" toggle to theme context
- Remove `locked: true` from darkMode toggle
- Uses `premium` glass variant
- No other structural changes

### 5.16 `components/ui/GlassPanel.tsx`
- Add `variant` prop (`'default' | 'premium'`)
- Theme-aware: uses dark or light glass based on current theme

### 5.17 `components/ui/ActionButton.tsx`
- No changes

### 5.18 `components/ui/DialControl.tsx`
- No changes

### 5.19 `lib/types.ts`
- Add `Theme` type: `'dark' | 'light'`

### 5.20 `lib/constants.ts`
- Update `LINKS.email` to `mailto:princesssilver928@gmail.com`
- Add `SPOTIFY_PLAYLIST` constant for lo-fi playlist URL

### 5.21 `lib/github.ts`
- No changes

### 5.22 `lib/hooks/useClock.ts`
- No changes

### 5.23 `lib/hooks/useGitHubRepos.ts`
- No changes

## 6. New Files

| File | Purpose |
|------|---------|
| `lib/hooks/useTheme.ts` | Theme context provider with localStorage persistence |
| `components/map/WorldMap.tsx` | SVG world map replacing GridCanvas |
| `components/views/SpotifyModal.tsx` | Modal for Spotify embed/deep-link choice |
| `components/dashboard/MobileDock.tsx` | Floating bottom nav for mobile viewports |
| `components/dashboard/MobileHudDrawer.tsx` | Slide-in right panel for mobile viewports |

## 7. Responsive Breakpoints

| Viewport | Layout |
|----------|--------|
| `≥1024px` (desktop) | 3-column: sidebar 64px, viewport 1fr, HUD 280px |
| `768px–1023px` (tablet) | 2-column: viewport 1fr, HUD as drawer, sidebar as bottom dock |
| `<768px` (mobile) | Single column: full-width viewport, bottom dock, HUD as drawer |

## 8. External Integrations

| Integration | Method | Details |
|-------------|--------|---------|
| GitHub API | Client-side fetch | Unchanged — `fetchRepos()` with `cache: "no-store"` |
| Spotify Web Embed | iframe | `https://open.spotify.com/embed/playlist/{id}?theme=0` |
| Spotify Deep Link | `window.open` | `spotify:playlist:{id}` protocol |
| Figma Embed | iframe | Unchanged |
| WhatsApp | `href` link | Unchanged — `wa.me/2349018408952` |
| Email | `mailto:` link | Updated to `princesssilver928@gmail.com` |

## 9. File Change Summary

| Action | Files |
|--------|-------|
| **Modified** | `globals.css`, `layout.tsx`, `page.tsx`, `GlassPanel.tsx`, `ControlDock.tsx`, `PerformanceHUD.tsx`, `ProjectsMap.tsx`, `TechStackPlayer.tsx`, `ContactHUD.tsx`, `DesignsView.tsx`, `AboutSettings.tsx`, `types.ts`, `constants.ts` |
| **Renamed** | `GridCanvas.tsx` → `WorldMap.tsx` |
| **New** | `useTheme.ts`, `WorldMap.tsx`, `SpotifyModal.tsx`, `MobileDock.tsx`, `MobileHudDrawer.tsx` |
| **Unchanged** | `StatusBar.tsx`, `Viewport.tsx`, `Waypoint.tsx`, `ProjectDrawer.tsx`, `ActionButton.tsx`, `DialControl.tsx`, `github.ts`, `useClock.ts`, `useGitHubRepos.ts` |

## 10. Verification

After implementation:
1. `npx tsc --noEmit` — zero TypeScript errors
2. `npx next build` — clean production build, zero warnings
3. Visual check: dark mode default looks like premium EV dashboard
4. Visual check: light mode toggle transforms to bright luxury theme
5. Visual check: world map renders with coral pins
6. Visual check: Spotify modal opens on play button click
7. Visual check: mobile layout has bottom dock, no broken overflow
8. Social links: all 4 channels (GitHub, LinkedIn, WhatsApp, Email) functional
9. Project links: Loud Gadgets and Velvet Coffee live URLs accessible
