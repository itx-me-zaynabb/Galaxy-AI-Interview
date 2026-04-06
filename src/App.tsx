import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import GalaxyCursor from "./components/GalaxyCursor";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import Analytics from "./sections/Analytics";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import InterviewPage from "./sections/InterviewPage";
import Dashboard from "./sections/Dashboard";

export type Page = "home" | "interview" | "dashboard";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="relative min-h-screen bg-galaxy-bg overflow-x-hidden" style={{ cursor: "none" }}>
      <GalaxyCursor />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-galaxy-purple/8 blur-[130px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-galaxy-cyan/6 blur-[110px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-galaxy-indigo/6 blur-[120px]" />
      </div>
      <div className="relative z-10">
        <Navbar page={page} setPage={setPage} />
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Hero setPage={setPage} />
              <Features />
              <HowItWorks />
              <Analytics />
              <Testimonials />
             
              <CTA setPage={setPage} />
              <Footer />
            </motion.div>
          )}
          {page === "interview" && (
            <motion.div key="interview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <InterviewPage />
            </motion.div>
          )}
          {page === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}