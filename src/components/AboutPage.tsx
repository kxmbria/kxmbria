import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import profilePhoto from "figma:asset/c66cd77c84c91a163b38e59fbe8aad4032e468f1.png";
import hiThereImage from "figma:asset/54be39030dafb6d94b125d59546797d76e9f9b8f.png";
import phoneImage from "figma:asset/fe3eaaa83bb095cd7901ef08dda10b31d9af5d9f.png";
import { AutoScrollGallery } from "./AutoScrollGallery";
import { ScrollIndicator } from "./ScrollIndicator";

export function AboutPage() {
  const [showAwards, setShowAwards] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; count: number }>>([]);
  const [canClick, setCanClick] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAwardsClick = () => {
    if (!showAwards) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    setShowAwards(!showAwards);
  };

  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canClick) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Convert to percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const heartCount = Math.floor(Math.random() * 3) + 1; // Random 1-3
    const newHeart = {
      id: Date.now(),
      x,
      y,
      count: heartCount
    };
    
    setHearts(prev => [...prev, newHeart]);
    setCanClick(false);
    
    // Remove hearts after animation completes
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 7000);
    
    // Re-enable clicking after 6 seconds
    setTimeout(() => {
      setCanClick(true);
    }, 6000);
  };

  const achievements = [
    { year: "2025", items: [
      { text: "ROY & LEONA ", highlight: "SCHOLARSHIP", color: "#20B2AA", suffix: " RECIPIENT" },
      { text: "STCU VIDEO CONTENT CREATOR ", highlight: "INTERN", color: "#f7991c" },
      { text: "MIDNIGHT WAFFLES ", highlight: "INTERNSHIP", color: "#f7991c" },
      { text: "STILL DESIGNING FOR THE AAF AS A COMMUNICATIONS ", highlight: "COMMITTEE MEMBER", color: "#f7991c" },
      { text: "SOLD ORIGINAL ARTWORK AND 3D MODELS WHILE MANAGING MY OWN BOOTH AT ZINE FEST", color: "#1a1a1a" },
    ]},
    { year: "2024", items: [
      { text: "FEATURED", highlight: " IN THE INLANDER (AI SHEEP)", color: "#FF1493" },
      { text: "DESIGNING FOR THE AAF AS A COMMUNICATIONS ", highlight: "COMMITTEE MEMBER", color: "#f7991c" },
      { text: "CREATED A SIGN FOR SFCC'S SCIENCE BUILDING", color: "#1a1a1a" },
      { text: "SPOKANE ADDY'S COBALT AWARD ", highlight: "WINNER", color: "#6867ae", suffix: " (X2)" },
      { text: "PRESIDENT'S HONOR ROLL", color: "#1a1a1a" },
    ]},
    { year: "2023", items: [
      { text: "CONTRACT", highlight: " WITH SPICEOLOGY AS PRODUCTION ARTIST", color: "#f7991c" },
      { text: "HELVETICAHAUS ", highlight: "SCHOLARSHIP", color: "#20B2AA", suffix: " RECIPIENT" },
      { text: "PHI THETA KAPPA HONOR SOCIETY", color: "#1a1a1a" },
      { text: "ELECTED", highlight: " GDC PRESIDENT (SFCC)", color: "#6867ae" },
      { text: "CCS FOUNDATION ", highlight: "SCHOLARSHIP", color: "#20B2AA", suffix: " RECIPIENT" },
      { text: "TMR ", highlight: "SCHOLARSHIP", color: "#20B2AA", suffix: " RECIPIENT" },
    ]},
    { year: "2022", items: [
      { text: "AAF CREATE ", highlight: "WINNER", color: "#6867ae" },
    ]},
  ];

  return (
    <>
      <ScrollIndicator />
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {isMobile ? (
            <div className="flex justify-center">
              <img 
                src={hiThereImage}
                alt="Hi there, I'm KAMBRIA" 
                className="w-72 h-auto max-w-full"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : (
            <motion.h1
              className="inline-block relative"
              style={{ fontFamily: "'Cowkids', cursive" }}
            >
              <span className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
                {"Hi there, I'm ".split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
              <span className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl relative inline-block">
                {"KAMBRIA".split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: (index + 13) * 0.1, // Offset by length of "Hi there, I'm "
                      ease: "easeInOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                {/* Hand-drawn underline */}
                <motion.svg
                  className="absolute left-0 -bottom-2 w-full"
                  viewBox="0 0 300 20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                >
                  <motion.path
                    d="M5,12 Q80,8 150,10 T295,12"
                    stroke="#FF1493"
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                    style={{ filter: "url(#sketch)" }}
                  />
                </motion.svg>
                <span className="text-5xl md:text-7xl">.</span>
              </span>
            </motion.h1>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-[400px,1fr] lg:grid-cols-[500px,1fr] xl:grid-cols-[600px,1fr] gap-12 lg:gap-16 items-start mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div 
              className="relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
              onClick={handlePhotoClick}
            >
              <img 
                src={profilePhoto} 
                alt="Kambria"
                className="w-full h-auto"
              />
              {/* Animated playful border effect */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
              >
                <motion.rect
                  x="2"
                  y="2"
                  width="396"
                  height="496"
                  rx="21"
                  ry="21"
                  fill="none"
                  stroke="#FF1493"
                  strokeWidth="4"
                  style={{ filter: "url(#sketch)" }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1.05 }}
                  transition={{ 
                    duration: 2, 
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
            
            {/* Floating sparkle */}
            <motion.div
              className="absolute -top-4 -right-4 z-10"
              animate={{ 
                rotate: [0, 360],
                y: [0, -10, 0]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="w-8 h-8 text-quaternary fill-quaternary" />
            </motion.div>

            {/* Hearts overlay */}
            {hearts.map((heart) => {
              // Determine which hearts should be outlined vs solid
              // If 1 heart: solid
              // If 2 hearts: both outline
              // If 3 hearts: 2 outline, 1 solid
              const solidIndex = heart.count === 1 ? 0 : (heart.count === 2 ? -1 : 2);
              
              return (
                <motion.div
                  key={heart.id}
                  className="absolute pointer-events-none"
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1,
                    ease: "easeInOut"
                  }}
                >
                  {[...Array(heart.count)].map((_, i) => {
                    const isOutline = i !== solidIndex;
                    const colors = ["#FF1493", "#f7991c", "#6fd4fd"];
                    const color = colors[i % 3];
                    const animDuration = 2 + Math.random(); // 2-3 seconds
                    
                    return (
                      <motion.svg
                        key={`heart-${heart.id}-${i}`}
                        className="absolute w-10 h-10 pointer-events-none"
                        viewBox="0 0 24 24"
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                        animate={{
                          opacity: [1, 1, 1, 1, 0],
                          x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 250],
                          y: [0, -100 - Math.random() * 120],
                          scale: [0, 1.2, 1.2, 1.2, 0.5],
                          rotate: [0, Math.random() * 180 - 90],
                        }}
                        transition={{
                          duration: 6,
                          times: [0, 0.3, 0.85, 0.95, 1],
                          ease: "easeOut",
                          delay: i * 0.08,
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                      >
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill={isOutline ? "none" : color}
                          stroke={color}
                          strokeWidth={isOutline ? "2" : "0"}
                          fillOpacity={isOutline ? "0" : "0.85"}
                          style={{ filter: "url(#sketch)" }}
                        />
                      </motion.svg>
                    );
                  })}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl leading-relaxed">
              I'm a <span style={{ fontWeight: 600 }}>visual alchemist</span> focused on{" "}
              <span style={{ color: "#6867ae", fontWeight: 600 }}>animation</span>,{" "}
              <span className="text-primary" style={{ fontWeight: 600 }}>motion graphics</span>,{" "}
              <span className="text-quaternary" style={{ fontWeight: 600 }}>illustration</span>, and{" "}
              <span className="text-secondary" style={{ fontWeight: 600 }}>video editing</span>. My background in{" "}
              <span className="text-quaternary" style={{ fontWeight: 600 }}>illustration</span> and{" "}
              <span style={{ color: "#6fd4fd", fontWeight: 600 }}>graphic design</span> lets me build visuals from scratch with a mix of storytelling, craft, and technical skill. I love creating{" "}
              <span style={{ fontWeight: 600 }}>bold</span>, expressive visuals with personality.
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed">
              Animals, nature, and gaming inspire a lot of my ideas, and they often show up in my work.
            </p>
          </motion.div>
        </div>

        {/* Achievements Timeline */}
        {showAwards && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-8 overflow-hidden mb-20"
          >
            {achievements.map((yearGroup, yearIndex) => (
              <motion.div
                key={yearGroup.year}
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative"
              >
                {/* Year Badge */}
                <motion.div
                  className="inline-block mb-4 ml-4"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className="px-6 py-2 rounded-full relative bg-black"
                    style={{
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      {yearGroup.year}
                    </span>
                  </div>
                </motion.div>

                {/* Achievement Items */}
                <div className="space-y-3 pl-6 border-l-4 border-dashed border-muted-foreground/20">
                  {yearGroup.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: itemIndex * 0.1 + 0.2,
                        ease: "easeOut"
                      }}
                      className="relative pl-6 group"
                    >
                      {/* Bullet point */}
                      <motion.div
                        className="absolute left-0 top-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color === "#1a1a1a" ? "#6fd4fd" : item.color }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: itemIndex * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 350,
                          damping: 12
                        }}
                        whileHover={{ scale: 1.5 }}
                      />
                      
                      <p className="text-sm md:text-base leading-relaxed">
                        {item.highlight ? (
                          <>
                            {item.text}
                            <span 
                              style={{ 
                                color: item.color,
                                fontWeight: 700
                              }}
                            >
                              {item.highlight}
                            </span>
                            {item.suffix || ""}
                          </>
                        ) : (
                          <span style={{ color: item.color }}>
                            {item.text}
                          </span>
                        )}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* From Viral Clips to Visual Design Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 mb-20"
        >
          <div className="grid md:grid-cols-[380px,1fr] lg:grid-cols-[420px,1fr] gap-8 lg:gap-12 items-start">
            {/* Phone Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center md:justify-start"
            >
              <motion.img
                src={phoneImage}
                alt="TikTok profile showing viral content"
                className="w-auto h-auto"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
                animate={{
                  rotate: [0, -3, 3, -2, 2, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl" style={{ fontWeight: 700 }}>
                From Viral Clips to Visual Design
              </h3>
              
              <p className="text-lg md:text-xl leading-relaxed">
                I'm someone who turns digital obsessions into real creative work. My path into video editing didn't start in a classroom. It started with recording games like Baldur's Gate 3, endless hours of recording wild story moments, and a TikTok account that accidentally went viral. Those edits proved I had the instinct, the timing, and the eye to make something people wanted to watch. That audience turned into paid gigs, and that hobby became a career.
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                Whether I'm acting as the Support Main on a design team or bringing Grand Master energy to a solo project, I attack every frame with the same competitive drive I bring to games. I don't half-ass anything. Gold doesn't happen overnight. Every skill I have is XP I earned the long way.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* View Awards Button - NOW HERE AFTER ALL TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-12 mb-20 relative"
        >
          {/* Confetti Doodles */}
          {showConfetti && (
            <>
              {/* Star confetti */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 150 + Math.random() * 100;
                return (
                  <motion.svg
                    key={`star-${i}`}
                    className="absolute w-6 h-6 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 20, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 20, Math.sin(angle) * distance],
                      scale: [0, 1, 0.5],
                      rotate: [0, Math.random() * 720 - 360],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <path
                      d="M12 2 L14 9 L21 9 L15.5 13.5 L18 21 L12 16 L6 21 L8.5 13.5 L3 9 L10 9 Z"
                      fill={["#FF1493", "#20B2AA", "#f7991c", "#6867ae"][i % 4]}
                      fillOpacity="0.8"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}
              
              {/* Circle confetti */}
              {[...Array(6)].map((_, i) => {
                const angle = ((i / 6) * Math.PI * 2) + Math.PI / 6;
                const distance = 120 + Math.random() * 80;
                return (
                  <motion.svg
                    key={`circle-${i}`}
                    className="absolute w-5 h-5 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 15, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 15, Math.sin(angle) * distance],
                      scale: [0, 1, 0.3],
                    }}
                    transition={{
                      duration: 0.9,
                      ease: "easeOut",
                      delay: i * 0.05,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="6"
                      fill={["#FF1493", "#20B2AA", "#f7991c", "#6867ae", "#6fd4fd"][i % 5]}
                      fillOpacity="0.7"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}

              {/* Squiggle/scribble confetti */}
              {[...Array(5)].map((_, i) => {
                const angle = ((i / 5) * Math.PI * 2) + Math.PI / 10;
                const distance = 140 + Math.random() * 90;
                return (
                  <motion.svg
                    key={`squiggle-${i}`}
                    className="absolute w-10 h-10 pointer-events-none"
                    viewBox="0 0 40 40"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 25, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 25, Math.sin(angle) * distance],
                      scale: [0, 1.2, 0.4],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: i * 0.03,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <path
                      d="M10,20 Q15,10 20,20 T30,20"
                      fill="none"
                      stroke={["#FF1493", "#20B2AA", "#f7991c", "#6867ae", "#6fd4fd"][i % 5]}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}

              {/* Triangle/arrow confetti */}
              {[...Array(4)].map((_, i) => {
                const angle = ((i / 4) * Math.PI * 2) + Math.PI / 8;
                const distance = 130 + Math.random() * 85;
                return (
                  <motion.svg
                    key={`triangle-${i}`}
                    className="absolute w-6 h-6 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 18, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 18, Math.sin(angle) * distance],
                      scale: [0, 1.1, 0.4],
                      rotate: [0, Math.random() * 540 - 270],
                    }}
                    transition={{
                      duration: 0.85,
                      ease: "easeOut",
                      delay: i * 0.04,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <polygon
                      points="12,4 20,20 4,20"
                      fill={["#FF1493", "#f7991c", "#6867ae", "#20B2AA"][i % 4]}
                      fillOpacity="0.75"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}

              {/* Heart confetti */}
              {[...Array(3)].map((_, i) => {
                const angle = ((i / 3) * Math.PI * 2) + Math.PI / 4;
                const distance = 145 + Math.random() * 95;
                return (
                  <motion.svg
                    key={`heart-${i}`}
                    className="absolute w-5 h-5 pointer-events-none"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [Math.cos(angle) * 22, Math.cos(angle) * distance],
                      y: [Math.sin(angle) * 22, Math.sin(angle) * distance],
                      scale: [0, 1, 0.3],
                      rotate: [0, Math.random() * 180 - 90],
                    }}
                    transition={{
                      duration: 0.95,
                      ease: "easeOut",
                      delay: i * 0.06,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={["#FF1493", "#f7991c", "#6fd4fd"][i % 3]}
                      fillOpacity="0.8"
                      style={{ filter: "url(#sketch)" }}
                    />
                  </motion.svg>
                );
              })}
            </>
          )}

          <motion.button
            onClick={handleAwardsClick}
            whileHover={{ scale: 1.05, rotate: showAwards ? 0 : -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: showAwards ? "#FF1493" : "#000000",
              rotate: showAwards ? 0 : [0, -3, 3, -3, 3, 0],
            }}
            transition={{ 
              backgroundColor: { duration: 0.3 },
              rotate: showAwards ? { duration: 0 } : {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4.5,
                ease: "easeInOut"
              }
            }}
            className="px-8 py-4 text-white rounded-full flex items-center gap-3 relative group overflow-visible"
          >
            {/* Glow effect on hover */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              style={{
                background: "radial-gradient(circle, rgba(255,20,147,0.6) 0%, rgba(247,153,28,0.5) 50%, rgba(255,223,0,0.4) 100%)",
                transform: "scale(1.3)",
                pointerEvents: "none",
              }}
            />
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-md"
              style={{
                background: "radial-gradient(circle, rgba(255,20,147,0.4) 0%, rgba(247,153,28,0.3) 70%, rgba(255,223,0,0.2) 100%)",
                transform: "scale(1.15)",
                pointerEvents: "none",
              }}
            />

            {/* Doodle star icon */}
            <svg 
              className="w-6 h-6 relative z-10" 
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2 L14 9 L21 9 L15.5 13.5 L18 21 L12 16 L6 21 L8.5 13.5 L3 9 L10 9 Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                style={{ filter: "url(#sketch)" }}
              />
            </svg>
            <span className="relative z-10" style={{ fontWeight: 600 }}>
              {showAwards ? "End Scene" : "Highlight Reel"}
            </span>
          </motion.button>
        </motion.div>

        {/* Auto-scrolling gallery */}
        <AutoScrollGallery />

        {/* Decorative elements */}
        <motion.div
          className="fixed bottom-20 right-10 pointer-events-none opacity-20"
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, #FF1493 0%, transparent 70%)",
              filter: "blur(30px)"
            }}
          />
        </motion.div>
      </div>
    </div>
    </>
  );
}