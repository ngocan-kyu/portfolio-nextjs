"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Intro() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000); // 3 giây
    return () => clearTimeout(timer);
  }, []);

  if (!showIntro) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-red-500"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold tracking-wide text-white"
      >
        <span className="animate-pulse">Welcome</span>
        <span className="mx-2">to</span>
        <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
          My Portfolio 🚀
        </span>
      </motion.h1>
    </motion.div>
  );
}
