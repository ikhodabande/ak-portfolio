import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ExternalLink, Github } from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: "مدیریت پروژه ها",
  description: "مدیریت و ویرایش پروژه های نمونه کار",
}

// Sample projects data - in a real app, this would come from a database
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js and Tailwind CSS",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://project1.com",
    date: "2023-12-15",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered content generator using OpenAI's GPT models",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "OpenAI", "Express"],
    githubUrl: "https://github.com/username/project2",
    liveUrl: "https://project2.com",
    date: "2023-11-28",
  },
  {
    id: "3",
    title: "Dashboard UI Kit",
    description: "A comprehensive dashboard UI kit with reusable components",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Tailwind CSS", "Figma", "TypeScript"],
    githubUrl: "https://github.com/username/project3",
    liveUrl: "https://project3.com",
    date: "2023-11-10",
  },
]

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">پروژه ها</h1>
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              پروژه جدید
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  width={400}
                  height={300}
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    تاریخ: {new Date(project.date).toLocaleDateString("fa-IR")}
                  </p>
                  <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && <Badge variant="outline">+{project.tags.length - 3}</Badge>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/projects/${project.id}/edit`}>
                    <Pencil className="h-4 w-4 mr-2" />
                    ویرایش
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  حذف
                </Button>
                {project.liveUrl && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      نمایش
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
