import { motion } from "framer-motion";

const weekData = [45, 62, 78, 55, 87, 91, 74];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const recentSessions = [
  { date: "Today", category: "System Design", score: 87, company: "Google", time: "32 min" },
  { date: "Yesterday", category: "Behavioral", score: 73, company: "Meta", time: "18 min" },
  { date: "2 days ago", category: "DSA", score: 91, company: "Amazon", time: "45 min" },
  { date: "3 days ago", category: "System Design", score: 65, company: "Apple", time: "28 min" },
];

const skills = [
  { name: "System Design", score: 82, color: "from-galaxy-purple to-galaxy-indigo", trend: "+8" },
  { name: "Data Structures", score: 74, color: "from-galaxy-cyan to-galaxy-indigo", trend: "+5" },
  { name: "Behavioral", score: 90, color: "from-galaxy-violet to-galaxy-purple", trend: "+12" },
  { name: "Problem Solving", score: 68, color: "from-galaxy-pink to-galaxy-purple", trend: "+3" },
  { name: "Communication", score: 85, color: "from-galaxy-indigo to-galaxy-cyan", trend: "+7" },
];

const maxBar = Math.max(...weekData);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-galaxy-bg pt-20 px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-galaxy-subtext text-sm font-mono mb-1">Welcome back 👋</p>
          <h1 className="font-display font-extrabold text-3xl text-white">
            Your <span className="text-gradient">Dashboard</span>
          </h1>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Sessions", value: "47", icon: "🎤", color: "text-galaxy-cyan" },
            { label: "Avg Score", value: "81/100", icon: "📊", color: "text-galaxy-violet" },
            { label: "Streak", value: "12 days", icon: "🔥", color: "text-amber-400" },
            { label: "Companies", value: "8 tracked", icon: "🏢", color: "text-galaxy-pink" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-galaxy-border/30"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className={`font-display font-bold text-2xl mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-galaxy-muted text-xs">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-galaxy-border/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-white">Weekly Performance</h3>
                <p className="text-galaxy-subtext text-xs mt-0.5 font-mono">Score trend — last 7 days</p>
              </div>
              <span className="text-xs font-mono text-green-400 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                ↑ +14% this week
              </span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-3 h-36">
              {weekData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxBar) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-galaxy-purple to-galaxy-cyan relative group cursor-pointer"
                    style={{ minHeight: "4px" }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono text-galaxy-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-galaxy-secondary px-2 py-0.5 rounded">
                      {val}
                    </div>
                  </motion.div>
                  <span className="text-galaxy-muted text-xs font-mono">{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-galaxy-purple/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">🧠</span>
              <h3 className="font-display font-semibold text-white">AI Insight</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20">
                <p className="text-xs font-mono text-galaxy-violet mb-1.5">Focus Area</p>
                <p className="text-sm text-galaxy-text">
                  Your <span className="text-white font-medium">Problem Solving</span> score is 68 — 3 targeted sessions could push it to 85+.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-green-500/5 border border-green-500/20">
                <p className="text-xs font-mono text-green-400 mb-1.5">Best Skill</p>
                <p className="text-sm text-galaxy-text">
                  <span className="text-white font-medium">Behavioral</span> is your strongest — 90/100. Maintain with 2 sessions/week.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-galaxy-cyan/5 border border-galaxy-cyan/20">
                <p className="text-xs font-mono text-galaxy-cyan mb-1.5">Next Goal</p>
                <p className="text-sm text-galaxy-text">
                  Complete <span className="text-white font-medium">5 more sessions</span> to unlock the Google track.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-galaxy-border/30"
          >
            <h3 className="font-display font-semibold text-white mb-5">Skill Breakdown</h3>
            <div className="space-y-4">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-galaxy-subtext text-sm">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-xs font-mono">{s.trend}</span>
                      <span className="text-white text-sm font-mono font-medium">{s.score}/100</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-galaxy-border/40 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 border border-galaxy-border/30"
          >
            <h3 className="font-display font-semibold text-white mb-5">Recent Sessions</h3>
            <div className="space-y-3">
              {recentSessions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-galaxy-secondary/40 hover:bg-galaxy-secondary/70 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-mono flex-shrink-0 ${
                      s.score >= 80
                        ? "bg-green-500/20 text-green-400"
                        : s.score >= 60
                        ? "bg-galaxy-violet/20 text-galaxy-violet"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {s.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-galaxy-text font-medium truncate">{s.category}</p>
                    <p className="text-xs text-galaxy-muted">{s.company} · {s.time}</p>
                  </div>
                  <span className="text-xs text-galaxy-muted font-mono flex-shrink-0">{s.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}