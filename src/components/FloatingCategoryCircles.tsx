import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface FloatingCategoryCirclesProps {
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

export function FloatingCategoryCircles({ activeCategory, onCategoryClick }: FloatingCategoryCirclesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const portfolioSection = document.getElementById("portfolio");
      const contactSection = document.getElementById("contact");
      
      if (!portfolioSection) return;

      const portfolioRect = portfolioSection.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      // Only show after scrolling down past 300px (past hero section)
      const hasScrolledDown = scrollY > 300;
      
      // Show when scrolled down and portfolio is in view
      const portfolioInView = portfolioRect.top < window.innerHeight && portfolioRect.bottom > 0;
      
      // Hide when contact section is close to appearing (if it exists)
      let contactIsNear = false;
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        contactIsNear = contactRect.top < window.innerHeight * 0.8;
      }
      
      setIsVisible(hasScrolledDown && portfolioInView && !contactIsNear);
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
    
    // Scroll to portfolio section with offset for fixed header
    setTimeout(() => {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const yOffset = -80; // Offset for fixed header
        const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetClick = () => {
    setIsSpinning(true);
    onCategoryClick('all');
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 600);
    
    // Scroll to portfolio section with offset for fixed header
    setTimeout(() => {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const yOffset = -80; // Offset for fixed header
        const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const categories = [
    { id: 'design', color: '#FF1493', label: 'Design' },
    { id: 'illustration', color: '#20B2AA', label: 'Illustration' },
    { id: 'multimedia', color: '#6867ae', label: 'Multimedia' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-40 flex gap-4 ${
            isMobile 
              ? 'left-4 top-1/2 -translate-y-1/2 flex-col' 
              : 'left-8 top-1/2 -translate-y-1/2 flex-col'
          }`}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={category.label}
            >
              {/* Solid circle */}
              <motion.div
                className={`rounded-full transition-all ${
                  isMobile ? 'w-6 h-6' : 'w-10 h-10'
                }`}
                style={{ 
                  backgroundColor: category.color,
                  opacity: activeCategory === category.id ? 1 : 0.4
                }}
                animate={{
                  opacity: activeCategory === category.id ? 1 : 0.4,
                }}
              />

              {/* Tooltip on hover - only show on desktop */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-background border-2 px-4 py-2 rounded-full whitespace-nowrap pointer-events-none"
                  style={{ 
                    borderColor: category.color,
                    filter: "url(#sketch)"
                  }}
                >
                  <span>{category.label}</span>
                </motion.div>
              )}
            </motion.button>
          ))}
          
          {/* X button - only show when a specific category is selected */}
          {activeCategory !== 'all' && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleResetClick}
              className={`relative group flex items-center justify-center ${
                isMobile ? 'w-6 h-6' : 'w-10 h-10'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Clear filter"
            >
              <motion.div
                animate={{ rotate: isSpinning ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <X className={isMobile ? 'w-5 h-5' : 'w-7 h-7'} strokeWidth={3} />
              </motion.div>

              {/* Tooltip on hover - only show on desktop */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-background border-2 px-4 py-2 rounded-full whitespace-nowrap pointer-events-none"
                  style={{ 
                    borderColor: '#000000',
                    filter: "url(#sketch)"
                  }}
                >
                  <span>Clear</span>
                </motion.div>
              )}
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
