"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Folder, Star, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

const projects = [
  {
    title: "AlgoVisualizer",
    description:
      "A web app to visualize data structures and algorithms with interactive controls, animations and real-time performance metrics.",
    image: "/algovisualizer.png",
    tags: ["HTML", "JavaScript", "Django", "MySQL", "Tailwind"],
    category: "Web App",
    github: "https://github.com/Team-Vasiliades/ALGOVisualizer",
    demo: "https://algovisualizer.pythonanywhere.com",
    featured: true,
  },
  {
    title: "ArtMart",
    description:
      "An AI-powered platform that connects artists with buyers, offering personalized art recommendations and seamless transactions.",
    image: "/artmart.png",
    tags: ["HTML", "Django", "Node.js", "MySQL", "OpenAI"],
    category: "AI/ML",
    github: "https://github.com/saymanlal/ArtMart",
    demo: "https://artmart-9t6q.onrender.com",
    featured: true,
  },
  {
    title: "VoteX",
    description:
      "An online voting platform ensuring secure, transparent elections with real-time results and user-friendly interface.",
    image: "/",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    category: "Web App",
    github: "https://github.com/Team-Vasiliades/VoteX",
    featured: false,
  },
  {
    title: "DekhoNews",
    description:
      "A news aggregation platform delivering personalized news feeds, real-time updates, and multimedia content.",
    image: "/",
    tags: ["React.js", "NewsAPI", "Framer Motions", "Node.js"],
    category: "Backend",
    github: "https://github.com/praveenraj027/NewsApp",
    featured: false,
  },
  {
    title: "Weather App",
    description:
      "A sleek weather application providing real-time forecasts, interactive maps, and personalized alerts.",
    image: "/modern-chat-app.png",
    tags: ["OpenWeatherAPI", "Tailwind", "JavaScript", "HTML"],
    category: "Web App",
    github: "https://github.com/praveenraj027/Weather-App",
    featured: false,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Motion Gradient */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#4f46e5_0%,transparent_70%)] opacity-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex justify-center items-center gap-2">
            Featured Projects
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="text-accent w-6 h-6" />
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, from full-stack applications to open-source contributions
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mb-20"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" /> Featured Work
          </h3>
          <div className="grid lg:grid-cols-2 gap-10">
            {projects
              .filter((p) => p.featured)
              .map((project, i) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: 10 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8 } },
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="relative"
                >
                  <Card className="group border-border/50 bg-card/40 backdrop-blur-lg hover:bg-card/60 transition-all duration-500 shadow-lg hover:shadow-accent/20 overflow-hidden">
                    {/* Hover Glow Border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-accent/50 transition-all duration-300"
                      animate={{
                        boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 20px rgba(99,102,241,0.4)", "0 0 0px rgba(0,0,0,0)"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Image */}
                    <div className="overflow-hidden aspect-video">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {project.category}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Button size="sm" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
            <Folder className="h-5 w-5 text-accent" />
            Other Projects
          </h3>
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="group border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 hover:shadow-accent/20">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {project.title}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        <motion.div whileHover={{ rotate: 10 }}>
                          <Github className="h-4 w-4 text-muted-foreground hover:text-accent" />
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="outline" size="lg" asChild className="hover:text-gray-400">
            <a href="https://github.com/praveenraj027" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
