'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative min-h-screen px-6 py-16 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="px-4 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
          Let's work together
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Get In Touch
        </h2>
        <div className="mt-3 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </div>

      {/* Contact Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl"
      >
        {/* Left Side - Contact Information */}
        <div className="p-8 rounded-2xl bg-black shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Contact Information
          </h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-400" />
              <span className="text-gray-300 hover:text-white transition">
                letrungkyung@gmail.com
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin className="w-6 h-6 text-purple-400" />
              <a
                href="https://linkedin.com/in/kyungdev"
                target="_blank"
                className="text-gray-300 hover:text-white transition"
              >
                linkedin.com/in/kyungdev
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Github className="w-6 h-6 text-purple-400" />
              <a
                href="https://github.com/KyungUwU"
                target="_blank"
                className="text-gray-300 hover:text-white transition"
              >
                github.com/KyungUwU
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-purple-400" />
              <span className="text-gray-300">@kyungdev</span>
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-700/40 my-6"></div>

          {/* Current Status */}
          <div>
            <h4 className="text-lg font-medium text-white mb-2">
              Current Status
            </h4>
            <p className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              Available for freelance work and remote part-time opportunities
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="p-8 rounded-2xl bg-black shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Send Me a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Message</label>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow hover:opacity-90 transition"
            >
              Send Message <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
