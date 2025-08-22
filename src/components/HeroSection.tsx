"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/atom/magicui/shimmer-button";
import { IconCloud } from "@/components/atom/magicui/icon-cloud";
import { useState, useEffect, memo } from "react";
import { portfolioConfig } from "@/config/portfolio.config";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

// Tech stack icons (SimpleIcons CDN)
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

const cloudImages = techStack.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

// Memoized Social Link Component
const SocialLink = memo(
  ({ name, url, icon: Icon }: { name: string; url: string; icon: LucideIcon | IconType }) => (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name} profile`}
      whileHover={{ scale: 1.2, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
    >
      <Icon size={24} />
    </motion.a>
  )
);

SocialLink.displayName = "SocialLink";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Grid layout */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Content */}
        <div className="text-center lg:text-left space-y-8 lg:pl-20">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2">
            <span className="text-sm font-medium text-black">
              Front-End Developer
            </span>
          </div>


          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-black">Hi, I am</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Ho Ngoc An
            </span>
          </h1>

          {/* Nickname + Description */}
          <p className="text-xl md:text-2xl text-black">
            <span className="text-orange-400">Kyung</span> | Crafting exceptional digital experiences with code, creativity, and passion.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ShimmerButton
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 px-8 py-3"
            >
              View Projects →
            </ShimmerButton>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 border border-gray-600 rounded-lg text-black hover:text-white hover:border-gray-400 transition-all duration-300 backdrop-blur-sm"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start space-x-6">
            {portfolioConfig.socialLinks.map((social) => (
              <SocialLink key={social.name} name={social.name} url={social.url} icon={social.icon} />
            ))}
          </div>
        </div>

        {/* Right Column: Tech Cloud */}
        <div
          className="relative flex flex-col items-center"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-150 opacity-30" />

          <span className="relative">
            <IconCloud images={cloudImages} />
          </span>
          <span className="text-xs text-black text-center mt-2 ">
            Move your cursor to interact
          </span>
        </div>
      </div>
    </section>
  );
}
