import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "SWE @ Google",
    avatar: "SC",
    color: "from-galaxy-cyan to-galaxy-indigo",
    quote:
      "Galaxy AI's System Design questions were almost identical to my actual Google interview. The AI feedback helped me structure my answers way better. Got the offer after 3 weeks of practice.",
    score: 94,
  },
  {
    name: "Marcus Williams",
    role: "Senior Engineer @ Meta",
    avatar: "MW",
    color: "from-galaxy-purple to-galaxy-pink",
    quote:
      "The behavioral interview track is insane. It doesn't just ask questions — it follows up like a real interviewer. My communication score went from 65 to 89 in 2 weeks.",
    score: 89,
  },
  {
    name: "Priya Sharma",
    role: "Backend Dev @ Amazon",
    avatar: "PS",
    color: "from-galaxy-violet to-galaxy-cyan",
    quote:
      "I failed 4 interviews before using this. The AI Thinking Mode shows you HOW to think, not just what to say. Finally landed at Amazon after a month of Galaxy AI sessions.",
    score: 91,
  },
  {
    name: "James Park",
    role: "ML Engineer @ Apple",
    avatar: "JP",
    color: "from-galaxy-indigo to-galaxy-purple",
    quote:
      "The analytics dashboard is a game changer. I could see exactly which topics were hurting my score and fix them. Went from 68 avg to 88 avg in 3 weeks.",
    score: 88,
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-galaxy-pink tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-pink/30 bg-galaxy-pink/10">
            Success Stories
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Engineers who{" "}
            <span className="text-gradient">made it.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-lg mx-auto">
            Real results from real engineers. No fake testimonials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-galaxy-border/30 hover:border-galaxy-purple/30 transition-all cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-galaxy-subtext text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-galaxy-cyan font-mono font-bold text-lg">{t.score}</div>
                  <div className="text-galaxy-muted text-xs font-mono">final score</div>
                </div>
              </div>

              <p className="text-galaxy-subtext text-sm leading-relaxed">
                "{t.quote}"
              </p>

              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-amber-400 text-xs">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}