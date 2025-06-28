import { type NextRequest, NextResponse } from "next/server"
import { BlogService } from "@/lib/services/blog-service"
import type { CreateBlogPostData } from "@/lib/models/blog"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "published" | "draft" | null
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const tags = searchParams.get("tags")?.split(",").filter(Boolean)

    const filters: any = {}
    if (status) filters.status = status
    if (featured !== null) filters.featured = featured === "true"
    if (category) filters.category = category
    if (tags?.length) filters.tags = tags

    const posts = await BlogService.getAll(filters)

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error("Error in GET /api/blog:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const postData: CreateBlogPostData = body

    // Validate required fields
    if (!postData.title || !postData.excerpt || !postData.content || !postData.category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const post = await BlogService.create(postData)

    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/blog:", error)
    return NextResponse.json({ success: false, error: "Failed to create blog post" }, { status: 500 })
  }
}
