'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Bookstore Web App",
    desc: "A full-stack web application built with Spring Boot, React, and MySQL.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Spring Boot", "React", "MySQL"],
    topics: ["Fullstack", "REST API", "Authentication"],
    stats: [
      { name: "Java", color: "#F7DF1E", percent: 40 },
      { name: "React", color: "#61DAFB", percent: 35 },
      { name: "MySQL", color: "#00758F", percent: 25 }
    ]
  },
    {
    title: "Bookstore Web App",
    desc: "A full-stack web application built with Spring Boot, React, and MySQL.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Spring Boot", "React", "MySQL"],
    topics: ["Fullstack", "REST API", "Authentication"],
    stats: [
      { name: "Java", color: "#F7DF1E", percent: 40 },
      { name: "React", color: "#61DAFB", percent: 35 },
      { name: "MySQL", color: "#00758F", percent: 25 }
    ]
  },
    {
    title: "Bookstore Web App",
    desc: "A full-stack web application built with Spring Boot, React, and MySQL.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Spring Boot", "React", "MySQL"],
    topics: ["Fullstack", "REST API", "Authentication"],
    stats: [
      { name: "Java", color: "#F7DF1E", percent: 40 },
      { name: "React", color: "#61DAFB", percent: 35 },
      { name: "MySQL", color: "#00758F", percent: 25 }
    ]
  },
    {
    title: "Bookstore Web App",
    desc: "A full-stack web application built with Spring Boot, React, and MySQL.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Spring Boot", "React", "MySQL"],
    topics: ["Fullstack", "REST API", "Authentication"],
    stats: [
      { name: "Java", color: "#F7DF1E", percent: 40 },
      { name: "React", color: "#61DAFB", percent: 35 },
      { name: "MySQL", color: "#00758F", percent: 25 }
    ]
  },
  {
    title: "Minesweeper Game",
    desc: "Classic Minesweeper built in Java with GUI.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Java", "Swing", "Desktop App"],
    topics: ["GUI", "Game Logic", "OOP"],
    stats: [
      { name: "Java", color: "#F7DF1E", percent: 90 },
      { name: "Swing", color: "#0E76A8", percent: 10 }
    ]
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with Next.js, Tailwind, and Framer Motion.",
    github: "https://github.com/KyungUwU",
    live: "#",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    topics: ["Portfolio", "Animations", "Responsive UI"],
    stats: [
      { name: "Next.js", color: "#ffff", percent: 40 },
      { name: "Tailwind", color: "#38BDF8", percent: 40 },
      { name: "Framer", color: "#E91E63", percent: 20 }
    ]
  }
];

export default function ProjectsSection() {
  return (
    <section className="relative min-h-screen px-6 py-16 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="px-4 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
          Some of my recent work
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Featured Projects
        </h2>
        <div className="mt-3 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-black shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm">{project.desc}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-gray-700/30 text-gray-300 border border-gray-600/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* GitHub Topics */}
            <a
              href={project.github}
              target="_blank"
              className="mt-3 inline-flex text-sm font-medium text-purple-400 hover:text-purple-300 transition"
            >
              GitHub Topics →
            </a>

            {/* Language Usage Progress Bar */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                {project.stats.map((s) => (
                  <span key={s.name} className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: s.color }}
                    ></span>
                    {s.name}
                  </span>
                ))}
              </div>
              <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-700/40">
                {project.stats.map((s, i) => (
                  <div
                    key={i}
                    style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                    className="h-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <a
                href={project.github}
                target="_blank"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <Github className="w-5 h-5" /> Code
              </a>
              <div className="flex gap-3">
                <a
                  href={project.live}
                  target="_blank"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium shadow hover:opacity-90 transition"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  className="px-5 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-700/40 transition text-sm font-medium"
                >
                  Details
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
