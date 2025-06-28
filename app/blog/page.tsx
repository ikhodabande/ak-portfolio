"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Building Responsive Layouts with CSS Grid",
    excerpt:
      "Learn how to create complex, responsive layouts using CSS Grid and modern techniques. This comprehensive guide covers everything from basic concepts to advanced patterns.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["CSS", "Web Design", "Frontend"],
    featured: true,
  },
  {
    id: 2,
    title: "State Management in React: A Complete Guide",
    excerpt:
      "Comprehensive guide to managing state in React applications using various approaches including useState, useReducer, Context API, and external libraries.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2024-01-10",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "State Management"],
    featured: true,
  },
  {
    id: 3,
    title: "Next.js Performance Optimization Tips",
    excerpt:
      "Discover essential techniques to optimize your Next.js applications for better performance, including image optimization, code splitting, and caching strategies.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Next.js", "Performance", "Optimization"],
    featured: false,
  },
  {
    id: 4,
    title: "TypeScript Best Practices for React Developers",
    excerpt:
      "Essential TypeScript patterns and best practices specifically tailored for React development. Learn how to write type-safe, maintainable React code.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2024-01-01",
    readTime: "7 min read",
    tags: ["TypeScript", "React", "Best Practices"],
    featured: false,
  },
  {
    id: 5,
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt:
      "Explore cutting-edge CSS features and techniques that will elevate your web development skills, including container queries, CSS layers, and more.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2023-12-28",
    readTime: "4 min read",
    tags: ["CSS", "Modern Web", "Frontend"],
    featured: false,
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    excerpt:
      "A comprehensive guide to web accessibility, covering ARIA attributes, semantic HTML, keyboard navigation, and testing strategies for inclusive design.",
    content: "Full article content here...",
    image: "/placeholder.svg?height=200&width=400",
    author: "John Doe",
    date: "2023-12-20",
    readTime: "9 min read",
    tags: ["Accessibility", "Web Standards", "UX"],
    featured: false,
  },
]

const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTag = !selectedTag || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology. Stay updated with the latest
            trends and best practices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="p-0 h-auto" asChild>
                      <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">All Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                      <Clock className="h-3 w-3 ml-2" />
                      {post.readTime}
                    </div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                      <Link href={`/blog/${post.id}`} className="flex items-center gap-1 text-sm">
                        Read More <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
