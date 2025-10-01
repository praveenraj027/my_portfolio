"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
];

const education = [
  {
    degree: "B.Tech in Computer Science",
    school: "Gyan Ganga Institute of Technology and Sciences",
    year: "2024 – 2028",
    score: "7.81 CGPA",
  },
  {
    degree: "Class 10th",
    school: "Yash Nursery Higher Secondary School",
    year: "2021 – 2022",
    score: "87.4%",
  },
  {
    degree: "Class 12th",
    school: "Yash Nursery Higher Secondary School",
    year: "2023 – 2024",
    score: "93.2%",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about crafting digital experiences that blend thoughtful
            design with robust engineering
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile + Bio */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-60 h-60 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-lg">
                <Image
                  src="/praveen.jpg"
                  alt="Profile photo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                I'm a developer passionate about crafting accessible,
                pixel-perfect user interfaces that blend thoughtful design with
                robust engineering. My favorite work lies at the intersection of
                design and development, creating experiences that not only look
                great but are meticulously built for performance and usability.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1.5+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Built
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tech + Education */}
          <div className="space-y-8">
            {/* Tech Stack */}
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
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="border-l-2 border-accent pl-4">
                      <p className="font-medium text-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.school}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {edu.year}
                      </p>
                      <p className="text-xs text-gray-300">
                        {edu.score && `Score: ${edu.score}`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
