import { motion } from "framer-motion";

const stats = [
  { value: "94%", label: "Users improved in 2 weeks", color: "text-galaxy-cyan" },
  { value: "500+", label: "Curated interview questions", color: "text-galaxy-violet" },
  { value: "50+", label: "Top companies covered", color: "text-galaxy-purple" },
  { value: "12k+", label: "Active learners this month", color: "text-galaxy-pink" },
];

const metrics = [
  { label: "System Design", score: 87, color: "from-galaxy-purple to-galaxy-indigo" },
  { label: "Data Structures", score: 74, color: "from-galaxy-cyan to-galaxy-indigo" },
  { label: "Behavioral", score: 92, color: "from-galaxy-violet to-galaxy-purple" },
  { label: "Problem Solving", score: 68, color: "from-galaxy-pink to-galaxy-purple" },
];

export default function Analytics() {
  return (
    <section id="analytics" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-galaxy-violet tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-violet/30 bg-galaxy-violet/10">
            Performance Analytics
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            Track every{" "}
            <span className="text-gradient">improvement.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-lg mx-auto">
            Your dashboard shows exactly where you stand — and what to fix next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className={`font-display font-extrabold text-4xl mb-2 ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-galaxy-subtext text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Mock analytics card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6 shadow-glowStrong border border-galaxy-purple/20"
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-white">Session Report</h3>
                <p className="text-galaxy-subtext text-xs mt-0.5 font-mono">Last 7 days · 12 sessions</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
                ↑ +14%
              </span>
            </div>

            {/* Progress bars */}
            <div className="space-y-5">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-galaxy-subtext text-sm">{m.label}</span>
                    <span className="text-white text-sm font-mono font-medium">{m.score}/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-galaxy-border/50 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight */}
            <div className="mt-6 p-4 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20">
              <p className="text-xs font-mono text-galaxy-violet mb-1">🧠 AI Insight</p>
              <p className="text-galaxy-subtext text-sm leading-relaxed">
                Focus on <span className="text-white">Problem Solving</span> — your weakest area. 
                3 targeted sessions could push you to 85+.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}