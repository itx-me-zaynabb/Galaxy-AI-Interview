import { motion, cubicBezier } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Page } from "../App";

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};
const TAGS = ["GPT-4 Powered", "Real-time Feedback", "500+ Companies", "FAANG Ready"];

interface HeroProps { setPage: (p: Page) => void; }

export default function Hero({ setPage }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles: { x: number; y: number; r: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 200; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.3 + 0.2, speed: Math.random() * 0.003 + 0.001, phase: Math.random() * Math.PI * 2 });
    }
    let t = 0; let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      particles.forEach((p) => {
        const a = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * p.speed * 100 + p.phase));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${a * 0.55})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{ backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-galaxy-purple/10 blur-[100px] pointer-events-none" />

      <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-galaxy-violet border border-galaxy-purple/30">
            <span className="w-1.5 h-1.5 rounded-full bg-galaxy-cyan animate-pulse-slow" />
            AI-Powered Interview Simulator — Now in Beta
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
          <span className="block text-white">Ace Every</span>
          <span className="block text-gradient">Interview.</span>
          <span className="block text-white/55 text-4xl md:text-5xl lg:text-6xl font-medium mt-2">Powered by Galaxy AI.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-galaxy-subtext text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Simulate real technical and behavioral interviews. Get instant AI feedback, track your performance, and land your dream job.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-14">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(124,58,237,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage("interview")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-galaxy-purple via-galaxy-indigo to-galaxy-purple text-white font-semibold text-base shadow-glow"
          >
            🎤 Start Mock Interview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage("dashboard")}
            className="px-8 py-4 rounded-xl glass text-galaxy-text font-medium text-base hover:border-galaxy-purple/50 transition-all"
          >
            View Dashboard →
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-16">
          {TAGS.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-mono text-galaxy-muted border border-galaxy-border/60 bg-galaxy-secondary/50">{tag}</span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-3xl glass rounded-2xl overflow-hidden shadow-glowStrong border border-galaxy-purple/20">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-galaxy-border/40 bg-galaxy-secondary/60">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-galaxy-muted text-xs font-mono">galaxy-ai — interview session</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-galaxy-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-galaxy-cyan animate-pulse" /> LIVE
            </span>
          </div>
          <div className="p-6 text-left">
            <div className="flex gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-galaxy-purple to-galaxy-cyan flex-shrink-0 flex items-center justify-center text-xs font-bold">AI</div>
              <div className="glass rounded-xl rounded-tl-none px-4 py-3 text-sm text-galaxy-text leading-relaxed max-w-lg">
                Explain how you would design a distributed rate limiter that handles <span className="text-galaxy-violet font-medium">10M requests/second</span> across multiple data centers.
              </div>
            </div>
            <div className="flex gap-3 justify-end mb-5">
              <div className="bg-galaxy-purple/20 border border-galaxy-purple/30 rounded-xl rounded-tr-none px-4 py-3 text-sm text-galaxy-text leading-relaxed max-w-lg">
                I'd use a token bucket algorithm with Redis as the distributed store...
                <span className="inline-block w-0.5 h-4 bg-galaxy-cyan ml-1 animate-pulse align-middle" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-galaxy-border flex-shrink-0 flex items-center justify-center text-xs font-medium">U</div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-galaxy-violet"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-galaxy-violet">AI analyzing your answer...</span>
              <span className="ml-auto text-xs text-galaxy-muted font-mono">score: 87/100</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}