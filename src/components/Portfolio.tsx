import { motion } from "motion/react";
import { X } from "lucide-react";
import { PortfolioGrid } from "./PortfolioGrid";

interface PortfolioProps {
  activeCategory: string;
  onCategoryChange?: (category: string) => void;
}

export function Portfolio({ activeCategory, onCategoryChange }: PortfolioProps) {
  // Get category color
  const getCategoryColor = () => {
    if (activeCategory === "multimedia") return "#6867ae";
    if (activeCategory === "illustration") return "#20B2AA";
    if (activeCategory === "design") return "#FF1493";
    return "#FF1493";
  };

  return (
    <section id="portfolio" className="min-h-screen py-20 px-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Only show header when a specific category is selected */}
        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 relative"
          >
            {/* X button to clear filter */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onCategoryChange?.("all")}
              className="absolute top-0 right-0 md:right-8 p-2 rounded-full border-2 transition-colors"
              style={{
                borderColor: getCategoryColor(),
                color: getCategoryColor(),
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <h2 
              className="text-4xl md:text-5xl mb-6"
              style={{ 
                fontFamily: "'Cowkids', cursive",
                color: getCategoryColor()
              }}
            >
              {activeCategory === "design" ? "Design" :
               activeCategory === "illustration" ? "Illustration" :
               "Multimedia"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {activeCategory === "design"
                ? "Brand identity, packaging, and visual design work"
                : activeCategory === "illustration"
                ? "Character design, editorial illustration, and digital art"
                : "Animation, video editing, and game design projects"}
            </p>
          </motion.div>
        )}

        <PortfolioGrid category={activeCategory} />
      </div>
    </section>
  );
}