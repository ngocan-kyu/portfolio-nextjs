"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/atom/magicui/shimmer-button";
import { IconCloud } from "@/components/atom/magicui/icon-cloud";
import { Badge } from "@/components/atom/badge";
import { memo, useState, useEffect, useCallback } from "react";
import useScrollTo from "@/hooks/useScrollTo";
import { portfolioConfig } from "@/config/portfolio.config";
import { HyperText } from "./atom/magicui/hyper-text";

const TECH_STACK = [
  "typescript","javascript","react","nextdotjs","nodedotjs","express",
  "prisma","postgresql","firebase","docker","vercel","git","github","figma"
];
const CLOUD_IMAGES = TECH_STACK.map(slug => `https://cdn.simpleicons.org/${slug}/${slug}`);

const SocialLink = memo(({ name, url, icon: Icon }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-white/5 transition-colors duration-200"
  >
    <Icon size={24} />
  </motion.a>
));

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollTo = useScrollTo();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: (e.clientX / window.innerWidth) * 20 - 10, y: (e.clientY / window.innerHeight) * 20 - 10 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20">
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="text-center mt-4 lg:text-left space-y-8 lg:pl-20">
          <Badge variant="default" className=" items-center text-lg font-medium hidden md:inline-flex">
            <span>Frontend Developer</span>
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-black">Hi, I am</span><br/>
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              {portfolioConfig.name}
            </span>
          </h1>

          <HyperText className="text-xl md:text-2xl text-black">
            {"Kyung | Crafting exceptional digital experiences with code, creativity, and passion."}
          </HyperText>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ShimmerButton onClick={() => scrollTo({ sectionId: "projects", behavior: "smooth" })} className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3">View Projects →</ShimmerButton>
            <motion.button onClick={() => scrollTo({ sectionId: "contact", behavior: "smooth" })} className="px-8 py-3 border border-gray-600 rounded-lg text-black hover:text-white hover:border-gray-400 transition-all duration-300 backdrop-blur-sm">Contact Me</motion.button>
          </div>
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

        <motion.div className="relative flex flex-col items-center" style={{ transform: `translate(${mousePosition.x*0.5}px, ${mousePosition.y*0.5}px)` }}>
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
