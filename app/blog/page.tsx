"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ParallaxSection from "@/components/animations/parallax-section"
import TiltCard from "@/components/animations/tilt-card"

// Blog posts data - in a real app, this would come from a database
const posts = [
  {
    id: "1",
    title: "Modern Front-end Architecture Patterns",
    excerpt: "Exploring the latest architecture patterns in front-end development",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Architecture", "Front-end", "React", "Design Patterns"],
    date: "2023-12-15",
    slug: "modern-frontend-architecture",
  },
  {
    id: "2",
    title: "Integrating AI in Web Applications",
    excerpt: "How to leverage AI capabilities in your web applications",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["AI", "Web Development", "API", "OpenAI"],
    date: "2023-11-28",
    slug: "ai-in-web-applications",
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    excerpt: "Tips and tricks to improve your React application's performance",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    date: "2023-11-10",
    slug: "optimizing-react-performance",
  },
  {
    id: "4",
    title: "The Future of CSS: What's Coming in 2024",
    excerpt: "Exploring upcoming CSS features and how they will change web development",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["CSS", "Web Development", "Frontend"],
    date: "2023-10-25",
    slug: "future-of-css-2024",
  },
  {
    id: "5",
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating inclusive and accessible web experiences",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Accessibility", "Web Development", "HTML", "ARIA"],
    date: "2023-10-12",
    slug: "building-accessible-web-applications",
  },
  {
    id: "6",
    title: "Getting Started with TypeScript in 2024",
    excerpt: "A comprehensive guide to TypeScript for JavaScript developers",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    date: "2023-09-30",
    slug: "getting-started-with-typescript-2024",
  },
]

export default function BlogPage() {
  const { language } = useLanguage()
  const postsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = postsRef.current
    if (!container) return

    // Create a staggered animation for the blog post cards
    const cards = container.querySelectorAll(".blog-card")

    gsap.set(cards, { y: 50, opacity: 0 })

    ScrollTrigger.batch(cards, {
      interval: 0.1, // time window (in seconds) for batching to occur
      batchMax: 3, // maximum batch size (targets)
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        }),
      start: "top 85%",
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <ParallaxSection className="py-12 md:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{language === "fa" ? "وبلاگ" : "Blog"}</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {language === "fa"
                ? "مقالات آموزشی و تخصصی در زمینه فرانت اند و هوش مصنوعی"
                : "Educational and specialized content on front-end development and AI"}
            </p>
          </div>
        </div>
      </ParallaxSection>

      <div className="container px-4 md:px-6 py-12">
        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="blog-card">
              <TiltCard className="h-full" tiltMaxAngleX={5} tiltMaxAngleY={5} glareOpacity={0.15}>
                <Card className="overflow-hidden h-full flex flex-col bg-transparent">
                  <div className="aspect-video overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                        width={400}
                        height={300}
                      />
                    </Link>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="space-y-2 flex-grow">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-2xl font-bold hover:text-primary transition-colors">{post.title}</h2>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3}</Badge>}
                      </div>
                    </div>
                    <Button variant="link" className="p-0 mt-4 self-start" asChild>
                      <Link href={`/blog/${post.slug}`}>{language === "fa" ? "ادامه مطلب" : "Read More"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
