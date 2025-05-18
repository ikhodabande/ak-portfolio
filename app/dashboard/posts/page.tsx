import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: "مدیریت مقالات",
  description: "مدیریت و ویرایش مقالات وبلاگ",
}

// Sample posts data - in a real app, this would come from a database
const posts = [
  {
    id: "1",
    title: "Modern Front-end Architecture Patterns",
    excerpt: "Exploring the latest architecture patterns in front-end development",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Architecture", "Front-end", "React", "Design Patterns"],
    date: "2023-12-15",
    status: "published",
  },
  {
    id: "2",
    title: "Integrating AI in Web Applications",
    excerpt: "How to leverage AI capabilities in your web applications",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["AI", "Web Development", "API", "OpenAI"],
    date: "2023-11-28",
    status: "published",
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    excerpt: "Tips and tricks to improve your React application's performance",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    date: "2023-11-10",
    status: "draft",
  },
]

export default function PostsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">مقالات</h1>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              مقاله جدید
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  width={400}
                  height={300}
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <Badge variant={post.status === "published" ? "default" : "outline"}>
                      {post.status === "published" ? "منتشر شده" : "پیش نویس"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تاریخ: {new Date(post.date).toLocaleDateString("fa-IR")}
                  </p>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3}</Badge>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Pencil className="h-4 w-4 mr-2" />
                    ویرایش
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  حذف
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/blog/${post.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    نمایش
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
