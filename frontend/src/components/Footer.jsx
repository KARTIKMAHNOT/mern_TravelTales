import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [currentText, setCurrentText] = useState(0);
  const taglines = [
    "Share your journey. Inspire the world.",
    "Where travelers become storytellers.",
    "Document your adventures. Relive your memories.",
    "Your passport to unforgettable stories.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <footer className="bg-black/95 text-emerald-400 border-t border-emerald-500/20 shadow-[0_-4px_20px_rgba(0,255,128,0.1)]">
      <div className="max-w-6xl px-6 py-12 mx-auto">
        {/* Animated Tagline Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-14">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-bold text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500"
                >
                  {taglines[currentText]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.div
              className="max-w-2xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-lg text-emerald-200/80">
                TravelTales is a global community where adventurers share their
                stories, discover hidden gems, and connect through shared
                experiences. Join our movement to make every journey
                unforgettable.
              </p>
            </motion.div>
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="h-px my-6 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
          />
        </div>

        {/* Footer Content */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 border rounded-lg bg-emerald-500/10 border-emerald-500/20"
            >
              <h1 className="text-xl font-bold tracking-wider text-emerald-300">
                TravelTales
              </h1>
            </motion.div>
            <div className="w-px h-8 mx-2 bg-emerald-500/30" />
            <motion.span
              className="text-emerald-400/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()}
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                href: "mailto:hello@traveltales.com",
                label: "Mail",
              },
              {
                icon: <Github className="w-5 h-5" />,
                href: "https://github.com/traveltales",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="w-5 h-5" />,
                href: "https://linkedin.com/company/traveltales",
                label: "LinkedIn",
              },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-2 transition-all border rounded-full bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20"
                whileHover={{
                  y: -5,
                  scale: 1.1,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.p
          className="mt-10 text-xs text-center text-emerald-400/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Crafted with 💚 using MERN Stack, Zustand, Framer Motion & Keen Slider
        </motion.p>
      </div>

      {/* Floating Elements */}
      <div className="absolute w-3 h-3 rounded-full bottom-4 left-1/4 bg-emerald-400/20 animate-pulse"></div>
      <div className="absolute w-2 h-2 rounded-full bottom-10 right-1/3 bg-emerald-400/30 animate-ping"></div>
    </footer>
  );
};

export default Footer;
