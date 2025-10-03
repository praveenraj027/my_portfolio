import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, ExternalLink, Github } from "lucide-react"

const hackathons = [
  {
    name: "Genethon - a 24-hour national level hackathon",
    year: "2024",
    location: "Jabalpur, Madhya Pradesh, India",
    project: "AlgoVisualizer",
    description:
      "A web app to visualize data structures and algorithms with interactive controls, animations and real-time performance metrics.",
    outcome: "1st runner up",
    prize: "₹7000",
    technologies: ["Django", "Node.js", "MySQL", "TailwindCSS"],
    github: "https://github.com/Team-Vasiliades/ALGOVisualizer",
    demo: "https://algovisualizer.pythonanywhere.com",
  },
  {
    name: "BrahmX Hackathon",
    year: "2025",
    location: "Jabalpur, Madhya Pradesh, India",
    project: "VoteX",
    description:
      "An online voting platform ensuring secure, transparent elections with real-time results and user-friendly interface.",
    outcome: "Top 10",
    prize: "Certificate & Swags",
    technologies: ["Next.js", "Tailwind", "Blockchain", "JavaScript"],
    github: "https://github.com/Team-Vasiliades/VoteX",
    // demo: "https://vr-classroom.alexchen.dev",
  },
  {
    name: "Code Nakshatra 2025",
    year: "2025",
    location: "Greater Noida, Uttar Pradesh, India",
    project: "ArtMart",
    description:
      "An AI-powered platform that connects artists with buyers, offering personalized art recommendations and seamless transactions.",
    outcome: "Top 10 Finalist",
    prize: "Certificate & Swags",
    technologies: ["Django", "RazorPay", "Tailwind", "JavaScript"],
    github: "https://github.com/saymanlal/ArtMart",
    demo: "https://artmart-9t6q.onrender.com",
  },
  {
    name: "Pears Global Hackathon",
    year: "2024",
    location: "Virtual",
    project: "SkillSync",
    description:
      "A platform connecting freelancers with clients through AI-driven skill matching and project recommendations.",
    outcome: "Top 20",
    prize: "₹1000 Amazon Voucher",
    technologies: ["React.js", "Tailwind", "Django", "MySQL"],
    github: "https://github.com/saymanlal/SkillSync",
    // demo: "https://healthconnect-demo.vercel.app",
  },
]

export function Hackathons() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Hackathons & Competitions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Showcasing innovation and rapid prototyping skills through competitive programming events
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <Card
              key={index}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg group-hover:text-accent transition-colors">
                        {hackathon.name}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {hackathon.year}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {hackathon.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={hackathon.outcome.includes("1st") ? "default" : "secondary"}
                    className={hackathon.outcome.includes("1st") ? "bg-accent text-accent-foreground" : ""}
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    {hackathon.outcome}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Project: {hackathon.project}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{hackathon.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prize:</span>
                  <span className="font-medium text-accent">{hackathon.prize}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" variant="outline" asChild className="hover:text-gray-400">
                    <a href={hackathon.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={hackathon.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
