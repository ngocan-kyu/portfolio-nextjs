"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/atom/magicui/shimmer-button";
import { IconCloud } from "@/components/atom/magicui/icon-cloud";

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

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn(`Section ${sectionId} not found`);
  }
};

const techStack = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "nodedotjs",
  "express",
  "prisma",
  "postgresql",
  "firebase",
  "docker",
  "vercel",
  "git",
  "github",
  "figma",
];

const images = techStack.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Column: Heading, Description, Button */}
        <div className="text-center md:text-left space-y-6">
          {/* Heading */}
          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Hi, I’m <span className="text-blue-500">Ho Ngoc An</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeInDown}
            className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-gray-600 dark:text-gray-300"
          >
            Full-Stack Developer specializing in building modern web apps with
            Java, Spring Boot, React, and AI integration.
          </motion.p>

          {/* Contact Button */}
          <motion.div {...fadeIn}>
            <ShimmerButton
              onClick={() => scrollToSection("#contact")}
              className="block w-full md:w-auto max-w-xs md:max-w-none mx-auto md:mx-0"
            >
              Let’s Connect
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Right Column: Icon Cloud */}
        <motion.div
          {...fadeIn}
          className="flex justify-center items-center w-full h-[320px] md:h-[420px] lg:h-[500px]"
        >
          <IconCloud images={images} />
        </motion.div>
      </div>
    </section>
  );
}
