import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoAnimation from "figma:asset/8317db72f634d8abcd3e88fcb1a60da1f6a6ef11.png";
import logoStatic from "figma:asset/b4ccaf2c59716c031e746e0574f9acd16f16ed4f.png";
import leafIcon from "figma:asset/6c3da388443fb551d348f561587301df16ec7e07.png";

interface HeroProps {
  onCategoryClick?: (category: string) => void;
}

export function Hero({ onCategoryClick }: HeroProps) {
  const [bubbleWord, setBubbleWord] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasWatchedReel, setHasWatchedReel] = useState(false);
  const [buttonDoodles, setButtonDoodles] = useState<Array<{ id: number; type: 'heart' | 'star' }>>([]);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Random bubble animation on mobile
  useEffect(() => {
    if (!isMobile) return;

    const triggerRandomBubble = () => {
      const words = ['design', 'illustration', 'multimedia'];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setBubbleWord(randomWord);
      setTimeout(() => setBubbleWord(null), 600); // Clear after animation
    };

    // Trigger every 4-7 seconds randomly
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 3000; // Random between 4-7 seconds
      return setTimeout(() => {
        triggerRandomBubble();
        intervalId = scheduleNext();
      }, delay);
    };

    let intervalId = scheduleNext();

    return () => clearTimeout(intervalId);
  }, [isMobile]);

  // Periodic doodles coming out of Start button (before video is watched)
  useEffect(() => {
    if (hasWatchedReel) return;

    const scheduleNextDoodle = () => {
      const delay = 2500 + Math.random() * 2000; // Random between 2.5-4.5 seconds
      return setTimeout(() => {
        const type = Math.random() > 0.5 ? 'heart' : 'star';
        const newDoodle = { id: Date.now(), type };
        setButtonDoodles(prev => [...prev, newDoodle]);
        
        // Remove doodle after animation completes
        setTimeout(() => {
          setButtonDoodles(prev => prev.filter(d => d.id !== newDoodle.id));
        }, 1500);
        
        intervalId = scheduleNextDoodle();
      }, delay);
    };

    let intervalId = scheduleNextDoodle();

    return () => clearTimeout(intervalId);
  }, [hasWatchedReel]);

  const handleCategoryClick = (category: string) => {
    onCategoryClick?.(category);
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      const yOffset = -100; // Offset to account for nav bar
      const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.section 
      className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6 pb-4 pt-48 md:pt-56"
    >
      {/* Subtle decorative hand-drawn elements */}
      <motion.div
        className="absolute top-40 left-20 w-12 h-12 opacity-20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-primary"
            style={{ filter: "url(#sketch)" }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-32 w-14 h-14 opacity-25"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-secondary"
            style={{ filter: "url(#sketch)" }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-10 w-10 h-10 opacity-20"
        animate={{
          rotate: [0, 360],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,10 90,85 10,85"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-primary"
            style={{ filter: "url(#sketch)" }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-16 h-16 opacity-15"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 30 50 L 50 30 L 70 50 L 50 70 Z"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-secondary"
            style={{ filter: "url(#sketch)" }}
          />
        </svg>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center space-y-8 max-w-6xl"
      >
        {/* Animated GIF logo KAMBRIA with heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center mb-12"
        >
          {isMobile ? (
            <img 
              src={logoStatic}
              alt="KAMBRIA" 
              className="w-48 h-auto max-w-full"
              loading="eager"
              decoding="async"
              style={{ 
                imageRendering: 'auto',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          ) : (
            <img 
              src={logoAnimation}
              alt="KAMBRIA" 
              className="h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] w-auto max-w-full"
              loading="eager"
              decoding="async"
              style={{ 
                imageRendering: 'auto',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          )}
        </motion.div>

        {/* Hand-drawn Start button - MOVED ABOVE the three words */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 relative"
        >
          {/* Confetti explosions - stars and hearts */}
          {showConfetti && (
            <>
              {/* Star confetti */}
              {[...Array(6)].map((_, i) => {
                const angle = ((i / 6) * Math.PI * 2);
                const distance = 120 + Math.random() * 80;
                return (
                  <motion.svg
                    key={`star-${i}`}
                    className="absolute w-8 h-8 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 20, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 20, Math.sin(angle) * distance],
                      scale: [0, 1.2, 0.5],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: i * 0.05,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <path
                      d="M12 2 L14 9 L21 9 L15.5 13.5 L18 21 L12 16 L6 21 L8.5 13.5 L3 9 L10 9 Z"
                      fill={["#FF1493", "#f7991c", "#6fd4fd", "#20B2AA"][i % 4]}
                      fillOpacity="0.9"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}

              {/* Heart confetti */}
              {[...Array(5)].map((_, i) => {
                const angle = ((i / 5) * Math.PI * 2) + Math.PI / 5;
                const distance = 130 + Math.random() * 90;
                return (
                  <motion.svg
                    key={`heart-${i}`}
                    className="absolute w-7 h-7 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 25, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 25, Math.sin(angle) * distance],
                      scale: [0, 1, 0.4],
                      rotate: [0, Math.random() * 180 - 90],
                    }}
                    transition={{
                      duration: 1.1,
                      ease: "easeOut",
                      delay: i * 0.07,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={["#FF1493", "#f7991c", "#6fd4fd"][i % 3]}
                      fillOpacity="0.85"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}
            </>
          )}

          {/* Periodic doodles coming out of button */}
          {buttonDoodles.map(doodle => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            return doodle.type === 'heart' ? (
              <motion.svg
                key={doodle.id}
                className="absolute w-5 h-5 pointer-events-none"
                viewBox="0 0 24 24"
                initial={{ opacity: 0.8, x: 0, y: 0, scale: 0.3, rotate: 0 }}
                animate={{
                  opacity: [0.8, 0.9, 0],
                  x: [0, Math.cos(angle) * distance],
                  y: [0, Math.sin(angle) * distance],
                  scale: [0.3, 0.8, 0.4],
                  rotate: [0, Math.random() * 90 - 45],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#FF1493"
                  fillOpacity="0.8"
                  style={{ filter: "url(#sketch)" }}
                />
              </motion.svg>
            ) : (
              <motion.svg
                key={doodle.id}
                className="absolute w-5 h-5 pointer-events-none"
                viewBox="0 0 24 24"
                initial={{ opacity: 0.8, x: 0, y: 0, scale: 0.3, rotate: 0 }}
                animate={{
                  opacity: [0.8, 0.9, 0],
                  x: [0, Math.cos(angle) * distance],
                  y: [0, Math.sin(angle) * distance],
                  scale: [0.3, 0.9, 0.5],
                  rotate: [0, Math.random() * 180],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                <path
                  d="M12 2 L14 9 L21 9 L15.5 13.5 L18 21 L12 16 L6 21 L8.5 13.5 L3 9 L10 9 Z"
                  fill="#f7991c"
                  fillOpacity="0.85"
                  style={{ filter: "url(#sketch)" }}
                />
              </motion.svg>
            );
          })}

          <motion.button
            onClick={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 1200);
              setShowReel(true);
              setHasWatchedReel(true);
            }}
            className="relative px-12 py-4 text-2xl md:text-3xl lg:text-4xl cursor-pointer"
            whileHover={!hasWatchedReel ? { scale: 1.08 } : { scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            animate={
              hasWatchedReel
                ? {}
                : {
                    rotate: [0, -3, 3, -2, 2, 0],
                    scale: [1, 1.02, 1, 1.02, 1],
                  }
            }
            transition={
              hasWatchedReel
                ? {}
                : {
                    rotate: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            {/* Hand-drawn button background */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 80"
              preserveAspectRatio="none"
            >
              <path
                d="M 10 40 Q 10 10, 40 10 L 160 10 Q 190 10, 190 40 Q 190 70, 160 70 L 40 70 Q 10 70, 10 40"
                fill="none"
                stroke="#f7991c"
                strokeWidth="3"
                style={{ filter: "url(#roughen)" }}
              />
            </svg>
            <span className="relative z-10 flex items-center gap-3" style={{ fontWeight: 600 }}>
              {/* Hand-drawn play arrow */}
              <svg 
                className="w-8 h-8 md:w-10 md:h-10" 
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M 8 5 L 8 19 L 18 12 Z"
                  fill="#FF1493"
                  stroke="#FF1493"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              START
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-nowrap items-center justify-center gap-2 md:gap-3 lg:gap-4 text-lg md:text-4xl lg:text-5xl xl:text-6xl mt-5"
        >
          <motion.button
            className="inline-block relative group cursor-pointer whitespace-nowrap"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={bubbleWord === 'design' ? { scale: [1, 1.1, 1], rotate: [-2, 0, -2] } : {}}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => handleCategoryClick("design")}
          >
            Design
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 5">
              <path
                d="M 0 2.5 Q 25 1.5, 50 2.5 T 100 2.5"
                stroke="#FF1493"
                strokeWidth="2"
                fill="none"
                style={{ filter: "url(#roughen)" }}
              />
            </svg>
          </motion.button>

          <span className="text-foreground text-base md:text-xl lg:text-2xl xl:text-3xl">•</span>

          <motion.button
            className="inline-block relative group cursor-pointer whitespace-nowrap"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            animate={bubbleWord === 'illustration' ? { scale: [1, 1.1, 1], rotate: [2, 0, 2] } : {}}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => handleCategoryClick("illustration")}
          >
            Illustration
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 5">
              <path
                d="M 0 2.5 Q 25 1.5, 50 2.5 T 100 2.5"
                stroke="#20B2AA"
                strokeWidth="2"
                fill="none"
                style={{ filter: "url(#roughen)" }}
              />
            </svg>
          </motion.button>

          <span className="text-foreground text-base md:text-xl lg:text-2xl xl:text-3xl">•</span>

          <motion.button
            className="inline-block relative group cursor-pointer whitespace-nowrap"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={bubbleWord === 'multimedia' ? { scale: [1, 1.1, 1], rotate: [-2, 0, -2] } : {}}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => handleCategoryClick("multimedia")}
          >
            Multimedia
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 5">
              <path
                d="M 0 2.5 Q 25 1.5, 50 2.5 T 100 2.5"
                stroke="#6867ae"
                strokeWidth="2"
                fill="none"
                style={{ filter: "url(#roughen)" }}
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Video Reel Modal */}
      {showReel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowReel(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowReel(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* YouTube iframe */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/svX15DFFHF4?autoplay=1"
              title="Latest Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}