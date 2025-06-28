import { type NextRequest, NextResponse } from "next/server"
import { ProjectService } from "@/lib/services/project-service"
import type { CreateProjectData } from "@/lib/models/project"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as "published" | "draft" | null
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")

    const filters: any = {}
    if (status) filters.status = status
    if (featured !== null) filters.featured = featured === "true"
    if (category) filters.category = category

    const projects = await ProjectService.getAll(filters)

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error("Error in GET /api/projects:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projectData: CreateProjectData = body

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const project = await ProjectService.create(projectData)

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/projects:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
