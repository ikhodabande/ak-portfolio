import { getDatabase } from "@/lib/mongodb"
import type { Project, CreateProjectData, UpdateProjectData } from "@/lib/models/project"
import { ObjectId } from "mongodb"

export class ProjectService {
  private static readonly COLLECTION = "projects"

  static async getAll(filters?: {
    status?: "published" | "draft"
    featured?: boolean
    category?: string
  }): Promise<Project[]> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const query: any = {}
      if (filters?.status) query.status = filters.status
      if (filters?.featured !== undefined) query.featured = filters.featured
      if (filters?.category) query.category = filters.category

      const projects = await collection.find(query).sort({ createdAt: -1 }).toArray()

      return projects.map((project) => ({
        ...project,
        id: project._id?.toString(),
      }))
    } catch (error) {
      console.error("Error fetching projects:", error)
      throw new Error("Failed to fetch projects")
    }
  }

  static async getById(id: string): Promise<Project | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const project = await collection.findOne({ _id: new ObjectId(id) })

      if (!project) return null

      return {
        ...project,
        id: project._id?.toString(),
      }
    } catch (error) {
      console.error("Error fetching project:", error)
      throw new Error("Failed to fetch project")
    }
  }

  static async create(data: CreateProjectData): Promise<Project> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const now = new Date()
      const projectData: Omit<Project, "_id" | "id"> = {
        ...data,
        createdAt: now,
        updatedAt: now,
        views: 0,
        likes: 0,
      }

      const result = await collection.insertOne(projectData)

      const project = await collection.findOne({ _id: result.insertedId })
      if (!project) throw new Error("Failed to create project")

      return {
        ...project,
        id: project._id?.toString(),
      }
    } catch (error) {
      console.error("Error creating project:", error)
      throw new Error("Failed to create project")
    }
  }

  static async update(id: string, data: UpdateProjectData): Promise<Project | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const updateData = {
        ...data,
        updatedAt: new Date(),
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
      console.error("Error updating project:", error)
      throw new Error("Failed to update project")
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error("Error deleting project:", error)
      throw new Error("Failed to delete project")
    }
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
    } catch (error) {
      console.error("Error incrementing project views:", error)
    }
  }

  static async toggleLike(id: string): Promise<number> {
    try {
      const db = await getDatabase()
      const collection = db.collection<Project>(this.COLLECTION)

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { likes: 1 } },
        { returnDocument: "after" },
      )

      return result?.likes || 0
    } catch (error) {
      console.error("Error toggling project like:", error)
      throw new Error("Failed to toggle like")
    }
  }
}
