import { type NextRequest, NextResponse } from "next/server"
import { ContactService } from "@/lib/services/contact-service"
import type { CreateContactMessageData } from "@/lib/models/contact"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "unread" | "read" | "replied" | null

    const filters: any = {}
    if (status) filters.status = status

    const messages = await ContactService.getAll(filters)

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error("Error in GET /api/contact:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contact messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messageData: CreateContactMessageData = {
      ...body,
      ipAddress: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Validate required fields
    if (!messageData.name || !messageData.email || !messageData.subject || !messageData.message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const message = await ContactService.create(messageData)

    return NextResponse.json({ success: true, data: message }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/contact:", error)
    return NextResponse.json({ success: false, error: "Failed to create contact message" }, { status: 500 })
  }
}
