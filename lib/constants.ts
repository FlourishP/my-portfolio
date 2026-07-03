import type { Project, SkillTrack } from "./types";

export const GITHUB_USERNAME = "FlourishP";
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

export const LINKS = {
  github: "https://github.com/FlourishP",
  linkedin: "https://www.linkedin.com/in/silverprincessk",
  email: "mailto:princesssilver928@gmail.com",
  whatsapp:
    "https://wa.me/2349018408952?text=Hi%20Princess!%20I%27m%20reaching%20out%20regarding...",
  figma:
    "https://www.figma.com/design/LMWaQucOeshomqSaNYHYa0/fintech-app?node-id=4-2",
  loudGadgets: "https://loud-gadgets-store.vercel.app",
  velvetCoffee: "https://velvet-coffee.vercel.app",
  spotify: "https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j",
} as const;

export const PROFILE = {
  name: "Silver Princess K.",
  shortName: "Princess",
  role: "Full-Stack Developer & Designer",
  bio: "Building at the intersection of structure & storytelling. Obsessed with scalable backends, modern UI, and AI-driven dev.",
  company: "Othryn Ventures LTD",
  location: "Remote",
} as const;

export const SKILL_TRACKS: SkillTrack[] = [
  { number: "01", name: "Next.js", category: "React Framework" },
  { number: "02", name: "React", category: "UI Library" },
  { number: "03", name: "TypeScript", category: "Type-Safe JS" },
  { number: "04", name: "Tailwind CSS", category: "Utility CSS" },
  { number: "05", name: "Node.js", category: "Server Runtime" },
  { number: "06", name: "Python", category: "Scripting & AI" },
  { number: "07", name: "PostgreSQL", category: "Database" },
  { number: "08", name: "Git & GitHub", category: "Version Control" },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "loud-gadgets",
    title: "Loud Gadgets",
    description:
      "Premium Tech Store in Enugu — a sleek e-commerce platform for discovering and purchasing cutting-edge tech gadgets.",
    category: "E-Commerce",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: LINKS.loudGadgets,
    repoUrl: "https://github.com/FlourishP/loud-gadgets",
    languages: { TypeScript: 89.7, CSS: 9.3, JavaScript: 1.0 },
    commits: 8,
    gridPosition: { x: 25, y: 35 },
  },
  {
    id: "velvet-coffee",
    title: "Velvet Coffee",
    description:
      "A warm, inviting coffee shop landing page with immersive visuals and smooth interactions.",
    category: "Landing Page",
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    liveUrl: LINKS.velvetCoffee,
    repoUrl: "https://github.com/FlourishP/velvet-coffee",
    languages: { TypeScript: 84.1, HTML: 13.3, CSS: 2.6 },
    commits: 3,
    gridPosition: { x: 65, y: 55 },
  },
];
