import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Praveen Rajak - Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, and modern web technologies. Building scalable applications and contributing to open source.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Praveen Rajak" }],
  creator: "Praveen Rajak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://praveenrajak.vercel.app",
    title: "Praveen Rajak - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    siteName: "Praveen Rajak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Rajak - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@praveen_raj027",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
