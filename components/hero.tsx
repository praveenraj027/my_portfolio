"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, FileText, ExternalLink } from "lucide-react"

const roles = ["Full Stack Developer", "Open Source Contributor", "Problem Solver", "Code Architect"]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Name and Title */}
        <div className="mb-6 fade-in-up delay-100">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">Praveen Rajak</h1>
          <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-2 h-12 flex items-center justify-center">
            <span className="font-mono">
              {displayText}
              <span className="animate-pulse text-accent">|</span>
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-8 fade-in-up delay-200">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Building scalable applications, solving complex problems, and shipping clean code. Passionate about creating
            digital experiences that make a difference.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up delay-300">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
            onClick={() => scrollToSection("#projects")}
          >
            View My Work
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-accent/20 px-8 hover:text-gray-500"
            onClick={() => scrollToSection("#contact")}
          >
            <p className="">Get In Touch</p>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 fade-in-up delay-400">
          <a
            href="https://github.com/praveenraj027"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/praveen-rajak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors p-2"
            aria-label="Download Resume"
          >
            <FileText className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
