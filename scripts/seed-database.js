const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind", "MongoDB"],
    category: "Full Stack",
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.vercel.app",
    featured: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 150,
    likes: 25,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates, team collaboration, and project tracking.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    github: "https://github.com/username/task-manager",
    live: "https://task-manager-demo.vercel.app",
    featured: true,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 89,
    likes: 12,
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed analytics.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Vue.js", "API Integration", "Chart.js", "CSS3"],
    category: "Frontend",
    github: "https://github.com/username/weather-dashboard",
    live: "https://weather-dashboard-demo.vercel.app",
    featured: false,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 67,
    likes: 8,
  },
]

const sampleBlogPosts = [
  {
    title: "Building Responsive Layouts with CSS Grid",
    excerpt:
      "Learn how to create complex, responsive layouts using CSS Grid and modern techniques. This comprehensive guide covers everything from basic concepts to advanced patterns.",
    content:
      "<h2>Introduction</h2><p>CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. In this comprehensive guide, we'll explore everything from basic concepts to advanced patterns.</p><h2>Getting Started</h2><p>Let's start with the basics of CSS Grid...</p>",
    image: "/placeholder.svg?height=200&width=400",
    author: "امیرمحمد خدابنده",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["CSS", "Web Design", "Frontend"],
    category: "CSS",
    featured: true,
    published: true,
    status: "published",
    slug: "building-responsive-layouts-with-css-grid",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    views: 234,
    likes: 18,
  },
  {
    title: "State Management in React: A Complete Guide",
    excerpt:
      "Comprehensive guide to managing state in React applications using various approaches including useState, useReducer, Context API, and external libraries.",
    content:
      "<h2>Introduction to State Management</h2><p>State management is one of the most important concepts in React development...</p>",
    image: "/placeholder.svg?height=200&width=400",
    author: "امیرمحمد خدابنده",
    date: "2024-01-10",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "State Management"],
    category: "React",
    featured: true,
    published: true,
    status: "published",
    slug: "state-management-in-react-complete-guide",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    views: 189,
    likes: 22,
  },
]

const sampleContactMessages = [
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Project Inquiry",
    projectType: "Website Development",
    budget: "$5,000 - $10,000",
    message: "Hi! I'm interested in having a website built for my small business. Could we discuss the details?",
    status: "unread",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    name: "Mike Chen",
    email: "mike@example.com",
    subject: "Collaboration Opportunity",
    projectType: "Web Application",
    budget: "$10,000 - $25,000",
    message: "I have an exciting project and would love to collaborate with you. Let's chat!",
    status: "read",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
]

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("portfolio")

    // Clear existing data
    await db.collection("projects").deleteMany({})
    await db.collection("blog_posts").deleteMany({})
    await db.collection("contact_messages").deleteMany({})

    // Insert sample data
    await db.collection("projects").insertMany(sampleProjects)
    console.log("✅ Projects seeded")

    await db.collection("blog_posts").insertMany(sampleBlogPosts)
    console.log("✅ Blog posts seeded")

    await db.collection("contact_messages").insertMany(sampleContactMessages)
    console.log("✅ Contact messages seeded")

    // Create indexes for better performance
    await db.collection("projects").createIndex({ status: 1, featured: 1 })
    await db.collection("projects").createIndex({ category: 1 })
    await db.collection("projects").createIndex({ createdAt: -1 })

    await db.collection("blog_posts").createIndex({ status: 1, featured: 1 })
    await db.collection("blog_posts").createIndex({ category: 1 })
    await db.collection("blog_posts").createIndex({ tags: 1 })
    await db.collection("blog_posts").createIndex({ slug: 1 }, { unique: true })
    await db.collection("blog_posts").createIndex({ createdAt: -1 })

    await db.collection("contact_messages").createIndex({ status: 1 })
    await db.collection("contact_messages").createIndex({ createdAt: -1 })

    console.log("✅ Database indexes created")
    console.log("🎉 Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
