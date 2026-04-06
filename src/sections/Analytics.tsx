/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

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

function CountUp({ value, suffix }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView]);

  return (
    <motion.span ref={ref}>
      {spring.get().toFixed(0)}
      {suffix}
    </motion.span>
  );
}

export default function Analytics() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[400px] bg-galaxy-purple/10 blur-[120px] top-20 left-1/2 -translate-x-1/2" />
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
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden"
              >
                {/* subtle glow */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-galaxy-purple/10 to-transparent" />

                <div className={`text-3xl sm:text-4xl font-extrabold ${s.color}`}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>

                <div className="text-galaxy-subtext text-xs sm:text-sm mt-2">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analytics Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="glass p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Glow border */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 blur-xl bg-gradient-to-br from-galaxy-purple/20 to-galaxy-cyan/20" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <h3 className="text-white font-semibold">Session Report</h3>
                <p className="text-xs text-galaxy-subtext font-mono">
                  Last 7 days · 12 sessions
                </p>
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
                ↑ +14%
              </span>
            </div>

            {/* Bars */}
            <div className="space-y-5 relative z-10">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{m.label}</span>
                    <span className="font-mono text-white">{m.score}</span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.score}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full bg-gradient-to-r ${m.color}`}
                    />

                    {/* glow trail */}
                    <motion.div
                      initial={{ left: "-20%" }}
                      whileInView={{ left: "100%" }}
                      transition={{ duration: 1.2, delay: i * 0.2 }}
                      className="absolute top-0 h-full w-10 bg-white/20 blur-md"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20 text-sm relative z-10"
            >
              🧠 Focus on <b>Problem Solving</b> — fastest improvement potential.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}