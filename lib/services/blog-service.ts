import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, CreateBlogPostData, UpdateBlogPostData } from "@/lib/models/blog"
import { ObjectId } from "mongodb"

export class BlogService {
  private static readonly COLLECTION = "blog_posts"

  static async getAll(filters?: {
    status?: "published" | "draft"
    featured?: boolean
    category?: string
    tags?: string[]
  }): Promise<BlogPost[]> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const query: any = {}
      if (filters?.status) query.status = filters.status
      if (filters?.featured !== undefined) query.featured = filters.featured
      if (filters?.category) query.category = filters.category
      if (filters?.tags?.length) query.tags = { $in: filters.tags }

      const posts = await collection.find(query).sort({ createdAt: -1 }).toArray()

      return posts.map((post) => ({
        ...post,
        id: post._id?.toString(),
      }))
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      throw new Error("Failed to fetch blog posts")
    }
  }

  static async getById(id: string): Promise<BlogPost | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const post = await collection.findOne({ _id: new ObjectId(id) })

      if (!post) return null

      return {
        ...post,
        id: post._id?.toString(),
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      throw new Error("Failed to fetch blog post")
    }
  }

  static async getBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const post = await collection.findOne({ slug })

      if (!post) return null

      return {
        ...post,
        id: post._id?.toString(),
      }
    } catch (error) {
      console.error("Error fetching blog post by slug:", error)
      throw new Error("Failed to fetch blog post")
    }
  }

  static async create(data: CreateBlogPostData): Promise<BlogPost> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const now = new Date()
      const slug = data.slug || this.generateSlug(data.title)

      const postData: Omit<BlogPost, "_id" | "id"> = {
        ...data,
        slug,
        date: now.toISOString().split("T")[0],
        createdAt: now,
        updatedAt: now,
        views: 0,
        likes: 0,
      }

      const result = await collection.insertOne(postData)

      const post = await collection.findOne({ _id: result.insertedId })
      if (!post) throw new Error("Failed to create blog post")

      return {
        ...post,
        id: post._id?.toString(),
      }
    } catch (error) {
      console.error("Error creating blog post:", error)
      throw new Error("Failed to create blog post")
    }
  }

  static async update(id: string, data: UpdateBlogPostData): Promise<BlogPost | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const updateData = {
        ...data,
        updatedAt: new Date(),
      }

      if (data.title && !data.slug) {
        updateData.slug = this.generateSlug(data.title)
      }

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" },
      )

      if (!result) return null

      return {
        ...result,
        id: result._id?.toString(),
      }
    } catch (error) {
      console.error("Error updating blog post:", error)
      throw new Error("Failed to update blog post")
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error("Error deleting blog post:", error)
      throw new Error("Failed to delete blog post")
    }
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
    } catch (error) {
      console.error("Error incrementing blog post views:", error)
    }
  }

  static async toggleLike(id: string): Promise<number> {
    try {
      const db = await getDatabase()
      const collection = db.collection<BlogPost>(this.COLLECTION)

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { likes: 1 } },
        { returnDocument: "after" },
      )

      return result?.likes || 0
    } catch (error) {
      console.error("Error toggling blog post like:", error)
      throw new Error("Failed to toggle like")
    }
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }
}
