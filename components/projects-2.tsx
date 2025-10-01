"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "AlgoVisualizer",
    description:
      "A web app to visualize data structures and algorithms with interactive controls, animations and real-time performance metrics.",
    image: "/algovisualizer.png",
    tags: ["HTML", "JavaScript", "Django", "MySQL", "Tailwind"],
    category: "Web App",
    type: ["team", "hackathon"],
    github: "https://github.com/Team-Vasiliades/ALGOVisualizer",
    demo: "https://algovisualizer.pythonanywhere.com",
  },
  {
    title: "ArtMart",
    description:
      "An AI-powered platform that connects artists with buyers, offering personalized art recommendations and seamless transactions.",
    image: "/artmart.png",
    tags: ["HTML", "Django", "Node.js", "MySQL", "OpenAI"],
    category: "AI/ML",
    type: ["hackathon", "team"],
    github: "https://github.com/saymanlal/ArtMart",
    demo: "https://artmart-9t6q.onrender.com",
  },
  {
    title: "VoteX",
    description:
      "An online voting platform ensuring secure, transparent elections with real-time results and user-friendly interface.",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    category: "Web App",
    type: "team",
    github: "https://github.com/Team-Vasiliades/VoteX",
  },
  {
    title: "DekhoNews",
    description:
      "A news aggregation platform delivering personalized news feeds, real-time updates, and multimedia content.",
    image: "/dekhonews.png",
    tags: ["React.js", "NewsAPI", "Framer Motions", "Node.js"],
    category: "Backend",
    type: ["personal"],
    github: "https://github.com/praveenraj027/NewsApp",
  },
  {
    title: "Weather App",
    description:
      "A sleek weather application providing real-time forecasts, interactive maps, and personalized alerts.",
    image: "/data-visualization-dashboard.png",
    tags: ["OpenWeatherAPI", "Tailwind", "JavaScript", "HTML"],
    category: "Web App",
    type: "personal",
    github: "https://github.com/praveenraj027/Weather-App",
  },
]

const filters = ["All", "Personal", "Team", "Hackathon"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          typeof p.type === "string"
            ? p.type.toLowerCase() === activeFilter.toLowerCase()
            : Array.isArray(p.type) &&
              p.type.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
        )

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through my personal, team, and hackathon projects
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)} className="hover:text-gray-400 cursor-pointer"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.title}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {project.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/praveenraj027" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
