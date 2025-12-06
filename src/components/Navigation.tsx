import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "figma:asset/4a7ec3f98bd643fd92065ff4c3cee291a72f789a.png";
import designUnderline from "figma:asset/80453e96c6c44c17b0068579b967b1d42ba01243.png";

interface NavigationProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  currentPage?: "home" | "about";
  onPageChange?: (page: "home" | "about") => void;
}

export function Navigation({ activeCategory = "all", onCategoryChange, currentPage = "home", onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("all");

  // Reset activeSection when returning to home page
  useEffect(() => {
    if (currentPage === "home") {
      setActiveSection("all");
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track sections on home page
      if (currentPage !== "home") return;

      // Detect which section is currently in view
      const sections = ["portfolio", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.pageYOffset;
          const absoluteBottom = bottom + window.pageYOffset;

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section);
            return;
          }
        }
      }

      // If we're at the top, set to "all"
      if (window.scrollY < 300) {
        setActiveSection("all");
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const categories = [
    { label: "Design", value: "design" },
    { label: "Illustration", value: "illustration" },
    { label: "Multimedia", value: "multimedia" },
    { label: "About", value: "about" },
    { label: "Contact", value: "contact" },
  ];

  const handleCategoryClick = (category: string) => {
    if (category === "about") {
      setActiveSection("about");
      onPageChange?.("about");
    } else if (category === "contact") {
      setActiveSection("contact");
      // Make sure we're on home page first
      if (currentPage !== "home") {
        onPageChange?.("home");
        // Wait for page to render, then scroll
        setTimeout(() => {
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            const yOffset = -100;
            const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      } else {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const yOffset = -100;
          const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    } else {
      setActiveSection("portfolio");
      // Make sure we're on home page first
      if (currentPage !== "home") {
        onPageChange?.("home");
        // Wait for page to render, then scroll and set category
        setTimeout(() => {
          onCategoryChange?.(category);
          const portfolioSection = document.getElementById("portfolio");
          if (portfolioSection) {
            const yOffset = -100;
            const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      } else {
        onCategoryChange?.(category);
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
          const yOffset = -100;
          const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* SVG Filters for hand-drawn effects */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="roughen">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
          <filter id="sketch">
            <feTurbulence baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
          <filter id="marker">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
            <feMorphology operator="dilate" radius="0.5" />
          </filter>
        </defs>
      </svg>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - K with heart on left */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("all");
              onPageChange?.("home");
              onCategoryChange?.("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotate: [0, -3, 3, -2, 2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            className="cursor-pointer"
          >
            <img 
              src={logoIcon} 
              alt="KXMBRIA" 
              className="h-12 lg:h-14 xl:h-16 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {categories.slice(0, 3).map((category, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <span 
                    className="mx-2 lg:mx-3 text-foreground"
                  >
                    •
                  </span>
                )}
                <motion.button
                  onClick={() => handleCategoryClick(category.value)}
                  whileHover={{ 
                    scale: 1.05,
                    color: category.value === "multimedia" ? "#6867ae" : 
                           category.value === "illustration" ? "#20B2AA" : 
                           "#FF1493"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 lg:px-4 py-1 transition-colors relative no-underline"
                  style={{ textDecoration: 'none' }}
                  animate={{
                    color: (activeSection === "portfolio" && activeCategory === category.value) ? 
                      (category.value === "multimedia" ? "#6867ae" : 
                       category.value === "illustration" ? "#20B2AA" : 
                       "#FF1493") : "#000000"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {category.label}
                </motion.button>
              </div>
            ))}
            <span className="mx-3 lg:mx-4 text-muted-foreground/30">|</span>
            {categories.slice(3).map((category, index) => (
              <motion.button
                key={index}
                onClick={() => handleCategoryClick(category.value)}
                whileHover={{ 
                  scale: 1.05,
                  color: "#f7991c"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 lg:px-4 py-1 transition-colors relative"
                style={{
                  color: (category.value === "about" && currentPage === "about") || 
                         (category.value === "contact" && activeSection === "contact" && currentPage === "home") 
                    ? "#f7991c" : undefined
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 space-y-1">
            {categories.map((category, index) => {
              const isActive = category.value === "about" 
                ? currentPage === "about"
                : category.value === "contact" 
                  ? (activeSection === category.value && currentPage === "home")
                  : (activeSection === "portfolio" && activeCategory === category.value);
              const categoryColor = 
                category.value === "multimedia" ? "#6867ae" :
                category.value === "illustration" ? "#20B2AA" :
                category.value === "design" ? "#FF1493" : 
                category.value === "about" || category.value === "contact" ? "#f7991c" : "#FF1493";
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleCategoryClick(category.value)}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full text-left px-4 py-3 rounded-lg transition-colors"
                  style={isActive ? { color: categoryColor, backgroundColor: `${categoryColor}0D` } : {}}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = `${categoryColor}1A`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
    </>
  );
}
