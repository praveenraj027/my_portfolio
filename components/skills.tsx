"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95,},
      { name: "Next.js", level: 90,},
      { name: "TypeScript", level: 90,},
      { name: "Tailwind CSS", level: 95,},
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90,},
      { name: "Python", level: 85,},
      { name: "Express/Fastify", level: 88, },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", level: 85, },
      { name: "MongoDB", level: 80, },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Vercel", level: 95, },
      { name: "Netlify", level: 85, },
      { name: "Render", level: 95, },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git/GitHub", level: 95, },
      { name: "VS Code", level: 95, },
      { name: "Canva", level: 85, },
    ],
  },
]

const certifications = [
  "AWS Certified Developer",
  "Google Cloud Professional",
  "Neo4j Certified Professional",
  "MongoDB Developer",
]

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 overflow-hidden"
    >
      {/* Foreground content */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <AnimatedSkillBar
                      key={skill.name}
                      skill={skill}
                      delay={i * 0.15}
                      trigger={isInView}
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Certifications & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="border-accent/20 text-accent hover:bg-accent/10 transition-colors"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

/* ✅ Animated Skill Bar Component */
function AnimatedSkillBar({
  skill,
  delay,
  trigger,
}: {
  skill: { name: string; level: number }
  delay: number
  trigger: boolean
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
    return () => unsubscribe()
  }, [rounded])

  useEffect(() => {
    if (trigger) {
      const controls = animate(count, skill.level, {
        duration: 1.5,
        delay,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [trigger, count, skill.level, delay])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-xs text-muted-foreground">
          {displayValue}
          {"%"}
        </span>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={trigger ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ delay, duration: 1.5, ease: "easeOut" }}
      >
        <Progress value={100} className="h-2" />
      </motion.div>
    </div>
  )
}
