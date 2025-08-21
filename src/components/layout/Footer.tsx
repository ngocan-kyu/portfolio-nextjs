"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

// Define props interface
interface SimpleFooterProps {
  onSectionChange?: (section: string) => void;
}

// Animation variants for motion components
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const hoverScale = {
  whileHover: { scale: 1.1, y: -2 },
  whileTap: { scale: 0.9 },
};

const pulseAnimation = {
  animate: { scale: [1, 1.2, 1] },
  transition: { repeat: Infinity, duration: 1.5 },
};

export default function SimpleFooter({ onSectionChange }: SimpleFooterProps) {
  const currentYear = new Date().getFullYear();

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onSectionChange?.("home");
  };

  return (
    <motion.footer {...fadeInUp} className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Social Links and Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4">
            {portfolioConfig.socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  {...hoverScale}
                >
                  <IconComponent size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            {...hoverScale}
          >
            <span>Top</span>
            <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <ArrowUp size={16} />
            </div>
          </motion.button>
        </div>

        {/* Copyright and Divider */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p className="flex items-center">
              © {currentYear} Made{" "}
              <motion.span
                {...pulseAnimation}
                className="mx-1 text-red-500"
              >
              </motion.span>
              by {portfolioConfig.name}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}