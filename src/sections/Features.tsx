/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useMotionValue, useTransform, cubicBezier } from "framer-motion";

const features = [
  {
    icon: "🎤",
    title: "AI Mock Interviews",
    desc: "Simulate real FAANG-style technical and behavioral interviews with adaptive AI.",
    accent: "from-galaxy-purple to-galaxy-indigo",
  },
  {
    icon: "⚡",
    title: "Real-time Feedback",
    desc: "Instant scoring on clarity, depth, and accuracy after every answer.",
    accent: "from-galaxy-cyan to-galaxy-indigo",
  },
  {
    icon: "🧠",
    title: "Smart Question Engine",
    desc: "500+ curated questions with infinite variation across domains.",
    accent: "from-galaxy-violet to-galaxy-purple",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    desc: "Track progress, identify weak spots, and optimize prep.",
    accent: "from-pink-400 to-galaxy-purple",
  },
  {
    icon: "🌌",
    title: "AI Thinking Mode",
    desc: "See how top engineers think in real time.",
    accent: "from-galaxy-indigo to-galaxy-cyan",
  },
  {
    icon: "🏆",
    title: "Company Tracks",
    desc: "Practice real interview patterns from top companies.",
    accent: "from-galaxy-purple to-pink-400",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.04 }}
      className="group relative rounded-2xl p-px bg-linear-to-br from-white/10 to-white/0 transition"
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-linear-to-br from-galaxy-purple/30 to-galaxy-cyan/30" />

      {/* Card */}
      <div className="relative glass p-6 rounded-2xl h-full overflow-hidden">
        
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`w-12 h-12 rounded-xl bg-linear-to-br ${f.accent} p-px mb-5`}
        >
          <div className="w-full h-full rounded-xl bg-galaxy-secondary flex items-center justify-center text-xl">
            {f.icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-white font-semibold text-lg mb-2">
          {f.title}
        </h3>

        {/* Desc */}
        <p className="text-galaxy-subtext text-sm leading-relaxed">
          {f.desc}
        </p>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
          <div className="absolute -top-1/2 left-1/2 w-[200%] h-[200%] bg-linear-to-tr from-transparent via-white/10 to-transparent rotate-12 translate-x-[-50%]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-225 h-100 bg-galaxy-purple/10 blur-[120px] top-20 left-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-galaxy-violet tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-purple/30 bg-galaxy-purple/10">
            Everything You Need
          </span>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4">
            Built to get you <span className="text-gradient">hired.</span>
          </h2>

          <p className="text-galaxy-subtext max-w-md mx-auto text-sm sm:text-base">
            Every feature is designed to accelerate your interview success.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <FeatureCard f={f} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}