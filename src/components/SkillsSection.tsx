'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Globe } from 'lucide-react'

const skills = [
  { icon: <Code2 />, title: 'Frontend', desc: 'React, Next.js, HTML, CSS, TailwindCSS' },
  { icon: <Database />, title: 'Backend', desc: 'Java, Spring Boot, Node.js, REST APIs' },
  { icon: <Globe />, title: 'Databases', desc: 'MySQL, PostgreSQL, SQLite' },
]

export default function SkillsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 shadow rounded-2xl"
            >
              <div className="text-blue-500 text-3xl mb-4 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {skill.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
