import { motion, AnimatePresence } from "motion/react";
import { Heart, Palette, Zap, Video, Gamepad2 } from "lucide-react";
import { useState } from "react";

export function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const skills = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design",
      description: "Brand identity, packaging, print & digital design",
      color: "text-primary",
      shadowColor: "rgba(255, 20, 147, 0.08)", // pink with 8% opacity
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Illustration",
      description: "Editorial, character design, and digital illustration",
      color: "text-secondary",
      shadowColor: "rgba(64, 224, 208, 0.08)", // teal with 8% opacity
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Animation",
      description: "Motion graphics, character animation, and visual effects",
      color: "text-primary",
      shadowColor: "rgba(255, 20, 147, 0.08)", // pink with 8% opacity
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Editing",
      description: "Post-production, color grading, and storytelling",
      color: "text-secondary",
      shadowColor: "rgba(64, 224, 208, 0.08)", // teal with 8% opacity
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Game Design",
      description: "UI/UX for games, level design, and interactive experiences",
      color: "text-primary",
      shadowColor: "rgba(255, 20, 147, 0.08)", // pink with 8% opacity
    },
  ];

  const title = "About Me";

  return (
    <section className="py-20 px-6 bg-muted/20 relative">
      {/* Decorative background scribbles - removed the left one */}
      <svg className="absolute bottom-10 right-10 w-32 h-32 opacity-10" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-secondary"
          style={{ filter: "url(#sketch)" }}
        />
      </svg>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10">
              <motion.path
                d="M 0 5 Q 50 2, 100 5 T 200 5"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-primary"
                style={{ filter: "url(#roughen)" }}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-8">
            I'm a multidisciplinary creative who loves bringing ideas to life through design, illustration, and animation. 
            My work is bold, playful, and always made with passion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
              className="relative cursor-pointer"
            >
              <motion.div
                animate={{
                  height: (hoveredIndex === index || clickedIndex === index) ? "auto" : "auto",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-card rounded-xl p-6 border-2 border-border relative overflow-hidden"
                style={{
                  boxShadow: (hoveredIndex === index || clickedIndex === index)
                    ? `0 8px 24px -4px ${skill.shadowColor}`
                    : 'none',
                }}
              >
                {/* Sharpie border on hover/click - OUTSIDE the card */}
                {(hoveredIndex === index || clickedIndex === index) && (
                  <svg
                    className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
                    style={{ left: '-4px', top: '-4px' }}
                  >
                    <motion.rect
                      x="6"
                      y="6"
                      width="calc(100% - 12)"
                      height="calc(100% - 12)"
                      rx="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className={skill.color}
                      style={{ filter: "url(#sketch)" }}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}

                {/* Icon and Title - centered vertically when not hovered */}
                <div className="flex items-center gap-4 relative z-10 justify-center">
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${skill.color}`}
                    animate={{
                      rotate: (hoveredIndex === index || clickedIndex === index) ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-lg">{skill.title}</h3>
                </div>

                {/* Description that appears on hover/click */}
                <AnimatePresence>
                  {(hoveredIndex === index || clickedIndex === index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 mt-4"
                    >
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}