import { type NextRequest, NextResponse } from "next/server"
import { BlogService } from "@/lib/services/blog-service"
import type { UpdateBlogPostData } from "@/lib/models/blog"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await BlogService.getById(params.id)

    if (!post) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 })
    }

    // Increment views
    await BlogService.incrementViews(params.id)

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error("Error in GET /api/blog/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updateData: UpdateBlogPostData = body

    const post = await BlogService.update(params.id, updateData)

    if (!post) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error("Error in PUT /api/blog/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await BlogService.delete(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error in DELETE /api/blog/[id]:", error)
    return NextResponse.json({ success: false, error: "Failed to delete blog post" }, { status: 500 })
  }
}
