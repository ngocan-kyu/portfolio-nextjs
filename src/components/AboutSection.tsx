'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          I’m a <span className="text-blue-500 font-semibold">Full-Stack Developer</span> 
          currently studying at International University (Ho Chi Minh).  
          I have hands-on experience with 
          <span className="font-medium"> Java, Spring Boot, React, MySQL, and Docker</span>.  
          Passionate about <span className="text-blue-500">Web Development</span> and 
          integrating <span className="text-blue-500">AI/ML</span> into real-world solutions.
        </p>
      </motion.div>
    </section>
  )
}
