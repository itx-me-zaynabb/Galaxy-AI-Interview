import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Choose Your Track",
    desc: "Select from System Design, Data Structures, Behavioral, or company-specific interview tracks.",
    color: "text-galaxy-purple",
    border: "border-galaxy-purple/40",
    bg: "bg-galaxy-purple/10",
    glow: "hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
  },
  {
    num: "02",
    title: "Interview Starts",
    desc: "Our AI interviewer asks questions in real-time, just like a human interviewer.",
    color: "text-galaxy-cyan",
    border: "border-galaxy-cyan/40",
    bg: "bg-galaxy-cyan/10",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
  },
  {
    num: "03",
    title: "AI Analyzes",
    desc: "Galaxy AI evaluates depth, clarity, and communication style instantly.",
    color: "text-galaxy-violet",
    border: "border-galaxy-violet/40",
    bg: "bg-galaxy-violet/10",
    glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.4)]",
  },
  {
    num: "04",
    title: "Get Scored & Improve",
    desc: "Detailed feedback, scores, model answers, and improvement roadmap.",
    color: "text-pink-400",
    border: "border-pink-400/40",
    bg: "bg-pink-400/10",
    glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-175 h-100 bg-galaxy-purple/10 blur-[120px] top-20 left-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-galaxy-cyan tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border border-galaxy-cyan/30 bg-galaxy-cyan/10">
            The Process
          </span>

          <h2 className="font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-white mb-4 leading-tight">
            From zero to <span className="text-gradient">offer letter.</span>
          </h2>

          <p className="text-galaxy-subtext max-w-md mx-auto text-sm sm:text-base">
            Four steps. Infinite practice. One destination.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          
          {/* 🔗 Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-px bg-linear-to-r from-galaxy-purple via-galaxy-cyan to-pink-400 opacity-30" />

          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={item}
              whileHover={{ y: -8 }}
              className={`group relative glass p-6 rounded-2xl border border-white/10 transition-all duration-300 ${step.glow}`}
            >
              {/* Number */}
              <div
                className={`w-14 h-14 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mb-5 mx-auto`}
              >
                <span className={`font-mono font-bold ${step.color}`}>
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base sm:text-lg mb-2 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-galaxy-subtext text-sm text-center leading-relaxed">
                {step.desc}
              </p>

              {/* Hover Glow Ring */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(124,58,237,0.15), transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}