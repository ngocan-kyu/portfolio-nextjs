"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShimmerButton } from "@/components/atom/magicui/shimmer-button";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

const fadeInDown = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay: 0.4 },
};

// Scroll handler function
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn(`Section ${sectionId} not found`);
  }
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10">
        {/* Heading */}
        <motion.h1 {...fadeInUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Hi, I’m <span className="text-blue-500">Ho Ngoc An</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeInDown} className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Full-Stack Developer
        </motion.p>

        {/* CTA Button */}
        <motion.div {...fadeIn} className="mt-8">
          <ShimmerButton
            onClick={() => scrollToSection("#contact")}
            className="block w-full max-w-xs px-6 py-3 text-white rounded-lg transition-colors duration-200"
            aria-label="Scroll to contact section"
          >
            Let’s Connect
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
}