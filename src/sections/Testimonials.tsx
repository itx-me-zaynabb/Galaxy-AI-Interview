import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "SWE @ Google",
    avatar: "SC",
    color: "from-galaxy-cyan to-galaxy-indigo",
    quote:
      "Galaxy AI's System Design questions were almost identical to my actual Google interview. The AI feedback helped me structure my answers way better.",
    score: 94,
  },
  {
    name: "Marcus Williams",
    role: "Senior Engineer @ Meta",
    avatar: "MW",
    color: "from-galaxy-purple to-pink-400",
    quote:
      "The behavioral interview track is insane. It follows up like a real interviewer. My communication score went from 65 to 89.",
    score: 89,
  },
  {
    name: "Priya Sharma",
    role: "Backend Dev @ Amazon",
    avatar: "PS",
    color: "from-galaxy-violet to-galaxy-cyan",
    quote:
      "AI Thinking Mode shows HOW to think. Finally landed at Amazon after a month.",
    score: 91,
  },
  {
    name: "James Park",
    role: "ML Engineer @ Apple",
    avatar: "JP",
    color: "from-galaxy-indigo to-galaxy-purple",
    quote:
      "Analytics dashboard showed exactly what I was missing. Jumped from 68 to 88 avg.",
    score: 88,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-200 h-100 bg-galaxy-pink/10 blur-[120px] top-20 left-1/2 -translate-x-1/2" />
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
          <span className="inline-block text-xs font-mono text-galaxy-pink tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-pink/30 bg-galaxy-pink/10">
            Success Stories
          </span>

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4">
            Engineers who <span className="text-gradient">made it.</span>
          </h2>

          <p className="text-galaxy-subtext max-w-md mx-auto text-sm sm:text-base">
            Real results. Real engineers. Real offers.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="group relative glass p-6 rounded-2xl border border-white/10 overflow-hidden"
            >
              
              {/* ✨ Animated Glow Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15), transparent 70%)",
                }}
              />

              {/* Top */}
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex gap-3 items-center">
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-galaxy-subtext text-xs">{t.role}</p>
                  </div>
                </div>

                {/* Score Pulse */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-right"
                >
                  <div className="text-galaxy-cyan font-bold text-lg">
                    {t.score}
                  </div>
                  <div className="text-xs text-galaxy-muted font-mono">
                    score
                  </div>
                </motion.div>
              </div>

              {/* Quote */}
              <p className="text-galaxy-subtext text-sm leading-relaxed relative z-10">
                "{t.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-amber-400 text-xs"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* 🔥 Bottom Shine Effect */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-galaxy-purple to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}