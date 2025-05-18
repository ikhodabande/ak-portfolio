"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import ScrollReveal from "@/components/animations/scroll-reveal"

// This would come from your database in a real app
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js and Tailwind CSS",
    fullDescription: `
      This e-commerce platform provides a complete solution for online stores. It includes product listings, 
      shopping cart functionality, user authentication, payment processing, and an admin dashboard for managing products and orders.
      
      The frontend is built with Next.js and Tailwind CSS, providing a fast and responsive user experience. 
      The backend uses Node.js with Express and MongoDB for data storage.
      
      Key features include:
      - Responsive design for all devices
      - Product search and filtering
      - User authentication and profiles
      - Shopping cart and checkout process
      - Payment processing with Stripe
      - Admin dashboard for product and order management
      - Order tracking and history
    `,
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://project1.com",
    date: "2023-12-15",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered content generator using OpenAI's GPT models",
    fullDescription: `
      This AI content generator leverages OpenAI's GPT models to create high-quality content for various purposes.
      Users can generate blog posts, product descriptions, social media content, and more with just a few clicks.
      
      The application is built with React for the frontend and Node.js for the backend. It integrates with OpenAI's API
      to generate content based on user prompts and preferences.
      
      Key features include:
      - Multiple content types (blog posts, product descriptions, etc.)
      - Customizable tone and style
      - Content editing and refinement
      - Export to various formats (Markdown, HTML, etc.)
      - User accounts to save and manage generated content
      - Usage analytics and history
    `,
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React", "Node.js", "OpenAI", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/username/project2",
    liveUrl: "https://project2.com",
    date: "2023-11-28",
  },
  {
    id: "3",
    title: "Dashboard UI Kit",
    description: "A comprehensive dashboard UI kit with reusable components",
    fullDescription: `
      This dashboard UI kit provides a collection of reusable components for building modern admin dashboards and control panels.
      It includes various UI elements, charts, tables, forms, and layouts that can be easily customized and integrated into any project.
      
      The UI kit is built with React and Tailwind CSS, making it highly customizable and easy to use. It also includes
      TypeScript support for better type safety and developer experience.
      
      Key features include:
      - 50+ reusable components
      - 10 pre-built dashboard layouts
      - Responsive design for all screen sizes
      - Dark and light mode support
      - Interactive charts and data visualization
      - Form components with validation
      - Table components with sorting and filtering
      - Authentication screens (login, register, etc.)
    `,
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React", "Tailwind CSS", "Figma", "TypeScript", "Storybook"],
    githubUrl: "https://github.com/username/project3",
    liveUrl: "https://project3.com",
    date: "2023-11-10",
  },
]

export default function ProjectPage() {
  const { id } = useParams()
  const { language } = useLanguage()

  // Find the project with the matching ID
  const project = projects.find((p) => p.id === id)

  // If project not found, show error message
  if (!project) {
    return (
      <div className="container px-4 md:px-6 py-12 md:py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{language === "fa" ? "پروژه یافت نشد" : "Project Not Found"}</h1>
        <p className="mb-6">
          {language === "fa"
            ? "متأسفانه پروژه مورد نظر شما یافت نشد."
            : "Sorry, the project you're looking for doesn't exist."}
        </p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "fa" ? "بازگشت به پروژه ها" : "Back to Projects"}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "fa" ? "بازگشت به پروژه ها" : "Back to Projects"}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

            <div className="flex items-center text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(project.date).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")}</span>
            </div>

            <div className="mb-6">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              {project.fullDescription.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {project.images.map((image, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="bg-card rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">{language === "fa" ? "جزئیات پروژه" : "Project Details"}</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-500">{language === "fa" ? "تاریخ" : "Date"}</h4>
                  <p>{new Date(project.date).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-500">{language === "fa" ? "تکنولوژی ها" : "Technologies"}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {project.liveUrl && (
                  <Button className="w-full" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "fa" ? "مشاهده نسخه زنده" : "View Live Demo"}
                    </a>
                  </Button>
                )}

                {project.githubUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {language === "fa" ? "مشاهده کد در گیت‌هاب" : "View Code on GitHub"}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{language === "fa" ? "پروژه های مشابه" : "Similar Projects"}</h3>

              <div className="space-y-4">
                {projects
                  .filter((p) => p.id !== project.id)
                  .slice(0, 2)
                  .map((relatedProject) => (
                    <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`} className="block group">
                      <div className="flex items-start gap-3">
                        <img
                          src={relatedProject.image || "/placeholder.svg"}
                          alt={relatedProject.title}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {relatedProject.title}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{relatedProject.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
