import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Mic, Heart, ExternalLink, Github, Group } from "lucide-react"

const activities = [
  {
    title: "AIALCHEMIST",
    icon: BookOpen,
    description:
      "UI and technical lead for AIALCHEMIST, a student organization focused on AI and web development.",
    links: [{ label: "Link", url: "https://www.linkedin.com/company/aialchemistorgs"}],
  },
  {
    title: "HackWithIndia GGITS Chapter",
    icon: Group,
    description: "Vice President of HackWithIndia GGITS Chapter, organizing hackathons and coding events for students.",
    links: [
      { label: "Link", url: "https://www.linkedin.com/company/hackwithindia/"}
    ],
  },
  {
    title: "Code Anyways",
    icon: Mic,
    description: "First ever vibe coding competition in GGITS, with 100+ participants solving problems in a fun and engaging way.",
    links: [{ label: "Link", url: "https://www.linkedin.com/company/aialchemistorgs" }],
  },
]

export function Extracurriculars() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Community & Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Contributing to the developer community through open source, mentoring, and knowledge sharing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <Card
                key={index}
                className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg group-hover:text-accent transition-colors">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <IconComponent className="h-5 w-5 text-accent" />
                    </div>
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {activity.links.map((link, i) => (
                        <Button key={i} size="sm" variant="outline" asChild className="text-xs bg-transparent hover:text-gray-400">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {link.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
