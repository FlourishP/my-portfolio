# CLAUDE.md — Silver Princess Portfolio

## Session Rules (Mandatory)

### Prompt Workflow
1. **Always improve prompts** before executing — analyze for ambiguity, UX gaps, missing requirements
2. **ui-ux-pro-max** — Apply the Quick Reference checklist (priorities 1-3 CRITICAL) for all frontend work
3. **using-superpowers** — Invoke relevant skills before any implementation
4. **grill-me** — Run a grilling session to sharpen plans/designs before implementation

### Development Workflow
5. **Chrome DevTools** — Test every feature in Chrome DevTools (Performance, Lighthouse, Accessibility tabs) before marking complete
6. **Push to GitHub** — After testing passes, commit and push every new feature to GitHub

## Design System

### Palette
- Surface: `#0A0A0F`
- Panel: `#111114`
- Coral: `#F97066`
- Silver: `#E2E2E2`
- Silver Dim: `#6B6B6B`
- Glass: `#FFFFFF08`
- Glass Hover: `#FFFFFF12`
- Border: `#1E1E22`

### Typography
- Body: Inter (300, 400, 600)
- Display: Space Grotesk (300, 500, 700)

### Components
- Glass panels: `bg-glass backdrop-blur-md border border-border rounded-2xl`
- Touch targets: minimum 44x44pt
- Animations: 150-300ms, spring-physics, respect prefers-reduced-motion

### Z-Index Scale
- `--z-base: 0`
- `--z-dock: 10`
- `--z-drawer: 20`
- `--z-overlay: 30`
- `--z-modal: 40`

## Tech Stack
- Next.js 15 App Router
- React 19
- TypeScript 5.8 (strict)
- Tailwind CSS v4
- motion/react (Framer Motion)
- Lucide React icons

## Project Structure
```
app/           — Next.js App Router pages
components/
  dashboard/   — StatusBar, ControlDock, Viewport, PerformanceHUD
  views/       — ProjectsMap, TechStackPlayer, ContactHUD, DesignsView, AboutSettings
  map/         — GridCanvas, Waypoint, ProjectDrawer
  ui/          — GlassPanel, ActionButton, DialControl, Skeleton, ErrorBoundary, FocusRing
lib/
  hooks/       — useClock, useGitHubRepos
  constants.ts — links, profile, skills
  types.ts     — TypeScript interfaces
  github.ts    — GitHub API fetch
```

## Deployment
- Vercel (auto-deploy from main branch)
- GitHub: FlourishP/my-portfolio
