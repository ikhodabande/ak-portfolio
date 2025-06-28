import type { ObjectId } from "mongodb"

export interface BlogPost {
  _id?: ObjectId
  id?: string
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
  createdAt: Date
  updatedAt: Date
  views?: number
  likes?: number
  slug?: string
}

export interface CreateBlogPostData {
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
  published: boolean
  status: "published" | "draft"
  slug?: string
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  updatedAt?: Date
}
