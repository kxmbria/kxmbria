import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Transform scroll progress to rotate a hand-drawn element
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed scroll progress indicator - decorative hand-drawn shape */}
      <motion.div
        className="fixed bottom-6 left-6 z-40 hidden md:block"
        style={{ scale }}
      >
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          style={{ rotate }}
        >
          {/* Outer circle - progress */}
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-muted-foreground/20"
            style={{ filter: "url(#sketch)" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-primary"
            style={{
              filter: "url(#sketch)",
              pathLength: scrollYProgress,
            }}
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={220}
            animate={{
              strokeDashoffset: 220 - (scrollYProgress.get() * 220),
            }}
          />

          {/* Center decorative shape that morphs as you scroll */}
          <motion.path
            d="M 50 30 L 60 45 L 75 45 L 62 57 L 68 72 L 50 62 L 32 72 L 38 57 L 25 45 L 40 45 Z"
            fill="currentColor"
            className="text-secondary"
            style={{
              filter: "url(#sketch)",
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]),
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Back to top button - hand-drawn arrow on right side */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 p-0 group"
      >
        {/* Hand-drawn arrow pointing up */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="text-primary"
        >
          {/* Arrow shaft */}
          <motion.line
            x1="30"
            y1="45"
            x2="30"
            y2="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: "url(#sketch)" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: showBackToTop ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          {/* Arrow head left */}
          <motion.line
            x1="30"
            y1="20"
            x2="20"
            y2="28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: "url(#sketch)" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: showBackToTop ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          {/* Arrow head right */}
          <motion.line
            x1="30"
            y1="20"
            x2="40"
            y2="28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: "url(#sketch)" }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: showBackToTop ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          {/* Decorative circle around arrow */}
          <motion.circle
            cx="30"
            cy="30"
            r="26"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            style={{ filter: "url(#sketch)" }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
        </svg>

        {/* Small decorative star that appears on hover */}
        <motion.svg
          className="absolute -top-2 -right-2 w-6 h-6 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
          viewBox="0 0 20 20"
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M 10 2 L 11 7 L 16 7 L 12 10 L 14 15 L 10 12 L 6 15 L 8 10 L 4 7 L 9 7 Z"
            fill="currentColor"
            style={{ filter: "url(#sketch)" }}
          />
        </motion.svg>
      </motion.button>
    </>
  );
}
