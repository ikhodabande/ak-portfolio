import type { ObjectId } from "mongodb"

export interface ContactMessage {
  _id?: ObjectId
  id?: string
  name: string
  email: string
  subject: string
  projectType?: string
  budget?: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
  ipAddress?: string
  userAgent?: string
}

export interface CreateContactMessageData {
  name: string
  email: string
  subject: string
  projectType?: string
  budget?: string
  message: string
  ipAddress?: string
  userAgent?: string
}
