import { motion } from "motion/react";
import { Trophy, Star, Award, Target } from "lucide-react";

const achievements = [
  {
    icon: <Trophy className="w-12 h-12" />,
    title: "Design Awards",
    count: "15+",
    description: "International design awards won",
    color: "from-primary to-primary/60",
  },
  {
    icon: <Star className="w-12 h-12" />,
    title: "Happy Clients",
    count: "50+",
    description: "Projects delivered successfully",
    color: "from-secondary to-secondary/60",
  },
  {
    icon: <Award className="w-12 h-12" />,
    title: "Publications",
    count: "20+",
    description: "Featured in design magazines",
    color: "from-accent to-accent/60",
  },
  {
    icon: <Target className="w-12 h-12" />,
    title: "Years Experience",
    count: "5+",
    description: "In design and animation",
    color: "from-primary to-secondary",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Milestones that make me proud and keep me motivated
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative bg-card rounded-3xl p-8 shadow-lg border-2 border-border hover:border-primary transition-colors text-center h-full flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`bg-gradient-to-br ${achievement.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}
                >
                  {achievement.icon}
                </motion.div>
                
                <motion.div
                  className="text-5xl mb-2"
                  style={{ fontFamily: "'Cowkids', cursive" }}
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {achievement.count}
                </motion.div>
                
                <h3 className="text-xl mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl max-w-3xl mx-auto text-muted-foreground">
            And many more exciting projects in the pipeline!
          </p>
        </motion.div>
      </div>
    </section>
  );
}