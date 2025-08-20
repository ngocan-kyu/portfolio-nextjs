'use client'

import { motion } from 'framer-motion'
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
      >
        Hi, I’m <span className="text-blue-500">Ho Ngoc An</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300"
      >
        Full-Stack Developer 
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-8"
      >
        <ShimmerButton>
        <a href="#contact">
          Let’s Connect
        </a>
        </ShimmerButton>
      </motion.div>
    </section>
  )
}
