"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

// Import your sections
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Hackathons } from "@/components/hackathons";
import { Extracurriculars } from "@/components/extracurriculars";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  const [stage, setStage] = useState<"boot" | "home">("boot");
  const [hasChecked, setHasChecked] = useState(false); // ✅ Prevent flicker
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem("visited");

    if (alreadyVisited) {
      setStage("home");
      setHasChecked(true);
      return;
    }

    // Simulate boot animation
    const logs = [
      "Initializing system modules...",
      "Loading developer environment...",
      "Connecting to portfolio server...",
      "Fetching assets...",
      "System ready.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, logs[i]]);
      i++;
      if (i === logs.length) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            sessionStorage.setItem("visited", "true");
            setStage("home");
          }, 1000);
        }, 800);
      }
    }, 800);

    setHasChecked(true);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // ⏳ Wait until we’ve checked sessionStorage to avoid flicker
  if (!hasChecked) return null;

  return (
    <AnimatePresence mode="wait">
      {stage === "boot" ? (
        // Boot Animation Screen
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md"
          >
            <p className="text-sm mb-4 text-gray-400">Developer Terminal v1.0</p>

            <div className="bg-[#0d0d0d] p-4 rounded-lg border border-green-700 shadow-lg min-h-[250px] sm:min-h-[300px] overflow-hidden">
              <div className="text-green-400 text-sm space-y-1">
                {bootLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {cursorVisible && <p>▮</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        // Portfolio (Home) Content
        <motion.main
          key="home"
          className="min-h-screen bg-white dark:bg-black transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Hackathons />
          <Extracurriculars />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
