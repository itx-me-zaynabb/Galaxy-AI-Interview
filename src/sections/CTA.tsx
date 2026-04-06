import { motion } from "framer-motion";
import type { Page } from "../App";

interface CTAProps { setPage: (p: Page) => void; }

export default function CTA({ setPage }: CTAProps) {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-galaxy-purple/25 shadow-glowStrong"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-galaxy-purple/15 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-galaxy-cyan/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block text-xs font-mono text-galaxy-cyan tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border border-galaxy-cyan/30 bg-galaxy-cyan/10">
              Start Today — Free
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-5 leading-tight">
              Your dream job is one<br />
              <span className="text-gradient">interview away.</span>
            </h2>
            <p className="text-galaxy-subtext text-lg mb-10 max-w-xl mx-auto">
              Join 12,000+ engineers who use Galaxy AI to prepare smarter and walk into interviews with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(124,58,237,0.7)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPage("interview")}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-galaxy-purple via-galaxy-indigo to-galaxy-purple text-white font-semibold text-lg shadow-glow"
              >
                🎤 Start Free Interview
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPage("dashboard")}
                className="px-10 py-4 rounded-xl glass text-galaxy-text font-medium text-lg"
              >
                View Dashboard
              </motion.button>
            </div>
            <p className="mt-6 text-galaxy-muted text-xs font-mono">No credit card required · 5 free sessions · Cancel anytime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}