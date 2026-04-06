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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-galaxy-border/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setPage("home")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-galaxy-purple to-galaxy-cyan flex items-center justify-center shadow-glow">
            <span className="text-white text-sm font-bold font-mono">G</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Galaxy<span className="text-gradient">AI</span>
          </span>
        </motion.div>

        {page === "home" && (
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-galaxy-subtext text-sm hover:text-white transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        )}

        {page !== "home" && (
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setPage("home")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${page === "home" ? "text-white bg-galaxy-purple/20" : "text-galaxy-subtext hover:text-white"}`}
            >
              Home
            </button>
            <button
              onClick={() => setPage("interview")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${page === "interview" ? "text-white bg-galaxy-purple/20" : "text-galaxy-subtext hover:text-white"}`}
            >
              Interview
            </button>
            <button
              onClick={() => setPage("dashboard")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${page === "dashboard" ? "text-white bg-galaxy-purple/20" : "text-galaxy-subtext hover:text-white"}`}
            >
              Dashboard
            </button>
          </div>
        )}

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setPage("dashboard")}
            className="text-galaxy-subtext text-sm hover:text-white transition-colors px-4 py-2"
          >
            Dashboard
          </button>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage("interview")}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white text-sm font-medium shadow-glow"
          >
            🎤 Start Interview
          </motion.button>
        </div>

        <button className="md:hidden text-galaxy-subtext" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-galaxy-border/30 px-6 py-4 flex flex-col gap-3"
          >
            <button onClick={() => { setPage("home"); setMobileOpen(false); }} className="text-left text-galaxy-subtext hover:text-white transition-colors">Home</button>
            <button onClick={() => { setPage("interview"); setMobileOpen(false); }} className="text-left text-galaxy-subtext hover:text-white transition-colors">Interview</button>
            <button onClick={() => { setPage("dashboard"); setMobileOpen(false); }} className="text-left text-galaxy-subtext hover:text-white transition-colors">Dashboard</button>
            <button onClick={() => { setPage("interview"); setMobileOpen(false); }} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white text-sm font-medium mt-1">
              🎤 Start Interview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}