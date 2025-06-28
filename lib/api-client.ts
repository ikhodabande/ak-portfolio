"use client"

// API client for frontend to communicate with backend

export class ApiClient {
  private static baseUrl = "/api"

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Request failed")
      }

      return result
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Projects API
  static async getProjects(filters?: {
    status?: "published" | "draft"
    featured?: boolean
    category?: string
  }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append("status", filters.status)
    if (filters?.featured !== undefined) params.append("featured", filters.featured.toString())
    if (filters?.category) params.append("category", filters.category)

    const query = params.toString()
    return this.request(`/projects${query ? `?${query}` : ""}`)
  }

  static async getProject(id: string) {
    return this.request(`/projects/${id}`)
  }

  static async createProject(data: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  static async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    })
  }

  // Blog API
  static async getBlogPosts(filters?: {
    status?: "published" | "draft"
    featured?: boolean
    category?: string
    tags?: string[]
  }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append("status", filters.status)
    if (filters?.featured !== undefined) params.append("featured", filters.featured.toString())
    if (filters?.category) params.append("category", filters.category)
    if (filters?.tags?.length) params.append("tags", filters.tags.join(","))

    const query = params.toString()
    return this.request(`/blog${query ? `?${query}` : ""}`)
  }

  static async getBlogPost(id: string) {
    return this.request(`/blog/${id}`)
  }

  static async createBlogPost(data: any) {
    return this.request("/blog", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updateBlogPost(id: string, data: any) {
    return this.request(`/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  static async deleteBlogPost(id: string) {
    return this.request(`/blog/${id}`, {
      method: "DELETE",
    })
  }

  // Contact API
  static async getContactMessages(filters?: {
    status?: "unread" | "read" | "replied"
  }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append("status", filters.status)

    const query = params.toString()
    return this.request(`/contact${query ? `?${query}` : ""}`)
  }

  static async getContactMessage(id: string) {
    return this.request(`/contact/${id}`)
  }

  static async createContactMessage(data: any) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updateContactMessageStatus(id: string, status: "unread" | "read" | "replied") {
    return this.request(`/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  static async deleteContactMessage(id: string) {
    return this.request(`/contact/${id}`, {
      method: "DELETE",
    })
  }
}
