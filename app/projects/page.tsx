"use client"

import { useState, useMemo, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { LazyImage } from "@/components/optimized/lazy-image"
import { ProjectCardSkeleton } from "@/components/loading/card-skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { useAsync } from "@/hooks/use-async"
import { FadeInUp, StaggeredChildren } from "@/components/animations/text-animations"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind", "Prisma"],
    category: "Full Stack",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team collaboration, and project tracking.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed analytics.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Vue.js", "API Integration", "Chart.js", "CSS3"],
    category: "Frontend",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Responsive portfolio website with blog functionality, contact forms, and admin dashboard.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Next.js", "Tailwind", "MDX", "Vercel"],
    category: "Frontend",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media App",
    description: "Social media platform with real-time messaging, post sharing, and user profiles.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React Native", "Firebase", "Redux", "Expo"],
    category: "Mobile",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Educational platform with course management, video streaming, and progress tracking.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    category: "Full Stack",
    github: "#",
    live: "#",
    featured: false,
  },
]

const categories = ["All", "Frontend", "Full Stack", "Mobile"]

// Simulate async data fetching
const fetchProjects = async (): Promise<typeof projects> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return projects
}

function ProjectsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const { data: projectsData, loading, error } = useAsync(fetchProjects, [])

  const filteredProjects = useMemo(() => {
    if (!projectsData) return []

    return projectsData.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.tech.some((tech) => tech.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [projectsData, debouncedSearchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-pulse" />
            <div className="flex gap-2">
              {categories.map((_, index) => (
                <div key={index} className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">My Projects</h1>
          </FadeInUp>
          <FadeInUp delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of projects that showcase my skills in front-end development, full-stack applications, and
              mobile development.
            </p>
          </FadeInUp>
        </div>

        {/* Filters */}
        <FadeInUp delay={400}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap transition-all duration-200 hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Projects Grid */}
        <StaggeredChildren staggerDelay={100}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={project.github} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.live} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </Link>
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs transition-all hover:scale-105">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredChildren>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectCardSkeleton />}>
      <ProjectsContent />
    </Suspense>
  )
}
