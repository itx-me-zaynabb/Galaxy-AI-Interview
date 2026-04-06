/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useInView, useMotionValue, useSpring, useViewportScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const stats = [
  { value: 94, suffix: "%", label: "Users improved in 2 weeks", color: "text-galaxy-cyan" },
  { value: 500, suffix: "+", label: "Curated questions", color: "text-galaxy-violet" },
  { value: 50, suffix: "+", label: "Top companies", color: "text-galaxy-purple" },
  { value: 12000, suffix: "+", label: "Active learners", color: "text-pink-400" },
];

const metrics = [
  { label: "System Design", score: 87, color: "from-galaxy-purple to-galaxy-indigo" },
  { label: "Data Structures", score: 74, color: "from-galaxy-cyan to-galaxy-indigo" },
  { label: "Behavioral", score: 92, color: "from-galaxy-violet to-galaxy-purple" },
  { label: "Problem Solving", score: 68, color: "from-pink-400 to-galaxy-purple" },
];

// Count up
function CountUp({ value, suffix }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2 });

  useEffect(() => { if (inView) motionValue.set(value); }, [inView]);

  return <motion.span ref={ref}>{spring.get().toFixed(0)}{suffix}</motion.span>;
}

// ==================== 3D Galaxy Sphere ====================
function GalaxySphere({ segments }: { segments: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.002;
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

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [particleCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

// ==================== Analytics Component ====================
export default function Analytics() {
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const isMobile = windowSize.w < 768;
  const sphereSegments = isMobile ? 32 : 64;
  const particleCount = isMobile ? 50 : 120;

  useEffect(() => {
    const resize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <GalaxyScene segments={sphereSegments} />
      </Canvas>

      {/* Particle Overlay */}
      <ParticleOverlay particleCount={particleCount} />

      {/* Content with Parallax */}
      <motion.div style={{ y: parallaxY }} className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-xs font-mono text-galaxy-violet uppercase px-3 py-1 rounded-full border border-galaxy-violet/30 bg-galaxy-violet/10">
            Performance Analytics
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mt-4">
            Track every <span className="text-gradient">improvement.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-md mx-auto mt-2 text-sm sm:text-base">
            Understand your growth with real-time insights.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05 }} className="glass p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-galaxy-purple/10 to-transparent" />
                <div className={`text-3xl sm:text-4xl font-extrabold ${s.color}`}><CountUp value={s.value} suffix={s.suffix} /></div>
                <div className="text-galaxy-subtext text-xs sm:text-sm mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Analytics Card */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} whileHover={{ y: -5 }} className="glass p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 blur-xl bg-gradient-to-br from-galaxy-purple/20 to-galaxy-cyan/20" />
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div><h3 className="text-white font-semibold">Session Report</h3><p className="text-xs text-galaxy-subtext font-mono">Last 7 days · 12 sessions</p></div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">↑ +14%</span>
            </div>
            <div className="space-y-5 relative z-10">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1"><span>{m.label}</span><span className="font-mono text-white">{m.score}</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.score}%` }} transition={{ duration: 1, delay: i * 0.15 }} className={`h-full bg-gradient-to-r ${m.color}`} />
                    <motion.div initial={{ left: "-20%" }} whileInView={{ left: "100%" }} transition={{ duration: 1.2, delay: i * 0.2 }} className="absolute top-0 h-full w-10 bg-white/20 blur-md" />
                  </div>
                </div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 p-4 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20 text-sm relative z-10">
              🧠 Focus on <b>Problem Solving</b> — fastest improvement potential.
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}