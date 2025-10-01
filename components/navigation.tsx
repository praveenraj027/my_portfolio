"use client"

import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-mono font-bold text-foreground hover:text-accent transition-colors"
            >
              {"<Praveen Rajak />"}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-accent"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-accent"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="bg-white/10"
            >
              <Link href="/resume.pdf" className="flex items-center">
                Resume
                <FileText className="ml-1"/>
              </Link>
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-2 text-base font-medium w-full text-left transition-colors text-muted-foreground hover:text-accent"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium w-full text-left transition-colors text-muted-foreground hover:text-accent"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
