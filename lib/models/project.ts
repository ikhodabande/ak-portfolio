import type { ObjectId } from "mongodb"

export interface Project {
  _id?: ObjectId
  id?: string
  title: string
  description: string
  image: string
  tech: string[]
  category: string
  github: string
  live: string
  featured: boolean
  status: "published" | "draft"
  createdAt: Date
  updatedAt: Date
  views?: number
  likes?: number
}

export interface CreateProjectData {
  title: string
  description: string
  image: string
  tech: string[]
  category: string
  github: string
  live: string
  featured: boolean
  status: "published" | "draft"
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  updatedAt?: Date
}
