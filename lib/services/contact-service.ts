import { getDatabase } from "@/lib/mongodb"
import type { ContactMessage, CreateContactMessageData } from "@/lib/models/contact"
import { ObjectId } from "mongodb"

export class ContactService {
  private static readonly COLLECTION = "contact_messages"

  static async getAll(filters?: {
    status?: "unread" | "read" | "replied"
  }): Promise<ContactMessage[]> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const query: any = {}
      if (filters?.status) query.status = filters.status

      const messages = await collection.find(query).sort({ createdAt: -1 }).toArray()

      return messages.map((message) => ({
        ...message,
        id: message._id?.toString(),
      }))
    } catch (error) {
      console.error("Error fetching contact messages:", error)
      throw new Error("Failed to fetch contact messages")
    }
  }

  static async getById(id: string): Promise<ContactMessage | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const message = await collection.findOne({ _id: new ObjectId(id) })

      if (!message) return null

      return {
        ...message,
        id: message._id?.toString(),
      }
    } catch (error) {
      console.error("Error fetching contact message:", error)
      throw new Error("Failed to fetch contact message")
    }
  }

  static async create(data: CreateContactMessageData): Promise<ContactMessage> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const now = new Date()
      const messageData: Omit<ContactMessage, "_id" | "id"> = {
        ...data,
        status: "unread",
        createdAt: now,
        updatedAt: now,
      }

      const result = await collection.insertOne(messageData)

      const message = await collection.findOne({ _id: result.insertedId })
      if (!message) throw new Error("Failed to create contact message")

      return {
        ...message,
        id: message._id?.toString(),
      }
    } catch (error) {
      console.error("Error creating contact message:", error)
      throw new Error("Failed to create contact message")
    }
  }

  static async updateStatus(id: string, status: "unread" | "read" | "replied"): Promise<ContactMessage | null> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            status,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" },
      )

      if (!result) return null

      return {
        ...result,
        id: result._id?.toString(),
      }
    } catch (error) {
      console.error("Error updating contact message status:", error)
      throw new Error("Failed to update contact message status")
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error("Error deleting contact message:", error)
      throw new Error("Failed to delete contact message")
    }
  }

  static async getStats(): Promise<{
    total: number
    unread: number
    read: number
    replied: number
  }> {
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactMessage>(this.COLLECTION)

      const [total, unread, read, replied] = await Promise.all([
        collection.countDocuments(),
        collection.countDocuments({ status: "unread" }),
        collection.countDocuments({ status: "read" }),
        collection.countDocuments({ status: "replied" }),
      ])

      return { total, unread, read, replied }
    } catch (error) {
      console.error("Error fetching contact stats:", error)
      throw new Error("Failed to fetch contact stats")
    }
  }
}
