/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useMotionValue, useTransform, cubicBezier } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const features = [
  { icon: "🎤", title: "AI Mock Interviews", desc: "Simulate real FAANG-style technical and behavioral interviews with adaptive AI.", accent: "from-galaxy-purple to-galaxy-indigo" },
  { icon: "⚡", title: "Real-time Feedback", desc: "Instant scoring on clarity, depth, and accuracy after every answer.", accent: "from-galaxy-cyan to-galaxy-indigo" },
  { icon: "🧠", title: "Smart Question Engine", desc: "500+ curated questions with infinite variation across domains.", accent: "from-galaxy-violet to-galaxy-purple" },
  { icon: "📊", title: "Performance Analytics", desc: "Track progress, identify weak spots, and optimize prep.", accent: "from-pink-400 to-galaxy-purple" },
  { icon: "🌌", title: "AI Thinking Mode", desc: "See how top engineers think in real time.", accent: "from-galaxy-indigo to-galaxy-cyan" },
  { icon: "🏆", title: "Company Tracks", desc: "Practice real interview patterns from top companies.", accent: "from-galaxy-purple to-pink-400" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 50, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) } } };

function FeatureCard({ f }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.04 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/0 transition"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-gradient-to-br from-galaxy-purple/30 to-galaxy-cyan/30" />
      <div className="relative glass p-6 rounded-2xl h-full overflow-hidden">
        <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} p-[1px] mb-5`}>
          <div className="w-full h-full rounded-xl bg-galaxy-secondary flex items-center justify-center text-xl">{f.icon}</div>
        </motion.div>
        <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
        <p className="text-galaxy-subtext text-sm leading-relaxed">{f.desc}</p>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
          <div className="absolute -top-1/2 left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-12 translate-x-[-50%]" />
        </div>
      </div>
    </motion.div>
  );
}

// ==================== 3D Galaxy Sphere ====================
function GalaxySphere({ segments }: { segments: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0015;
    meshRef.current.rotation.x += 0.0005;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, segments, segments]} />
      <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.3} roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

function GalaxyScene({ segments }: { segments: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Stars radius={50} depth={100} count={2000} factor={2} fade speed={0.3} />
      <GalaxySphere segments={segments} />
    </>
  );
}

// ==================== Particle Overlay ====================
function ParticleOverlay({ particleCount }: { particleCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; r: number; speed: number; phase: number }[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) / 3;

    for (let i = 0; i < particleCount; i++) {
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
        ctx.fillStyle = `rgba(167,139,250,${a * 0.35})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

// ==================== Main Features Component ====================
export default function Features() {
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const isMobile = windowSize.w < 768;
  const sphereSegments = isMobile ? 32 : 64;
  const particleCount = isMobile ? 50 : 120;

  useEffect(() => {
    const resize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* 3D Galaxy */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <GalaxyScene segments={sphereSegments} />
      </Canvas>

      {/* Floating Particles */}
      <ParticleOverlay particleCount={particleCount} />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="inline-block text-xs font-mono text-galaxy-violet tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-purple/30 bg-galaxy-purple/10">
            Everything You Need
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4">
            Built to get you <span className="text-gradient">hired.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-md mx-auto text-sm sm:text-base">Every feature is designed to accelerate your interview success.</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div key={f.title} variants={item}><FeatureCard f={f} /></motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}