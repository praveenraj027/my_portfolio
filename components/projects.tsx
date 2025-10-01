import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Folder, Star } from "lucide-react"
import Image from "next/image"

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
    // demo: "https://portfolio-template.alexchen.dev",
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
    // demo: "https://api-docs.alexchen.dev",
    featured: false,
  },
  {
    title: "Weather App",
    description:
      "A sleek weather application providing real-time forecasts, interactive maps, and personalized alerts.",
    image: "/modern-chat-app.png",
    tags: ["OpenWeatherAPI", "Taiwind", "JavaScript", "HTML"],
    category: "Web App",
    github: "https://github.com/praveenraj027/Weather-App",
    // demo: "https://chat.alexchen.dev",
    featured: false,
  },
]

const categories = ["All", "Web App", "AI/ML", "Open Source", "Backend", "Data Viz"]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A showcase of my recent work, from full-stack applications to open-source contributions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Featured Work
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <Card
                  key={project.title}
                  className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden"
                >
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
                      <div>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
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
                      <Button size="sm" variant="outline" asChild className="hover:text-gray-400">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
            <Folder className="h-5 w-5 text-accent" />
            Other Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project) => (
                <Card
                  key={project.title}
                  className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-accent transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {project.category}
                        </Badge>
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
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-1">
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
              ))}
          </div>
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="hover:text-gray-400">
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
