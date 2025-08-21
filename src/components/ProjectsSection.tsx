'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: "Bookstore Web App",
    desc: "A full-stack web application built with Spring Boot, React, and MySQL.",
    github: "https://github.com/KyungUwU",
    live: "#"
  },
  {
    title: "Minesweeper Game",
    desc: "Classic Minesweeper built in Java with GUI.",
    github: "https://github.com/KyungUwU",
    live: "#"
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with Next.js, Tailwind, and Framer Motion.",
    github: "https://github.com/KyungUwU",
    live: "#"
  }
]

export default function ProjectsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 shadow rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {project.desc}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a href={project.github} target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  <Github />
                </a>
                <a href={project.live} target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  <ExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
