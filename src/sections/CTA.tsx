import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Page } from "../App";

interface CTAProps { setPage: (p: Page) => void; }

export default function CTA({ setPage }: CTAProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // ❌ disable on mobile

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;

    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX: window.innerWidth >= 768 ? rotateX : 0,
            rotateY: window.innerWidth >= 768 ? rotateY : 0,
          }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative glass rounded-2xl sm:rounded-3xl 
          p-6 sm:p-10 md:p-14 text-center overflow-hidden 
          border border-galaxy-purple/30 shadow-[0_0_60px_rgba(124,58,237,0.2)]"
        >

          {/* 🌌 Glow layers (lighter on mobile) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 
            w-75 sm:w-125 md:w-150 
            h-37.5 sm:h-55 bg-galaxy-purple/20 blur-[80px] rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div
            className="absolute bottom-0 right-1/4 
            w-50 sm:w-75 md:w-87.5 
            h-30 sm:h-45 bg-galaxy-cyan/15 blur-[60px] rounded-full"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          {/* ✨ particles (reduced on mobile) */}
          {[...Array(window.innerWidth < 640 ? 5 : 10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              animate={{ y: -80, opacity: [0, 1, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${10 + i * 8}%`,
                bottom: "0%",
              }}
            />
          ))}

          {/* CONTENT */}
          <div className="relative z-10">

            {/* Badge */}
            <span className="inline-block text-[10px] sm:text-xs font-mono 
            text-galaxy-cyan tracking-widest uppercase mb-4 sm:mb-6 
            px-3 py-1 rounded-full border border-galaxy-cyan/40 bg-galaxy-cyan/10">
              🚀 Free Sessions • No Credit Card
            </span>

            {/* Heading */}
            <h2 className="font-display font-extrabold 
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
            text-white mb-4 sm:mb-5 leading-tight">
              Crack your next interview<br />
              <span className="text-gradient">before you walk in.</span>
            </h2>

            {/* Subtext */}
            <p className="text-galaxy-subtext 
            text-sm sm:text-base md:text-lg 
            mb-8 sm:mb-10 max-w-md sm:max-w-xl mx-auto">
              Practice with AI that thinks like real interviewers.
            </p>

            {/* 📊 Social proof */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:gap-8 
            mb-8 sm:mb-10 text-xs sm:text-sm text-galaxy-muted">
              {[
                { value: "12K+", label: "Users" },
                { value: "94%", label: "Success" },
                { value: "500+", label: "Questions" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-white font-bold text-base sm:text-lg">
                    {item.value}
                  </p>
                  <p className="text-[10px] sm:text-xs">{item.label}</p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage("interview")}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 
                rounded-xl bg-gradient-to-r from-galaxy-purple to-galaxy-indigo 
                text-white font-semibold text-sm sm:text-lg"
              >
                🎤 Start Interview
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPage("dashboard")}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 
                rounded-xl glass text-galaxy-text 
                text-sm sm:text-lg border border-white/10"
              >
                Dashboard
              </motion.button>
            </div>

            {/* Footer */}
            <p className="mt-5 sm:mt-6 text-[10px] sm:text-xs text-galaxy-muted font-mono">
              Trusted by engineers • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}