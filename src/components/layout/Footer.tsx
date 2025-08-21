"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import useScrollTo from "@/hooks/useScrollTo"; 
import { memo } from "react";

// Types
interface SimpleFooterProps {
  onSectionChange?: (section: string) => void;
}

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const pulseAnimation = {
  animate: { scale: [1, 1.2, 1] },
  transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
};

const hoverScale = {
  whileHover: { scale: 1.1, y: -2, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95, transition: { duration: 0.1 } },
};

// Memoized Social Link Component
const SocialLink = memo(
  ({ name, url, icon: Icon }: { name: string; url: string; icon: React.ComponentType<{ size?: number }> }) => (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name} profile`}
      {...hoverScale}
      className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
    >
      <Icon size={20} />
    </motion.a>
  )
);

SocialLink.displayName = "SocialLink";

// Memoized Footer Component
const SimpleFooter = memo(({ onSectionChange }: SimpleFooterProps) => {
  const currentYear = new Date().getFullYear();
  const scrollTo = useScrollTo(onSectionChange);

  return (
    <motion.footer
      {...fadeInUp}
      className="bg-gray-900 text-white py-6"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        {/* Social Links + Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4">
            {portfolioConfig.socialLinks.map((social) => (
              <SocialLink
                key={social.name}
                name={social.name}
                url={social.url}
                icon={social.icon}
              />
            ))}
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => scrollTo({ sectionId: "home", behavior: "smooth" })}
            {...hoverScale}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Scroll to top of page"
          >
            <span>Top</span>
            <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <ArrowUp size={16} />
            </div>
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p className="flex items-center">
              © {currentYear} Made
              <motion.span {...pulseAnimation} className="mx-1 text-red-500">
                ❤️
              </motion.span>
              by {portfolioConfig.name}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
});

SimpleFooter.displayName = "SimpleFooter";

export default SimpleFooter;