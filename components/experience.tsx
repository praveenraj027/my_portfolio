"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    company: "Nuvance Technologies",
    position: "Frontend Engineer, Accessibility",
    location: "Remote",
    period: "Aug 2025 — Present",
    description:
      "Working as a Frontend Developer where I developed the complete frontend for two real world projects in which one was a rental e-commerce website, building responsive user interfaces.",
    achievements: [
      "Built complete UI of e-commerce platform",
      "Built reusable component library",
      "Got a very good experience in Git and GitHub",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    website: "https://www.linkedin.com/company/nuvance-technologies",
  },
  {
    company: "Team Vasiliades",
    position: "Frontend Developer",
    location: "Remote/Onsite",
    period: "Dec 2024 — Present",
    description:
      "Developed and maintained multiple projects including AlgoVisualizer and VoteX, focusing on creating interactive and user-friendly interfaces using React and Next.js.",
    achievements: [
      "Won 2nd place in Genethon Hackathon for AlgoVisualizer",
      "Top 10 in BrahmX Hackathon for VoteX",
      "Selected for Code Nakshatra 2025 Hackathon for ArtMart",
    ],
    technologies: ["Next.js", "Node.js", "React.js", "TailwindCSS"],
    website: "https://www.linkedin.com/company/teamvasiliades",
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/20"
    >
      {/* Background Motion Gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex justify-center items-center gap-2">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            My professional journey building software across different industries and company sizes
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="border-border/50 bg-card/40 backdrop-blur-lg transition-all duration-500 overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground mb-2">{exp.position}</CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-accent font-medium mb-2"
                      >
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </motion.div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <motion.div whileHover={{ rotate: 15 }} className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {exp.period}
                        </motion.div>
                        <motion.div whileHover={{ rotate: 15 }} className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {exp.description}
                  </motion.p>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"
                            animate={{ scale: [0.8, 1.2, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <motion.div
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="inline-block"
                        >
                          <Badge variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resume Download */}
        <motion.div
          className="text-center mt-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
