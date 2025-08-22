'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Particles from '@/components/atom/Backgrounds/Particles';

interface IntroProps {
  /** Duration in ms to show the intro (default: 3000) */
  duration?: number;
  /** Callback when intro animation completes */
  onComplete?: () => void;
  /** Custom particle configuration */
  particleConfig?: Record<string, any>;
  /** Custom content */
  title?: string;
  subtitle?: string;
  /** Skip intro (useful for development) */
  skipIntro?: boolean;
}

// Optimized particle configuration (moved outside component)
const DEFAULT_PARTICLE_CONFIG = {
  particleColors: ["#ffffff", "#00f2ff"],
  particleCount: 800,
  particleSpread: 12,
  speed: 0.5,
  particleBaseSize: 100,
  moveParticlesOnHover: true,
  particleHoverFactor: 0.5,
  alphaParticles: true,
  disableRotation: true,
} as const;

// Animation variants for better organization and reusability
const animationVariants = {
  container: {
    initial: { opacity: 1 },
    animate: { opacity: 0, scale: 1.2 },
    exit: { opacity: 0, scale: 1.5 }
  },
  content: {
    initial: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9,
      filter: 'blur(8px)'
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 1.1,
      filter: 'blur(4px)'
    }
  },
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
} as const;

// Custom hook for intro timing
function useIntroTimer(duration: number, skipIntro: boolean, onComplete?: () => void) {
  const [showIntro, setShowIntro] = useState(!skipIntro);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleComplete = useCallback(() => {
    setShowIntro(false);
    
    // Immediate cleanup khi skip
    if (isSkipped) {
      // Force cleanup ngay lập tức
      setTimeout(() => {
        const introElements = document.querySelectorAll('[data-intro-container]');
        introElements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
        onComplete?.();
      }, 50);
    } else {
      onComplete?.();
    }
  }, [onComplete, isSkipped]);

  const forceComplete = useCallback(() => {
    setIsSkipped(true);
    handleComplete();
  }, [handleComplete]);

  useEffect(() => {
    if (skipIntro) {
      handleComplete();
      return;
    }

    const timer = setTimeout(handleComplete, duration);
    return () => clearTimeout(timer);
  }, [duration, skipIntro, handleComplete]);

  return { showIntro, forceComplete, isSkipped };
}

export default function Intro({
  duration = 3000,
  onComplete,
  particleConfig,
  title = "KYUNG",
  subtitle = "Hi, I'm An. I love coding, building web apps, and learning about AI. Always excited to take on new projects!",
  skipIntro = false
}: IntroProps) {
  const { showIntro, forceComplete, isSkipped } = useIntroTimer(duration, skipIntro, onComplete);
  const [isExiting, setIsExiting] = useState(false);
  
  // Force completion handler với immediate cleanup
  const handleForceComplete = useCallback(() => {
    console.log('Force completing intro immediately'); // Debug log
    
    // Immediate DOM cleanup
    const introContainer = document.querySelector('[data-intro-container]') as HTMLElement;
    if (introContainer) {
      introContainer.style.pointerEvents = 'none';
      introContainer.style.opacity = '0';
      introContainer.style.visibility = 'hidden';
    }
    
    // Force body pointer events
    document.body.style.pointerEvents = 'auto';
    
    // Call the hook's force complete
    forceComplete();
  }, [forceComplete]);

  // Auto trigger exit animation
  useEffect(() => {
    if (!showIntro && !isExiting) {
      setIsExiting(true);
    }
  }, [showIntro, isExiting]);

  // Memoize particle configuration
  const finalParticleConfig = useMemo(() => ({
    ...DEFAULT_PARTICLE_CONFIG,
    ...particleConfig
  }), [particleConfig]);

  // Animation timing configuration
  const timing = useMemo(() => {
    const animationDuration = Math.min(duration * 0.4, 1200); // Max 1.2s for animations
    const contentDelay = animationDuration * 0.2;
    const exitDelay = Math.max(duration - animationDuration * 1.5, duration * 0.6);

    return {
      containerDuration: animationDuration / 1000,
      contentDuration: (animationDuration * 0.8) / 1000,
      contentDelay: contentDelay / 1000,
      exitDelay: exitDelay / 1000,
      titleDelay: contentDelay / 1000,
      subtitleDelay: (contentDelay + 200) / 1000
    };
  }, [duration]);

  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => {
        console.log('AnimatePresence exit completed'); // Debug log
        // Đảm bảo cleanup hoàn toàn
        const introElements = document.querySelectorAll('[data-intro-container]');
        introElements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
        document.body.style.pointerEvents = 'auto';
        
        if (!isSkipped) {
          onComplete?.();
        }
      }}
    >
      {showIntro && (
        <motion.div
          key="intro"
          variants={animationVariants.container}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: isSkipped ? 0.2 : timing.containerDuration, // Faster exit nếu skip
            delay: isSkipped ? 0 : timing.exitDelay, // No delay nếu skip
            ease: [0.25, 0.1, 0.25, 1]
          }}
          onAnimationComplete={(definition) => {
            console.log('Intro animation completed', { isSkipped, definition }); // Debug log
            
            // Immediate cleanup
            const element = document.querySelector('[data-intro-container]');
            if (element) {
              (element as HTMLElement).style.pointerEvents = 'none';
              (element as HTMLElement).style.display = 'none';
            }
            
            // Ensure body is interactive
            document.body.style.pointerEvents = 'auto';
            
            // Only call onComplete if not already called by skip
            if (!isSkipped) {
              setTimeout(() => onComplete?.(), 50);
            }
          }}
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
            showIntro ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          data-intro-container
        >
          {/* Enhanced background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
          
          {/* Subtle overlay pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 translate-y-full animate-pulse" />
          </div>

          {/* Particles background */}
          <Particles 
            className="absolute inset-0" 
            {...finalParticleConfig}
          />

          {/* Content container */}
          <motion.div
            variants={animationVariants.content}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              duration: timing.contentDuration,
              delay: timing.contentDelay,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative text-center max-w-4xl mx-auto px-6"
          >
            {/* Main title */}
            <motion.div
              variants={animationVariants.title}
              transition={{ 
                duration: timing.contentDuration,
                delay: timing.titleDelay,
                ease: "easeOut"
              }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider text-white relative">
                <span className="relative z-10 drop-shadow-2xl">
                  {title}
                </span>
                {/* Glowing text effect */}
                <span 
                  className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 opacity-50 blur-sm"
                  aria-hidden="true"
                >
                  {title}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={animationVariants.subtitle}
              transition={{ 
                duration: timing.contentDuration,
                delay: timing.subtitleDelay,
                ease: "easeOut"
              }}
              className="mt-6 md:mt-8"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                {subtitle}
              </p>
            </motion.div>

            {/* Optional loading indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                delay: timing.subtitleDelay + 0.3,
                duration: 0.5
              }}
              className="mt-8 md:mt-12"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse" />
              </div>
            </motion.div>
          </motion.div>

          {/* Skip button (for development/accessibility) */}
          {!skipIntro && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleForceComplete}
              className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded px-3 py-2"
              aria-label="Skip introduction"
            >
              Skip →
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}