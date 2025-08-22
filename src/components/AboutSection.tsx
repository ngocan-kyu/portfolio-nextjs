'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10"
      >
        {/* Left side - Image */}
        <div className="flex-1">
          <div className="relative w-full h-full md:h-[650px] rounded-xl overflow-hidden shadow-lg">
            <Image src="/about_img.jpg" alt="About Me" fill className="object-cover" />
            <span className="absolute bottom-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
              Available for work
            </span>
          </div>
        </div>

        {/* Right side - Text */}
        <div className="flex-1 bg-gray-800 dark:bg-gray-900 text-white rounded-xl p-6 md:p-10 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg mb-6 leading-relaxed">
            I am a passionate software engineer with experience building web applications and digital products. 
            I specialize in frontend development with React and Next.js, but I am also comfortable working with backend technologies like Node.js and NestJS.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            My journey in tech started with a strong foundation in software development. I have worked with enthusiastic friends to create intuitive, performant, and accessible digital experiences.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            When I am not coding, you can find me exploring new technologies, contributing to open-source projects, and staying up-to-date with the latest industry trends.
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold">Full Name</span>
              <p>Hồ Ngọc An</p>
            </div>
            <div>
              <span className="font-semibold">Email</span>
              <p>hngocan.forwork@gmail.com</p>
            </div>
            <div>
              <span className="font-semibold">Location</span>
              <p>Viet Nam</p>
            </div>
            <div>
              <span className="font-semibold">Availability</span>
              <p className="text-green-500">Open to opportunities</p>
            </div>
          </div>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  )
}
