import { type NextRequest, NextResponse } from "next/server"
import { ContactService } from "@/lib/services/contact-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const message = await ContactService.getById(params.id)

    if (!message) {
      return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    console.error("Error in GET /api/contact/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contact message" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    const message = await ContactService.updateStatus(params.id, status)

    if (!message) {
      return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    console.error("Error in PATCH /api/contact/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to update contact message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await ContactService.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Contact message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Contact message deleted successfully" })
  } catch (error) {
    console.error("Error in DELETE /api/contact/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to delete contact message" }, { status: 500 })
  }
}
