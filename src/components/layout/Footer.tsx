'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio.config'

interface SimpleFooterProps {
  onSectionChange?: (section: string) => void
}

export default function SimpleFooter({ onSectionChange }: SimpleFooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onSectionChange?.('home')
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-white py-4"
    >
      <div className="container mx-auto">
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Brand & Social */}
          <div className="text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {portfolioConfig.name}
            </motion.h3>
            
            <div className="flex justify-center md:justify-start space-x-4">
              {portfolioConfig.socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Top</span>
            <div className="p-2 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
              <ArrowUp size={16} />
            </div>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            
            {/* Copyright */}
            <p className="flex items-center">
              © {currentYear} Made
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mx-1 text-red-500"
              >
              </motion.span>
              by {portfolioConfig.name}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
