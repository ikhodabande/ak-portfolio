"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ArrowLeft, Save, Eye, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

// Mock data - in a real app, this would come from your database
const mockPost = {
  id: 1,
  title: "Building Responsive Layouts with CSS Grid",
  excerpt:
    "Learn how to create complex, responsive layouts using CSS Grid and modern techniques. This comprehensive guide covers everything from basic concepts to advanced patterns.",
  content:
    "<h2>Introduction</h2><p>CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. In this comprehensive guide, we'll explore everything from basic concepts to advanced patterns.</p><h2>Getting Started</h2><p>Let's start with the basics of CSS Grid...</p>",
  category: "CSS",
  tags: ["CSS", "Web Design", "Frontend"],
  featured: true,
  published: true,
  coverImage: "/placeholder.svg?height=200&width=400",
  readTime: "5 min read",
}

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    featured: false,
    published: false,
    coverImage: "",
    readTime: "",
  })

  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    "Web Development",
    "React",
    "JavaScript",
    "TypeScript",
    "CSS",
    "Next.js",
    "Frontend",
    "Backend",
    "Tutorial",
    "Tips & Tricks",
  ]

  // Load post data
  useEffect(() => {
    const loadPost = async () => {
      // In a real app, fetch from your API
      // const response = await fetch(`/api/posts/${postId}`)
      // const post = await response.json()

      // Using mock data for now
      setFormData({
        title: mockPost.title,
        excerpt: mockPost.excerpt,
        content: mockPost.content,
        category: mockPost.category,
        tags: mockPost.tags,
        featured: mockPost.featured,
        published: mockPost.published,
        coverImage: mockPost.coverImage,
        readTime: mockPost.readTime,
      })
      setIsLoading(false)
    }

    loadPost()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating blog post:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/dashboard?tab=blog")
  }

  const handleSaveDraft = async () => {
    const draftData = { ...formData, published: false }
    console.log("Saving draft:", draftData)
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      console.log("Deleting post:", postId)
      // Delete logic here
      router.push("/dashboard?tab=blog")
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard?tab=blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="mr-2">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button onClick={handleSubmit}>Update Post</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isPreview ? (
                  <>
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter your blog post title..."
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        className="text-lg"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief description of your post..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                      <Label htmlFor="coverImage">Cover Image URL</Label>
                      <Input
                        id="coverImage"
                        placeholder="https://example.com/image.jpg"
                        value={formData.coverImage}
                        onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                      />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-2">
                      <Label>Content *</Label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                        placeholder="Start writing your blog post..."
                      />
                    </div>
                  </>
                ) : (
                  /* Preview Mode */
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold mb-4">{formData.title || "Untitled Post"}</h1>
                      <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
                      {formData.coverImage && (
                        <img
                          src={formData.coverImage || "/placeholder.svg"}
                          alt="Cover"
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                    </div>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formData.content }} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Read Time */}
                <div className="space-y-2">
                  <Label htmlFor="readTime">Estimated Read Time</Label>
                  <Input
                    id="readTime"
                    placeholder="5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Post</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                  />
                </div>

                {/* Published Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEO Preview */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-blue-600 text-lg font-medium truncate">
                    {formData.title || "Your Blog Post Title"}
                  </div>
                  <div className="text-green-600 text-sm">
                    yoursite.com/blog/{formData.title.toLowerCase().replace(/\s+/g, "-") || "your-post-slug"}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formData.excerpt || "Your blog post excerpt will appear here..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
