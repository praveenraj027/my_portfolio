import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Server, Database, Cloud, Wrench, Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "Express/Fastify", level: 88 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Vercel", level: 95 },
      { name: "Netlify", level: 85 },
      { name: "Render", level: 95 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git/GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Canva", level: 85 },
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
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="h-5 w-5 text-accent" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Certifications */}
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
      </div>
    </section>
  )
}
