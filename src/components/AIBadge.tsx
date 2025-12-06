import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useState, useEffect } from "react";
import aiBadgeIcon from "figma:asset/f462c67d643cd372c5dbe41247cf89eb305f136b.png";

interface AIBadgeProps {
  size?: "small" | "large";
  className?: string;
  inModal?: boolean;
}

export function AIBadge({ size = "small", className = "", inModal = false }: AIBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const badgeSize = size === "small" ? "w-7 h-7" : "w-9 h-9";

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
      // Close if touching outside the badge
      const target = e.target as HTMLElement;
      if (!target.closest('[data-ai-badge]')) {
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
  const handleBadgeClick = (e: React.MouseEvent) => {
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
  
  const badgeElement = (
    <motion.div
      className={`${className} ${(!isMobile || inModal) ? 'cursor-help' : 'cursor-default'}`}
      data-ai-badge
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
      onClick={handleBadgeClick}
    >
      {/* AI badge icon */}
      <img 
        src={aiBadgeIcon} 
        alt="AI" 
        className={badgeSize}
      />
    </motion.div>
  );

  if (!isMobile || inModal) {
    return (
      <TooltipProvider>
        <Tooltip open={isOpen} onOpenChange={setIsOpen} delayDuration={300}>
          <TooltipTrigger asChild onClick={(e) => e.preventDefault()}>
            {badgeElement}
          </TooltipTrigger>
          <TooltipContent 
            side="bottom"
            className="max-w-[280px] px-4 py-2.5 text-center"
            style={{
              backgroundColor: "#FF1493",
              color: "#ffffff",
              border: "none",
            }}
          >
            <p className="text-sm leading-tight tracking-wide">Contains AI-Generated Elements</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeElement;
}