"use client"
import ProjectCard from "@/components/project-card"
import { useLanguage } from "@/context/language-context"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ParallaxSection from "@/components/animations/parallax-section"

// Projects data - in a real app, this would come from a database
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js and Tailwind CSS",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://project1.com",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered content generator using OpenAI's GPT models",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "OpenAI", "Express"],
    githubUrl: "https://github.com/username/project2",
    liveUrl: "https://project2.com",
  },
  {
    id: "3",
    title: "Dashboard UI Kit",
    description: "A comprehensive dashboard UI kit with reusable components",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Tailwind CSS", "Figma", "TypeScript"],
    githubUrl: "https://github.com/username/project3",
    liveUrl: "https://project3.com",
  },
  {
    id: "4",
    title: "Social Media App",
    description: "A social media application with real-time messaging and notifications",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Firebase", "Socket.io", "Redux"],
    githubUrl: "https://github.com/username/project4",
    liveUrl: "https://project4.com",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "A responsive portfolio website for a photographer",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    githubUrl: "https://github.com/username/project5",
    liveUrl: "https://project5.com",
  },
  {
    id: "6",
    title: "Task Management System",
    description: "A task management system with drag-and-drop functionality",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "TypeScript", "React DnD", "Redux"],
    githubUrl: "https://github.com/username/project6",
    liveUrl: "https://project6.com",
  },
]

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = projectsRef.current
    if (!container) return

    // Create a staggered animation for the project cards
    const cards = container.querySelectorAll(".project-card")

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
      <ParallaxSection className="py-12 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {language === "fa" ? "پروژه های من" : "My Projects"}
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {language === "fa"
                ? "نمونه کارهای من در زمینه طراحی و توسعه وب"
                : "My portfolio of web design and development projects"}
            </p>
          </div>
        </div>
      </ParallaxSection>

      <div className="container px-4 md:px-6 py-12">
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
