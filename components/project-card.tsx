"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import TiltCard from "@/components/animations/tilt-card"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <TiltCard className="h-full" tiltMaxAngleX={5} tiltMaxAngleY={5} glareOpacity={0.15}>
      <Card className="overflow-hidden transition-all h-full flex flex-col bg-transparent">
        <Link href={`/projects/${project.id}`} className="overflow-hidden">
          <motion.div
            className="aspect-video overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="object-cover w-full h-full"
              width={400}
              height={300}
            />
          </motion.div>
        </Link>
        <CardContent className="p-6 flex-grow">
          <div className="space-y-2">
            <Link href={`/projects/${project.id}`}>
              <h3 className="text-2xl font-bold hover:text-primary transition-colors">{project.title}</h3>
            </Link>
            <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                {t("projects.github")}
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("projects.liveDemo")}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </TiltCard>
  )
}
