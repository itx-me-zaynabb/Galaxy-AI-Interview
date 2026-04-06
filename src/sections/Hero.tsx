// Hero.tsx
import { motion, cubicBezier } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Page } from "../App";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};
const TAGS = ["GPT-4 Powered", "Real-time Feedback", "500+ Companies", "FAANG Ready"];

interface HeroProps { setPage: (p: Page) => void; }

// ==================== 3D Galaxy Sphere with Parallax ====================
function GalaxySphere({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.002 + mouse.x * 0.002;
    meshRef.current.rotation.x += 0.0005 + mouse.y * 0.002;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2 + mouse.y * 0.5;
    meshRef.current.position.x = mouse.x * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ==================== Galaxy Scene (3D) ====================
function GalaxyScene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <Stars radius={50} depth={100} count={5000} factor={4} fade speed={1} />
      <GalaxySphere mouse={mouse} />
    </>
  );
}

// ==================== Hero Component ====================
export default function Hero({ setPage }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * -2; // -1 to 1
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Update window size
  useEffect(() => {
    const resize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 2D particle overlay (center only)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = windowSize.w;
    canvas.height = windowSize.h;

    const particles: { x: number; y: number; r: number; speed: number; phase: number }[] = [];
    const centerX = windowSize.w / 2;
    const centerY = windowSize.h / 2;
    const radius = Math.min(windowSize.w, windowSize.h) / 3; // center circle

    for (let i = 0; i < 150; i++) {
      // generate points inside circle
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      particles.push({ x, y, r: Math.random() * 1.3 + 0.2, speed: Math.random() * 0.003 + 0.001, phase: Math.random() * Math.PI * 2 });
    }

    let t = 0; let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      particles.forEach((p) => {
        const a = 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * p.speed * 100 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${a * 0.55})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [windowSize]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* 3D Galaxy Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0 z-0">
        <GalaxyScene mouse={mouse} />
      </Canvas>

      {/* 2D Particle Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Grid & Blur Halo */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] rounded-full bg-galaxy-purple/10 blur-[100px] pointer-events-none z-10" />

      {/* Hero Content */}
      <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-galaxy-violet border border-galaxy-purple/30">
            <span className="w-1.5 h-1.5 rounded-full bg-galaxy-cyan animate-pulse-slow" />
            AI-Powered Interview Simulator — Now in Beta
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
          <span className="block text-white">Ace Every</span>
          <span className="block text-gradient">Interview.</span>
          <span className="block text-white/55 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-medium mt-2">Powered by Galaxy AI.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-galaxy-subtext text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Simulate real technical and behavioral interviews. Get instant AI feedback, track your performance, and land your dream job.
        </motion.p>

        {/* Buttons */}
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

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-16">
          {TAGS.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-mono text-galaxy-muted border border-galaxy-border/60 bg-galaxy-secondary/50">{tag}</span>
          ))}
        </motion.div>

        {/* ===== Live AI session box ===== */}
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