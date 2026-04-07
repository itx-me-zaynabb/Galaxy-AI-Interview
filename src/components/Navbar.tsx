/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Page } from "../App";

const links = ["Features", "How It Works", "Analytics", "Pricing"];

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export default function Navbar({ page, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/40 border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* LOGO */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setPage("home")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-galaxy-purple to-galaxy-cyan flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.6)]">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="font-bold text-lg text-white">
            Galaxy<span className="text-gradient">AI</span>
          </span>
        </motion.div>

        {/* DESKTOP LINKS */}
        {page === "home" && (
          <div className="hidden md:flex items-center gap-8 relative">
            {links.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative text-sm text-white/70 hover:text-white transition"
                whileHover={{ y: -2 }}
              >
                {link}

                {/* underline animation */}
                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-cyan-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* Secondary */}
          <button
            onClick={() => setPage("dashboard")}
            className="text-sm text-white/70 hover:text-white transition px-3 py-2"
          >
            Dashboard
          </button>

          {/* Primary CTA */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(124,58,237,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage("interview")}
            className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white text-sm font-medium overflow-hidden"
          >
            {/* glow layer */}
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition" />
            🎤 Start Interview
          </motion.button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-white transition ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 bg-white transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-white transition ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 pt-4 pb-6 bg-black/80 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col gap-4">

              {["home", "interview", "dashboard"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setPage(item as Page);
                    setMobileOpen(false);
                  }}
                  className="text-left text-white/80 hover:text-white text-base transition"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}

              <button
                onClick={() => {
                  setPage("interview");
                  setMobileOpen(false);
                }}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white font-medium"
              >
                🎤 Start Interview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}