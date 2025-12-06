import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AwardStar } from "./AwardStar";
import { AIBadge } from "./AIBadge";
import leafIcon from "figma:asset/6c3da388443fb551d348f561587301df16ec7e07.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Project {
  id: number;
  title: string;
  category: string;
  categories?: string[];
  image: string;
  description?: string;
  details?: string;
  skills?: string[];
  year?: string;
  award?: boolean | string;
  environmental?: boolean; // NEW: leaf indicator
  ai?: boolean; // NEW: AI badge indicator
  videoUrl?: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    result: string;
    images?: string[];
  };
  processImages?: string[];
  processVideos?: string[];
  productionImages?: string[];
  finalBossImages?: string[];
  instagramPosts?: string[];
  figmaEmbed?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [selectedProcessImage, setSelectedProcessImage] = useState<string | null>(null);
  const [selectedProcessImageIndex, setSelectedProcessImageIndex] = useState<number>(0);
  const [selectedImageGallery, setSelectedImageGallery] = useState<'process' | 'production' | 'finalBoss' | null>(null);
  const [currentInstagramIndex, setCurrentInstagramIndex] = useState<number>(0);
  const [showProcessImages, setShowProcessImages] = useState(true); // NEW: collapse state for process images
  const [showProductionImages, setShowProductionImages] = useState(true); // NEW: collapse state for production
  const [showFinalBossImages, setShowFinalBossImages] = useState(true); // NEW: collapse state for final boss
  const [arrowBounce, setArrowBounce] = useState(false); // NEW: bounce animation trigger
  const contentRef = useRef<HTMLDivElement>(null);
  const bounceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
      setShowCaseStudy(false); // Reset case study visibility when opening new project
      
      // Check if content is scrollable after a short delay to ensure content is rendered
      setTimeout(() => {
        if (contentRef.current) {
          const hasScroll = contentRef.current.scrollHeight > contentRef.current.clientHeight;
          setShowScrollIndicator(hasScroll);
        }
      }, 100);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [project]);

  useEffect(() => {
    // Recheck scroll when case study is toggled
    if (contentRef.current) {
      const hasScroll = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setShowScrollIndicator(hasScroll);
    }
  }, [showCaseStudy]);

  // Random bounce animation for arrow when case study is closed
  useEffect(() => {
    if (!showCaseStudy && project?.caseStudy) {
      // Set up random bounce interval
      const scheduleNextBounce = () => {
        const randomDelay = Math.random() * (5000 - 2000) + 2000; // Random delay between 2-5 seconds
        bounceIntervalRef.current = setTimeout(() => {
          setArrowBounce(true);
          setTimeout(() => setArrowBounce(false), 600); // Bounce duration
          scheduleNextBounce(); // Schedule next bounce
        }, randomDelay);
      };
      
      scheduleNextBounce();
      
      return () => {
        if (bounceIntervalRef.current) {
          clearTimeout(bounceIntervalRef.current);
        }
      };
    }
  }, [showCaseStudy, project]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Hide indicator when user starts scrolling or reaches near the bottom
      if (scrollTop > 50 || scrollTop + clientHeight >= scrollHeight - 50) {
        setShowScrollIndicator(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  // Helper function to get color for a category
  const getCategoryColor = (cat: string) => {
    if (cat === "multimedia") return "#6867ae";
    if (cat === "illustration") return "#20B2AA";
    return "#FF1493"; // design
  };

  // Helper function to get color class for a category
  const getCategoryColorClass = (cat: string) => {
    if (cat === "multimedia") return "text-[#6867ae]";
    if (cat === "illustration") return "text-secondary";
    return "text-primary"; // design
  };

  // Get a random color from project's categories
  const getProjectColor = (proj: Project) => {
    if (proj.categories && proj.categories.length > 0) {
      const randomCat = proj.categories[proj.id % proj.categories.length];
      return getCategoryColor(randomCat);
    }
    return getCategoryColor(proj.category);
  };

  // Get a random color class from project's categories
  const getProjectColorClass = (proj: Project) => {
    if (proj.categories && proj.categories.length > 0) {
      const randomCat = proj.categories[proj.id % proj.categories.length];
      return getCategoryColorClass(randomCat);
    }
    return getCategoryColorClass(proj.category);
  };

  // Determine colors based on category
  const categoryColor = project ? getProjectColor(project) : "#FF1493";
  const categoryColorClass = project ? getProjectColorClass(project) : "text-primary";

  return (
    <>
    <AnimatePresence>
      {project && (
        <motion.div
          key={`modal-${project.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-2xl max-w-4xl xl:max-w-5xl 2xl:max-w-6xl w-full my-2 md:my-8 relative overflow-hidden"
          style={{ backgroundColor: 'white', maxHeight: '95vh' }}
        >
          {/* Hand-drawn border around OUTER edge - color based on category */}
          <svg
            className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
            style={{ left: '-4px', top: '-4px' }}
          >
            <motion.rect
              x="6"
              y="6"
              width="calc(100% - 12)"
              height="calc(100% - 12)"
              rx="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className={categoryColorClass}
              style={{ filter: "url(#sketch)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1 right-1 md:top-4 md:right-4 z-20 p-2 bg-background rounded-full md:bg-transparent"
            style={{ color: categoryColor }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Content - with hidden scrollbar */}
          <div 
            ref={contentRef}
            onScroll={handleScroll}
            className="p-6 md:p-12 max-h-[80vh] overflow-y-auto"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
          >
            {/* Hide scrollbar for Chrome, Safari and Opera */}
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Video or Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full mb-8 relative group"
            >
              {project.videoUrl ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.videoUrl}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div 
                  className="w-full rounded-xl overflow-hidden bg-muted" 
                  style={{ height: '45vh', display: 'block' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover cursor-pointer md:cursor-default"
                    style={{
                      display: 'block'
                    }}
                    onClick={() => setImageZoomed(true)}
                  />
                </div>
              )}
            </motion.div>

            {/* Title with hand-drawn underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-start gap-4">
                <h2 className="text-2xl md:text-4xl mb-2 relative inline-block">
                  {project.title}
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 10">
                    <motion.path
                      d="M 0 5 Q 75 2, 150 5 T 300 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className={categoryColorClass}
                      style={{ filter: "url(#roughen)" }}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        pathLength: { duration: 0.8, delay: 0.4, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 0.4 }
                      }}
                    />
                  </svg>
                </h2>
                {project.award && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <AwardStar 
                      size="large" 
                      awardText={typeof project.award === "string" ? project.award : undefined}
                      inModal={true}
                    />
                  </motion.div>
                )}
                {project.environmental && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          <img
                            src={leafIcon}
                            alt="Environmental"
                            className="w-10 h-10"
                          />
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          backgroundColor: "#60d986",
                          color: "#ffffff",
                          border: "none",
                        }}
                      >
                        <p>Environmental project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {project.ai && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <AIBadge 
                      size="large" 
                      inModal={true}
                    />
                  </motion.div>
                )}
              </div>
              {project.year && (
                <p className="text-muted-foreground mt-2">{project.year}</p>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              {project.details && (
                <div className="text-base text-muted-foreground leading-relaxed mt-2">
                  {project.details.split(/(\*\*.*?\*\*)/).map((part, index) => {
                    // Check if part is bold (wrapped in **)
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={index}>{part.slice(2, -2)}</strong>;
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>
              )}
            </motion.div>

            {/* Case Study Section - Hidden initially, shown after clicking arrow */}
            <AnimatePresence>
              {showCaseStudy && project.caseStudy && (
                <motion.div
                  key={`casestudy-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 space-y-6"
                >
                  <div className="border-t border-border pt-6">
                    <h3 className="text-2xl mb-6">Case Study</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg mb-2" style={{ color: categoryColor }}>Overview</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.caseStudy.overview}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg mb-2" style={{ color: categoryColor }}>Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.caseStudy.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg mb-2" style={{ color: categoryColor }}>Solution</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.caseStudy.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg mb-2" style={{ color: categoryColor }}>Result</h4>
                        <div className="text-muted-foreground leading-relaxed">
                          {project.caseStudy.result.split('\n').map((line, index) => {
                            // Check if line should be bold (wrapped in **)
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <p key={index} className="font-bold">
                                  {line.slice(2, -2)}
                                </p>
                              );
                            }
                            // Empty lines create spacing
                            if (line.trim() === '') {
                              return <br key={index} />;
                            }
                            // Regular text
                            return <p key={index}>{line}</p>;
                          })}
                        </div>
                      </div>

                      {/* Additional case study images */}
                      {project.caseStudy.images && project.caseStudy.images.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {project.caseStudy.images.slice(1).map((image, index) => (
                            <motion.div
                              key={`${project.id}-case-image-${index}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="aspect-video rounded-lg overflow-hidden"
                            >
                              <img
                                src={image}
                                alt={`Case study image ${index + 2}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* How I Created This Logo Section */}
            <AnimatePresence>
              {showCaseStudy && project.processImages && project.processImages.length > 0 && (
                <motion.div
                  key={`process-section-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl">
                        {project.id === 2 ? "Hatching the Idea" : project.id === 3 ? "Buzzing Creativity" : project.id === 5 ? "Client Presentation" : project.id === 6 ? "Paper, Pixels & UFOs" : project.id === 7 ? "Flight Path (Storyboard to Screen)" : project.id === 8 ? "Photos" : project.id === 9 ? "Paper to Playtest" : "How I Created This Logo"}
                      </h3>
                      <motion.button
                        onClick={() => setShowProcessImages(!showProcessImages)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-muted"
                        style={{ color: categoryColor }}
                      >
                        {showProcessImages ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    
                    <AnimatePresence>
                      {showProcessImages && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-3 gap-3 md:gap-4 overflow-hidden"
                        >
                          {project.processImages.map((image, index) => (
                            <motion.button
                              key={`${project.id}-process-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedProcessImage(image);
                                setSelectedProcessImageIndex(index);
                                setSelectedImageGallery('process');
                              }}
                              className="aspect-square rounded-lg overflow-hidden border-2 hover:border-current transition-colors"
                              style={{ borderColor: `${categoryColor}33` }}
                            >
                              <img
                                src={image}
                                alt={`Process step ${index + 1}`}
                                className="w-full h-full object-cover"
                                style={project.id === 8 && index === 0 ? { objectPosition: 'center 35%' } : undefined}
                              />
                            </motion.button>
                          ))}
                          {project.processVideos?.map((videoUrl, index) => (
                            <motion.div
                              key={`${project.id}-process-video-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + (project.processImages?.length || 0 + index) * 0.05 }}
                              className="aspect-square rounded-lg overflow-hidden border-2"
                              style={{ borderColor: `${categoryColor}33` }}
                            >
                              <iframe
                                src={videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Production Images Section */}
            <AnimatePresence>
              {showCaseStudy && project.productionImages && project.productionImages.length > 0 && (
                <motion.div
                  key={`production-section-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl">Printing & Production</h3>
                      <motion.button
                        onClick={() => setShowProductionImages(!showProductionImages)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-muted"
                        style={{ color: categoryColor }}
                      >
                        {showProductionImages ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    
                    <AnimatePresence>
                      {showProductionImages && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-3 gap-3 md:gap-4 overflow-hidden"
                        >
                          {project.productionImages.map((image, index) => (
                            <motion.button
                              key={`${project.id}-production-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedProcessImage(image);
                                setSelectedProcessImageIndex(index);
                                setSelectedImageGallery('production');
                              }}
                              className="aspect-square rounded-lg overflow-hidden border-2 hover:border-current transition-colors"
                              style={{ borderColor: `${categoryColor}33` }}
                            >
                              <img
                                src={image}
                                alt={`Production step ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final Boss Section */}
            <AnimatePresence>
              {showCaseStudy && project.finalBossImages && project.finalBossImages.length > 0 && (
                <motion.div
                  key={`finalboss-section-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl">Final Boss</h3>
                      <motion.button
                        onClick={() => setShowFinalBossImages(!showFinalBossImages)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-muted"
                        style={{ color: categoryColor }}
                      >
                        {showFinalBossImages ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    
                    <AnimatePresence>
                      {showFinalBossImages && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-3 gap-3 md:gap-4 overflow-hidden"
                        >
                          {project.finalBossImages.map((image, index) => (
                            <motion.button
                              key={`${project.id}-finalboss-${index}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedProcessImage(image);
                                setSelectedProcessImageIndex(index);
                                setSelectedImageGallery('finalBoss');
                              }}
                              className="aspect-square rounded-lg overflow-hidden border-2 hover:border-current transition-colors"
                              style={{ borderColor: `${categoryColor}33` }}
                            >
                              <img
                                src={image}
                                alt={`Final boss image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Figma Embed Section */}
            <AnimatePresence>
              {showCaseStudy && project.figmaEmbed && (
                <motion.div
                  key={`figma-section-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="border-t border-border pt-6">
                    <h3 className="text-2xl mb-6">Interactive Flipbook</h3>
                    
                    <div 
                      className="rounded-lg overflow-hidden border-2"
                      style={{ borderColor: `${categoryColor}33` }}
                    >
                      <div style={{ transform: 'scale(1.96)', transformOrigin: 'center center' }}>
                        <iframe
                          src={project.figmaEmbed}
                          className="w-full"
                          style={{ 
                            height: '450px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            minHeight: '450px'
                          }}
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instagram Posts Section */}
            <AnimatePresence>
              {showCaseStudy && project.instagramPosts && project.instagramPosts.length > 0 && (
                <motion.div
                  key={`instagram-section-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl">Instagram Posts</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {currentInstagramIndex + 1} / {project.instagramPosts.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* Instagram note */}
                    <p className="text-muted-foreground mb-4 text-center">
                      Check out <a 
                        href="https://www.instagram.com/aaf_spokane/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        AAF Spokane's Instagram
                      </a> for more EmpowerHOUR content.
                    </p>
                    
                    <div className="relative">
                      {/* Instagram embed carousel */}
                      <AnimatePresence mode="wait">
                        {project.instagramPosts.map((postUrl, index) => {
                          if (index !== currentInstagramIndex) return null;
                          
                          // Extract post ID from URL
                          const postId = postUrl.split('/p/')[1]?.split('/')[0];
                          const embedUrl = `https://www.instagram.com/p/${postId}/embed/`;
                          
                          return (
                            <motion.div
                              key={`${project.id}-instagram-${index}`}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.3 }}
                              className="rounded-lg overflow-hidden border-2 mx-auto"
                              style={{ 
                                borderColor: `${categoryColor}33`,
                                width: '540px',
                                maxWidth: '100%'
                              }}
                            >
                              <iframe
                                src={embedUrl}
                                className="w-full"
                                style={{ height: '960px', border: 'none' }}
                                scrolling="no"
                              />
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative mt-4"
              >
                <h3 className="text-lg mb-4">Skills & Tools</h3>
                <div className="flex items-start gap-2">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {project.skills.map((skill, index) => (
                      <motion.span
                        key={`${project.id}-skill-${skill}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? -2 : 2 }}
                        style={{
                          backgroundColor: `${categoryColor}1A`,
                          color: categoryColor,
                          borderColor: `${categoryColor}33`,
                        }}
                        className="px-4 py-2 rounded-lg border-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  {/* See more arrow button - aligned with skill badges */}
                  {project.caseStudy && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: showCaseStudy ? 180 : 0,
                        y: !showCaseStudy && arrowBounce ? [0, -10, 0] : 0
                      }}
                      onClick={() => setShowCaseStudy(!showCaseStudy)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      className="rounded-full p-2 flex-shrink-0"
                      style={{
                        color: categoryColor,
                      }}
                      transition={{ 
                        duration: 0.3,
                        y: { duration: 0.6, ease: "easeOut" }
                      }}
                    >
                      <motion.div
                        animate={!showCaseStudy ? {
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ChevronDown className="w-5 h-5" strokeWidth={!showCaseStudy ? 2.5 : 2} />
                      </motion.div>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Fallback arrow button for projects without skills but with case study */}
            {project.caseStudy && (!project.skills || project.skills.length === 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end mt-6"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: showCaseStudy ? 180 : 0,
                    y: !showCaseStudy && arrowBounce ? [0, -10, 0] : 0
                  }}
                  onClick={() => setShowCaseStudy(!showCaseStudy)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  className="rounded-full p-2"
                  style={{
                    color: categoryColor,
                  }}
                  transition={{ 
                    duration: 0.3,
                    y: { duration: 0.6, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    animate={!showCaseStudy ? {
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronDown className="w-5 h-5" strokeWidth={!showCaseStudy ? 2.5 : 2} />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Scroll indicator */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={scrollToBottom}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-1"
                  style={{ color: categoryColor }}
                >
                  <span className="text-xs">Scroll for more</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>

    {/* Process Image Full Screen Viewer */}
    <AnimatePresence>
      {selectedProcessImage && (
        <motion.div
          key="process-image-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProcessImage(null)}
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
        >
          {/* Close button */}
          <motion.button
            onClick={() => setSelectedProcessImage(null)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-20 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Navigation arrows */}
          {project && (() => {
            const currentGallery = selectedImageGallery === 'process' 
              ? project.processImages 
              : selectedImageGallery === 'production'
              ? project.productionImages
              : selectedImageGallery === 'finalBoss'
              ? project.finalBossImages
              : null;
            
            return currentGallery && currentGallery.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedProcessImageIndex === 0 
                      ? currentGallery.length - 1 
                      : selectedProcessImageIndex - 1;
                    setSelectedProcessImageIndex(newIndex);
                    setSelectedProcessImage(currentGallery[newIndex]);
                  }}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 z-20 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIndex = selectedProcessImageIndex === currentGallery.length - 1 
                      ? 0 
                      : selectedProcessImageIndex + 1;
                    setSelectedProcessImageIndex(newIndex);
                    setSelectedProcessImage(currentGallery[newIndex]);
                  }}
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 z-20 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            );
          })()}

          {/* Image counter */}
          {project && (() => {
            const currentGallery = selectedImageGallery === 'process' 
              ? project.processImages 
              : selectedImageGallery === 'production'
              ? project.productionImages
              : selectedImageGallery === 'finalBoss'
              ? project.finalBossImages
              : null;
            
            return currentGallery && currentGallery.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
                {selectedProcessImageIndex + 1} / {currentGallery.length}
              </div>
            );
          })()}

          {/* Image */}
          <motion.img
            key={selectedProcessImage}
            src={selectedProcessImage}
            alt="Process detail"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Main Image Full Screen Viewer */}
    <AnimatePresence>
      {imageZoomed && project && (
        <motion.div
          key="main-image-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setImageZoomed(false)}
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
        >
          {/* Close button */}
          <motion.button
            onClick={() => setImageZoomed(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-20 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}