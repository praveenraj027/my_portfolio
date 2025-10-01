"use client"

import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/praveenraj027" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/praveen-rajak" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/praveen_raj027" },
    { name: "Email", icon: Mail, href: "mailto:praveenrajak0506@gmail.com" },
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-card/50 border-t border-border/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-accent">{"<Praveen Rajak />"}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Full Stack Developer passionate about building accessible, performant web applications that make a
              difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-lg"
                    aria-label={link.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
            <p className="text-muted-foreground text-sm">Open to new opportunities and collaborations</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© {currentYear} Praveen Rajak. All rights reserved.</p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
