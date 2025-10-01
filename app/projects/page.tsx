"use client"
import { Projects } from "@/components/projects-2";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation"

export default function ProjectsPage() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <Projects />
            <Footer />
        </div>

    );
}