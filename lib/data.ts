"use client"

// Mock data store - in production, this would be replaced with actual API calls

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  category: string
  github: string
  live: string
  featured: boolean
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
  published: boolean
  status: "published" | "draft"
  createdAt: string
  updatedAt: string
}

// Mock data
const projects: Project[] = [
  {
    id: "1",
    title: "Visitori PWA",
    description:
      "A comprehensive visitor management system built as a Progressive Web App with real-time notifications and offline capabilities.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "PWA", "TypeScript", "Tailwind", "Firebase"],
    category: "Full Stack",
    github: "#",
    live: "#",
    featured: true,
    status: "published",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Store PWA",
    description:
      "Modern e-commerce Progressive Web App with advanced features like offline browsing, push notifications, and seamless checkout.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Next.js", "PWA", "Stripe", "MongoDB", "Redis"],
    category: "Full Stack",
    github: "#",
    live: "#",
    featured: true,
    status: "published",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
]

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Responsive Layouts with CSS Grid",
    excerpt: "Learn how to create complex, responsive layouts using CSS Grid and modern techniques.",
    content: "<h2>Introduction</h2><p>CSS Grid is a powerful layout system...</p>",
    image: "/placeholder.svg?height=200&width=400",
    author: "امیرمحمد خدابنده",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["CSS", "Web Design", "Frontend"],
    category: "CSS",
    featured: true,
    published: true,
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
]

// Project CRUD operations
export const ProjectService = {
  getAll: (): Project[] => projects,

  getById: (id: string): Project | undefined => projects.find((p) => p.id === id),

  create: (project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    projects.push(newProject)
    return newProject
  },

  update: (id: string, updates: Partial<Project>): Project | null => {
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return projects[index]
  },

  delete: (id: string): boolean => {
    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return false

    projects.splice(index, 1)
    return true
  },
}

// Blog Post CRUD operations
export const BlogService = {
  getAll: (): BlogPost[] => blogPosts,

  getById: (id: string): BlogPost | undefined => blogPosts.find((p) => p.id === id),

  create: (post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    blogPosts.push(newPost)
    return newPost
  },

  update: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const index = blogPosts.findIndex((p) => p.id === id)
    if (index === -1) return null

    blogPosts[index] = {
      ...blogPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return blogPosts[index]
  },

  delete: (id: string): boolean => {
    const index = blogPosts.findIndex((p) => p.id === id)
    if (index === -1) return false

    blogPosts.splice(index, 1)
    return true
  },
}
