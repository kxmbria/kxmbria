import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useState, useEffect } from "react";

interface AwardStarProps {
  size?: "small" | "large";
  className?: string;
  awardText?: string;
  inModal?: boolean;
}

export function AwardStar({ size = "small", className = "", awardText, inModal = false }: AwardStarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const starSize = size === "small" ? "w-7 h-7" : "w-9 h-9";

  // Detect mobile
  useState(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });
  
  // Close tooltip on scroll or touch outside
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    const handleTouchStart = (e: TouchEvent) => {
      // Close if touching outside the star
      const target = e.target as HTMLElement;
      if (!target.closest('[data-award-star]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      document.addEventListener('touchstart', handleTouchStart);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        document.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [isOpen]);

  // Handle opening/closing with spin animation
  const handleStarClick = (e: React.MouseEvent) => {
    if (!isMobile || inModal) {
      e.stopPropagation();
      
      // Only spin when inside modal
      if (inModal) {
        setIsSpinning(true);
        setTimeout(() => {
          setIsSpinning(false);
        }, 800);
      }
      
      setIsOpen(!isOpen);
    }
  };
  
  const starElement = (
    <motion.div
      className={`${className} ${(!isMobile || inModal) ? 'cursor-help' : 'cursor-default'}`}
      data-award-star
      animate={{
        scale: isSpinning ? 1 : [1, 1.15, 1],
        rotate: isSpinning ? 360 : 0,
      }}
      transition={
        isSpinning 
          ? { duration: 0.8, ease: "easeInOut" }
          : {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }
      }
      onClick={handleStarClick}
    >
      {/* Star icon - filled */}
      <Star 
        className={starSize} 
        fill="#f7991c" 
        stroke="#f7991c" 
        strokeWidth={2} 
      />
    </motion.div>
  );

  if (awardText && (!isMobile || inModal)) {
    return (
      <TooltipProvider>
        <Tooltip open={isOpen} onOpenChange={setIsOpen} delayDuration={300}>
          <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
            {starElement}
          </TooltipTrigger>
          <TooltipContent 
            side="bottom"
            className="max-w-[280px] px-4 py-2.5 text-center"
            style={{
              backgroundColor: "#f7991c",
              color: "#ffffff",
              border: "none",
            }}
          >
            <p className="text-sm leading-tight tracking-wide">{awardText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return starElement;
}
