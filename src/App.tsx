import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { AboutPage } from "./components/AboutPage";
import { Portfolio } from "./components/Portfolio";
import { Contact } from "./components/Contact";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { CategorySwitcher } from "./components/CategorySwitcher";
import { FloatingCategoryCircles } from "./components/FloatingCategoryCircles";
import { CustomCursor } from "./components/CustomCursor";
import { Toaster } from "sonner@2.0.3";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState<"home" | "about">("home");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Scroll to portfolio section for category changes
    if (category !== "about" && category !== "contact") {
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const yOffset = -80; // Offset for fixed header
        const y = portfolioSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handlePageChange = (page: "home" | "about") => {
    setCurrentPage(page);
    if (page === "home") {
      setActiveCategory("all");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ cursor: "none" }}>
      <CustomCursor />
      <Toaster position="bottom-right" />
      <Navigation 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      {currentPage === "home" ? (
        <>
          <Hero onCategoryClick={handleCategoryChange} />
          
          <Portfolio 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange}
          />

          <div id="contact">
            <Contact onNavigateToAbout={() => handlePageChange("about")} />
          </div>

          <CategorySwitcher 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <FloatingCategoryCircles
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryChange}
          />

          <ScrollIndicator />
        </>
      ) : (
        <AboutPage />
      )}
    </div>
  );
}