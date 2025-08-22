"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/atom/magicui/shimmer-button";
import { IconCloud } from "@/components/atom/magicui/icon-cloud";
import { MorphingText } from "@/components/atom/magicui/morphing-text";
import { Badge } from "@/components/atom/badge";
import useScrollTo from "@/hooks/useScrollTo";
import { portfolioConfig } from "@/config/portfolio.config";
import { memo, useState, useEffect, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

// Constants
const MORPHING_ROLES = ["Frontend Developer", "Web Developer", "Student", "Blogger"];
const TECH_STACK = [
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
const CLOUD_IMAGES = TECH_STACK.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

// Animation Variants
const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const cloudAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// Memoized Social Link Component
const SocialLink = memo(
  ({ name, url, icon: Icon }: { name: string; url: string; icon: LucideIcon | IconType }) => (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name} profile`}
      whileHover={{ scale: 1.2, y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
    >
      <Icon size={24} />
    </motion.a>
  )
);

SocialLink.displayName = "SocialLink";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollTo = useScrollTo();

  // Track mouse for tech cloud parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 20 - 10,
      y: (e.clientY / window.innerHeight) * 20 - 10,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20"
      aria-label="Hero section"
    >
      {/* Grid layout */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Content */}
        <div className="text-center lg:text-left space-y-8 lg:pl-20">
          {/* Badge with Morphing Text */}
          <AnimatePresence>
            <div
              key="badge"
              // variants={slideInLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            >
              <Badge
                variant="default"
                className="inline-flex items-center text-lg font-medium select-none transition-all duration-400 ease-in-out"
                asChild
                aria-live="polite"
              >
                <MorphingText texts={MORPHING_ROLES} className="inline-block" />
              </Badge>
            </div>
          </AnimatePresence>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-black">Hi, I am</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              {portfolioConfig.name}
            </span>
          </h1>

          {/* Nickname + Description */}
          <p className="text-xl md:text-2xl text-black">
            <span className="text-orange-400">Kyung</span> | Crafting exceptional digital experiences with code, creativity, and passion.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ShimmerButton
              onClick={() => scrollTo({ sectionId: "projects", behavior: "smooth" })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 px-8 py-3"
              aria-label="Navigate to projects section"
            >
              View Projects →
            </ShimmerButton>
            <motion.button
              onClick={() => scrollTo({ sectionId: "contact", behavior: "smooth" })}
              className="px-8 py-3 border border-gray-600 rounded-lg text-black hover:text-white hover:border-gray-400 transition-all duration-300 backdrop-blur-sm"
              aria-label="Navigate to contact section"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start space-x-6">
            {portfolioConfig.socialLinks.map((social) => (
              <SocialLink
                key={social.name}
                name={social.name}
                url={social.url}
                icon={social.icon}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Tech Cloud */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
          {...cloudAnimation}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-150 opacity-30" />
          <span className="relative">
            <IconCloud images={CLOUD_IMAGES} />
          </span>
          <span className="text-xl text-black text-center mt-2">
            Move your cursor to interact
          </span>
        </motion.div>
      </div>
    </section>
  );
}

HeroSection.displayName = "HeroSection";

export default HeroSection;