import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface CategorySwitcherProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySwitcher({ activeCategory, onCategoryChange }: CategorySwitcherProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the switcher only when in the portfolio section
      const portfolioSection = document.getElementById("portfolio");
      const aboutSection = document.getElementById("about");
      
      if (portfolioSection && aboutSection) {
        const portfolioRect = portfolioSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        
        // Hide when about section is close to appearing (when top is less than window height)
        const aboutIsNear = aboutRect.top < window.innerHeight * 0.8;
        
        // Show when portfolio is in view and about section is not near
        const inPortfolioSection = portfolioRect.top < window.innerHeight / 2 && !aboutIsNear;
        setIsVisible(inPortfolioSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { label: "Design", value: "design", color: "#FF1493" },
    { label: "Illustration", value: "illustration", color: "#20B2AA" },
    { label: "Multimedia", value: "multimedia", color: "#6867ae" },
  ];

  const handleClick = (category: string) => {
    onCategoryChange(category);
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      const yOffset = -120;
      const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
          style={{
            left: "calc(50vw - 800px)",
          }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => handleClick(category.value)}
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
              title={category.label}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ 
                x: -300,
                y: index === 0 ? -200 : index === 1 ? 0 : 200,
                rotate: index === 0 ? -360 : index === 1 ? 360 : -180,
                opacity: 0,
                scale: 0.3
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            >
              {/* Circle button */}
              <div
                className="w-12 h-12 rounded-full border-3 transition-all"
                style={{
                  backgroundColor: activeCategory === category.value ? category.color : "transparent",
                  borderColor: category.color,
                  borderWidth: "3px",
                  filter: "url(#sketch)",
                }}
              />
              
              {/* Label on hover */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-md pointer-events-none"
                style={{
                  backgroundColor: category.color,
                  color: "white",
                  fontFamily: "'Cowkids', cursive",
                }}
              >
                {category.label}
              </motion.div>
            </motion.button>
          ))}

          {/* Show All button */}
          {activeCategory !== "all" && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ 
                x: -300,
                y: 100,
                rotate: 720,
                opacity: 0,
                scale: 0.2
              }}
              transition={{ 
                duration: 0.7,
                delay: 0.3,
                ease: "easeInOut"
              }}
              onClick={() => handleClick("all")}
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative group mt-2"
              title="Show All"
            >
              <div
                className="w-12 h-12 rounded-full border-3 bg-white transition-all flex items-center justify-center"
                style={{
                  borderColor: "#333",
                  borderWidth: "3px",
                  filter: "url(#sketch)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>

              {/* Label on hover */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-md pointer-events-none bg-foreground text-background"
                style={{
                  fontFamily: "'Cowkids', cursive",
                }}
              >
                Show All
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}