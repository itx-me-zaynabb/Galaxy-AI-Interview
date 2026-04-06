import { motion } from "framer-motion";

const features = [
  {
    icon: "🎤",
    title: "AI Mock Interviews",
    desc: "Simulate real FAANG-style technical and behavioral interviews with our GPT-4 powered interviewer that adapts to your level.",
    accent: "from-galaxy-purple to-galaxy-indigo",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: "⚡",
    title: "Real-time Feedback",
    desc: "Get instant scoring on clarity, depth, and technical accuracy. Know exactly where you stand after every answer.",
    accent: "from-galaxy-cyan to-galaxy-indigo",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    icon: "🧠",
    title: "Smart Question Engine",
    desc: "500+ curated questions across System Design, DSA, Behavioral, and role-specific tracks. Infinite variation, never repeat.",
    accent: "from-galaxy-violet to-galaxy-purple",
    glow: "rgba(167,139,250,0.3)",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    desc: "Track your progress over time with detailed charts. Identify weak spots, celebrate improvements, optimize study time.",
    accent: "from-galaxy-pink to-galaxy-purple",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: "🌌",
    title: "AI Thinking Mode",
    desc: "Watch the AI reason through your answer in real time. Learn how top engineers think, not just what they say.",
    accent: "from-galaxy-indigo to-galaxy-cyan",
    glow: "rgba(79,70,229,0.3)",
  },
  {
    icon: "🏆",
    title: "Company Tracks",
    desc: "Practice with actual interview patterns from Google, Meta, Amazon, Apple, Netflix — tailored to each company's style.",
    accent: "from-galaxy-purple to-galaxy-pink",
    glow: "rgba(124,58,237,0.3)",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-galaxy-violet tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-purple/30 bg-galaxy-purple/10">
            Everything You Need
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Built to get you{" "}
            <span className="text-gradient">hired.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-xl mx-auto text-lg">
            Every feature is designed around one goal — making you interview-ready faster than any other platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative glass glass-hover rounded-2xl p-6 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 30% 0%, ${f.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-xl bg-galaxy-secondary flex items-center justify-center text-xl">
                  {f.icon}
                </div>
              </div>

              <h3 className="relative font-display font-semibold text-lg text-white mb-2">
                {f.title}
              </h3>
              <p className="relative text-galaxy-subtext text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${f.accent} opacity-5 rounded-bl-full`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}