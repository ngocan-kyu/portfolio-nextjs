'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl w-full text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Get In Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          I’m always open to new opportunities, collaborations, or just a friendly chat.  
          Feel free to drop me a message!
        </p>
        <form className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
          <textarea 
            placeholder="Your Message"
            rows={5}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  )
}
