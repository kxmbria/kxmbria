import { motion } from "motion/react";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import profileImage from "figma:asset/817ec5cfd8da64249eb784b7f807e3828331d0c8.png";
import letsConnectImage from "figma:asset/528baeb77c141b8b8547a96a0edbe0a74fed5e29.png";

interface ContactProps {
  onNavigateToAbout?: () => void;
}

export function Contact({ onNavigateToAbout }: ContactProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Use fallback method that works without clipboard permissions
      const textArea = document.createElement("textarea");
      textArea.value = "kxmbria@gmail.com";
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (successful) {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const title = "Let's Connect";

  return (
    <section className="py-20 px-6 relative">
      {/* Playful background elements */}
      <svg className="absolute top-20 right-20 w-24 h-24 opacity-10" viewBox="0 0 100 100">
        <motion.path
          d="M 50 10 L 61 35 L 90 35 L 68 54 L 79 79 L 50 60 L 21 79 L 32 54 L 10 35 L 39 35 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-primary"
          style={{ filter: "url(#sketch)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {isMobile ? (
            <div className="mb-6 flex justify-center">
              <img 
                src={letsConnectImage}
                alt="Let's Connect" 
                className="w-64 h-auto max-w-full"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : (
            <h2 className="text-4xl md:text-5xl mb-6 relative inline-block" style={{ fontFamily: "'Cowkids', cursive" }}>
              {title.split('').map((letter, index) => (
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
              {/* Hand-drawn underline - teal/secondary color */}
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10">
                <motion.path
                  d="M 0 5 Q 50 2, 100 5 T 200 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-secondary"
                  style={{ filter: "url(#roughen)" }}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>
            </h2>
          )}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 relative grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Right column - Profile Image (appears first on mobile, second on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center md:justify-end order-1 md:order-2"
          >
            <motion.a
              href="#about"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToAbout?.();
              }}
            >
              <motion.img 
                src={profileImage} 
                alt="Kxmbria profile illustration" 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.a>
          </motion.div>

          {/* Left column - Links (appears second on mobile, first on desktop) */}
          <div className="flex flex-col items-start order-2 md:order-1">
          {/* Copied notification */}
          {showCopied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg relative"
            >
              {/* Hand-drawn border */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ left: 0, top: 0 }}
              >
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4)"
                  height="calc(100% - 4)"
                  rx="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary-foreground"
                  style={{ filter: "url(#sketch)" }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="relative z-10">Email copied! ✓</span>
            </motion.div>
          )}

          <motion.button
            onClick={copyEmailToClipboard}
            whileHover={{ scale: 1.03, rotate: -1 }}
            className="p-6 flex items-start gap-4 transition-colors relative group cursor-pointer text-left max-w-md"
          >
            {/* Sharpie effect on hover - OUTSIDE edge only */}
            <svg
              className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: '-4px', top: '-4px' }}
            >
              <rect
                x="6"
                y="6"
                width="calc(100% - 12)"
                height="calc(100% - 12)"
                rx="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
                style={{ filter: "url(#sketch)" }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 relative z-10">
              <Mail className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg mb-1">Email Me</h3>
              <p className="text-muted-foreground">kxmbria@gmail.com</p>
            </div>
          </motion.button>

          <motion.a
            href="https://www.instagram.com/kxmbria.design/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="p-6 flex items-start gap-4 transition-colors relative group cursor-pointer text-left max-w-md no-underline"
          >
            {/* Sharpie effect on hover - OUTSIDE edge only */}
            <svg
              className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: '-4px', top: '-4px' }}
            >
              <rect
                x="6"
                y="6"
                width="calc(100% - 12)"
                height="calc(100% - 12)"
                rx="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-secondary"
                style={{ filter: "url(#sketch)" }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 relative z-10">
              <Instagram className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base md:text-lg mb-1">See what I'm up to</h3>
              <p className="text-muted-foreground">@kxmbria.design</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/kxmbria/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="p-6 flex items-start gap-4 transition-colors relative group cursor-pointer text-left max-w-md no-underline"
          >
            {/* Sharpie effect on hover - OUTSIDE edge only */}
            <svg
              className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: '-4px', top: '-4px' }}
            >
              <rect
                x="6"
                y="6"
                width="calc(100% - 12)"
                height="calc(100% - 12)"
                rx="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{ filter: "url(#sketch)", color: "#6fd4fd" }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10" style={{ backgroundColor: "rgba(111, 212, 253, 0.1)", color: "#6fd4fd" }}>
              <Linkedin className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-base md:text-lg mb-1">Link Together</h3>
              <p className="text-muted-foreground">@kxmbria</p>
            </div>
          </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 KXMBRIA. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}