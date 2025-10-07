"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Database,
  Globe,
  Server,
  Network,
  Layers,
  Braces,
  Cpu,
  TerminalSquare,
  Circle,
} from "lucide-react"

const techStack = [
  { name: 'JavaScript', category: 'language', icon: Braces, color: "#F7DF1E" },
  { name: 'TypeScript', category: 'language', icon: Code, color: "#3178C6" },
  { name: 'Python', category: 'language', icon: TerminalSquare, color: "#3776AB" },
  { name: 'React', category: 'frontend', icon: Globe, color: "#61DAFB" },
  { name: 'Next.js', category: 'frontend', icon: Layers, color: "#000000" },
  { name: 'Node.js', category: 'backend', icon: Cpu, color: "#68A063" },
  { name: 'Express', category: 'backend', icon: Server, color: "#999999" },
  { name: 'PostgreSQL', category: 'database', icon: Database, color: "#336791" },
  { name: 'MongoDB', category: 'database', icon: Network, color: "#4DB33D" },
]

export function About() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 35)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* 🪩 Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {techStack.map((tech, i) => {
          const Icon = tech.icon
          return (
            <motion.div
              key={i}
              className="absolute opacity-10"
              initial={{
                y: Math.random() * 800,
                x: Math.random() * 800,
                scale: 0.3,
              }}
              animate={{
                y: [Math.random() * 800, Math.random() * 800 - 200],
                x: [Math.random() * 800, Math.random() * 800 + 200],
                scale: [0.4, 0.8, 0.4],
                rotate: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 18 + Math.random() * 8,
                ease: "easeInOut",
              }}
            >
              <Icon size={80} color={tech.color} strokeWidth={1.2} />
            </motion.div>
          )
        })}
      </div>

      {/* 🧠 Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about crafting digital experiences that blend thoughtful design with robust engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 🧍 Bio */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering.
              My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { value: "1.5+", label: "Years Experience" },
                { value: "10+", label: "Projects Built" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.3 }}
                >
                  <div className="text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 💻 Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Card className="border-border/50 bg-card/60 backdrop-blur-md shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technologies I work with
                </h3>

                {/* 🧩 Skill Badges */}
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech, i) => {
                    const Icon = tech.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 px-3 py-1 bg-muted/50 hover:bg-accent/10 hover:scale-105 transition-all cursor-default"
                        >
                          <Icon size={16} color={tech.color} strokeWidth={1.5} />
                          {tech.name}
                        </Badge>
                      </motion.div>
                    )
                  })}
                </div>

                {/* 🔋 Animated Progress Bar */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    Overall Skill Progress
                  </p>
                  <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-3 bg-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut", duration: 2 }}
                    />
                  </div>
                  <p className="text-right text-xs mt-2 text-muted-foreground">
                    {progress}%
                  </p>
                </div>

                {/* 📚 Footer */}
                <div className="mt-6 text-sm text-muted-foreground">
                  In my spare time, I’m usually climbing, reading, hanging out with my family, or hunting for the perfect coffee shop to work from.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
