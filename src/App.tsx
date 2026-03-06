import { motion } from "motion/react";
import { ArrowUpRight, Cpu, Layout, Globe, Mail, Github, Linkedin, Terminal } from "lucide-react";

const PROJECTS = [
  {
    title: "Aura Fintech",
    description: "Predictive wealth management interface driven by real-time AI financial analysis.",
    category: "AI Fintech",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Lumina Luxe",
    description: "Immersive digital storefront blending heritage luxury with modern algorithmic curation.",
    category: "Luxury E-commerce",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    title: "Nexus Spatial",
    description: "Next-generation interface for seamless interaction within fluid spatial computing environments.",
    category: "Spatial Computing",
    icon: <Globe className="w-5 h-5" />,
  },
];

export default function App() {
  return (
    <div className="min-h-screen selection:bg-electric selection:text-midnight">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display font-bold text-xl tracking-tighter"
        >
          SILVER PRINCESS
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-8 text-xs font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
        >
          <a href="#work" className="hover:text-electric transition-colors">Work</a>
          <a href="#about" className="hover:text-electric transition-colors">About</a>
          <a href="#contact" className="hover:text-electric transition-colors">Contact</a>
        </motion.div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/10 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-electric mb-6 block">
              Digital Architect & Strategist
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl mb-12">
              Architecting Human-Centric <br />
              <span className="text-gradient">Digital Futures.</span>
            </h1>
            
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-electric text-midnight font-display font-bold text-sm rounded-full flex items-center gap-2 group"
              >
                View Projects
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-silver" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 md:px-24 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight mb-8">The Philosophy</h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-electric mb-4">AI Orchestration</p>
            </div>
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-silver/80">
                I specialize in <span className="text-silver font-medium">AI Orchestration</span> to create seamless, high-end interfaces. 
                My work bridges the gap between complex technology and human intuition.
              </p>
              <div className="flex gap-6 pt-8">
                <Terminal className="w-6 h-6 text-electric opacity-50" />
                <div className="h-px flex-1 bg-white/10 self-center" />
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 px-6 md:px-24 bg-white/[0.02]">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-5xl font-bold tracking-tighter">Selected <br />Works</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">2024 — 2026</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl group hover:border-electric/30 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-8 group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-electric/60 mb-2">
                  {project.category}
                </p>
                <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-sm text-silver/60 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Case Study <ArrowUpRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-48 px-6 md:px-24 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/5 rounded-full blur-[150px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-12">
              Let's build <br />the <span className="text-electric italic">future.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <a href="mailto:hello@silverprincess.ai" className="group flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-electric group-hover:text-midnight transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-display text-xl font-medium">hello@silverprincess.ai</span>
              </a>
              
              <div className="flex gap-6">
                <a href="#" className="p-4 rounded-full border border-white/10 hover:border-electric transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-4 rounded-full border border-white/10 hover:border-electric transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-6 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-display font-bold text-sm tracking-tighter opacity-40">
          © 2026 SILVER PRINCESS. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest opacity-40">
          <span>London / Tokyo / Digital</span>
          <span>Built with AI Orchestration</span>
        </div>
      </footer>
    </div>
  );
}
