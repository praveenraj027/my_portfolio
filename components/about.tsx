import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const techStack = [
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
]

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Passionate about crafting digital experiences that blend thoughtful design with robust engineering
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Content */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1.5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technologies I work with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="bg-muted hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    In my spare time, I'm usually climbing, reading, hanging out with my family,
                    or running around searching for the perfect coffee shop to work from.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 
