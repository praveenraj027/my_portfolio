"use client"
import { About } from "@/components/about-2";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <About />
            <Footer />
        </div>

    );
}