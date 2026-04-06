import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Choose Your Track",
    desc: "Select from System Design, Data Structures, Behavioral, or company-specific interview tracks.",
    color: "text-galaxy-purple",
    border: "border-galaxy-purple/40",
    bg: "bg-galaxy-purple/10",
  },
  {
    num: "02",
    title: "Interview Starts",
    desc: "Our AI interviewer asks questions in real-time, just like a human interviewer — with follow-ups and probes.",
    color: "text-galaxy-cyan",
    border: "border-galaxy-cyan/40",
    bg: "bg-galaxy-cyan/10",
  },
  {
    num: "03",
    title: "AI Analyzes",
    desc: "While you answer, Galaxy AI processes your response — checking depth, accuracy, and communication style.",
    color: "text-galaxy-violet",
    border: "border-galaxy-violet/40",
    bg: "bg-galaxy-violet/10",
  },
  {
    num: "04",
    title: "Get Scored & Improve",
    desc: "Receive a detailed breakdown with scores, what you missed, model answers, and next steps.",
    color: "text-galaxy-pink",
    border: "border-galaxy-pink/40",
    bg: "bg-galaxy-pink/10",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-galaxy-secondary/30">
      <div className="max-w-6xl mx-auto">
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
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-4">
            From zero to{" "}
            <span className="text-gradient">offer letter.</span>
          </h2>
          <p className="text-galaxy-subtext max-w-lg mx-auto">
            Four steps. Infinite practice. One destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-galaxy-purple via-galaxy-cyan to-galaxy-pink opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number circle */}
              <div
                className={`relative z-10 w-16 h-16 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6`}
              >
                <span className={`font-mono font-bold text-lg ${step.color}`}>
                  {step.num}
                </span>
              </div>

              <h3 className="font-display font-semibold text-white text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-galaxy-subtext text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}