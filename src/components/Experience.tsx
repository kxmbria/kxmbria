import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Senior Designer",
    company: "Creative Agency",
    period: "2022 - Present",
    description: "Leading design projects for major brands, focusing on bold and playful visual identities",
    color: "bg-primary",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Illustrator & Animator",
    company: "Digital Studio",
    period: "2020 - 2022",
    description: "Created engaging animations and illustrations for social media campaigns and brand content",
    color: "bg-secondary",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Graphic Design",
    company: "Design Institute",
    period: "2018 - 2020",
    description: "Specialized in interactive design, branding, and motion graphics",
    color: "bg-accent",
  },
];

export function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through the creative world, one colorful step at a time
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="relative"
            >
              <div className="flex gap-6 items-start">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`${exp.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                >
                  {exp.icon}
                </motion.div>
                
                <div className="flex-1 bg-card rounded-2xl p-6 shadow-lg border-2 border-border hover:border-primary transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-2xl mb-1">{exp.title}</h3>
                      <p className="text-lg text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
