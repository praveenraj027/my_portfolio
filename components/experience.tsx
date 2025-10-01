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
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            My professional journey building software across different industries and company sizes
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground mb-2">{exp.position}</CardTitle>
                    <div className="flex items-center gap-2 text-accent font-medium mb-2">
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {exp.company}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resume Download */}
        <div className="text-center mt-12">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Resume
          </a>
        </div>
      </div>
    </section>
  )
}
