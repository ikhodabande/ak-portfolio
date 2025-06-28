"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Palette, Smartphone, Zap, Github, ExternalLink, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"
import {
  FadeInUp,
  SlideIn,
  StaggeredChildren,
  ScaleIn,
  GradientText,
  Floating,
  WordByWord,
} from "@/components/animations/text-animations"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { AnimatedBackground } from "@/components/animations/animated-background"

export default function HomePage() {
  const { language } = useLanguage()

  const skills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 92 },
    { name: "JavaScript", level: 95 },
    { name: "Node.js", level: 85 },
  ]

  const featuredProjects = [
    {
      id: 1,
      title: getTranslation(language, "visitoriTitle"),
      description: getTranslation(language, "visitoriDesc"),
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "PWA", "TypeScript", "Tailwind", "Firebase"],
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: getTranslation(language, "storeTitle"),
      description: getTranslation(language, "storeDesc"),
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "PWA", "Stripe", "MongoDB", "Redis"],
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: getTranslation(language, "dashboardAppTitle"),
      description: getTranslation(language, "dashboardAppDesc"),
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "Chart.js", "Node.js", "PostgreSQL"],
      github: "#",
      live: "#",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Building Responsive Layouts with CSS Grid",
      excerpt: "Learn how to create complex, responsive layouts using CSS Grid and modern techniques.",
      date: "2024-01-15",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "State Management in React: A Complete Guide",
      excerpt: "Comprehensive guide to managing state in React applications using various approaches.",
      date: "2024-01-10",
      readTime: "8 min read",
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <AnimatedBackground variant="gradient">
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <FadeInUp>
                    <GradientText className="text-4xl lg:text-6xl font-bold">
                      {getTranslation(language, "heroTitle")}
                    </GradientText>
                  </FadeInUp>
                  <FadeInUp delay={200}>
                    <WordByWord
                      text={getTranslation(language, "heroDescription")}
                      className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                      delay={500}
                      wordDelay={100}
                    />
                  </FadeInUp>
                  <FadeInUp delay={400}>
                    <span className="text-lg font-medium text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                      امیرمحمد خدابنده - {getTranslation(language, "companyName")}
                    </span>
                  </FadeInUp>
                </div>
                <FadeInUp delay={600}>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      asChild
                      className="transition-all duration-300 hover:scale-105 animate-pulse-glow"
                    >
                      <Link href="/projects">
                        {getTranslation(language, "viewMyWork")}{" "}
                        <ArrowRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Link href="/contact">{getTranslation(language, "getInTouch")}</Link>
                    </Button>
                  </div>
                </FadeInUp>
                <FadeInUp delay={800}>
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {getTranslation(language, "availableForFreelance")}
                    </div>
                    <div>📍 {getTranslation(language, "remote")}</div>
                  </div>
                </FadeInUp>
              </div>
              <SlideIn direction="right" delay={300}>
                <div className="relative">
                  <div className="relative w-80 h-80 mx-auto">
                    <Floating duration={4000}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
                    </Floating>
                    <ScaleIn delay={500}>
                      <Image
                        src="/placeholder.svg?height=320&width=320"
                        alt="Profile"
                        width={320}
                        height={320}
                        className="relative z-10 rounded-full border-4 border-white dark:border-gray-700 shadow-2xl transition-all duration-300 hover:scale-105"
                      />
                    </ScaleIn>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </section>
      </AnimatedBackground>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {getTranslation(language, "skillsTitle")}
              </h2>
            </FadeInUp>
            <FadeInUp delay={200}>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getTranslation(language, "skillsDescription")}
              </p>
            </FadeInUp>
          </div>

          <StaggeredChildren staggerDelay={150}>
            {[
              {
                icon: Code,
                title: getTranslation(language, "frontendDevelopment"),
                desc: getTranslation(language, "frontendDesc"),
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                icon: Palette,
                title: getTranslation(language, "uiuxDesign"),
                desc: getTranslation(language, "uiuxDesc"),
                color: "text-purple-600 dark:text-purple-400",
              },
              {
                icon: Smartphone,
                title: getTranslation(language, "mobileDevelopment"),
                desc: getTranslation(language, "mobileDesc"),
                color: "text-green-600 dark:text-green-400",
              },
              {
                icon: Zap,
                title: getTranslation(language, "performance"),
                desc: getTranslation(language, "performanceDesc"),
                color: "text-yellow-600 dark:text-yellow-400",
              },
            ].map((skill, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover-lift"
              >
                <skill.icon className={`h-12 w-12 ${skill.color} mx-auto mb-4`} />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{skill.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{skill.desc}</p>
              </Card>
            ))}
          </StaggeredChildren>

          <FadeInUp delay={600}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    <AnimatedCounter
                      end={skill.level}
                      suffix="%"
                      delay={800 + index * 100}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    />
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${800 + index * 100}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Projects */}
      <AnimatedBackground variant="particles">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <FadeInUp>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {getTranslation(language, "featuredProjects")}
                </h2>
              </FadeInUp>
              <FadeInUp delay={200}>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {getTranslation(language, "featuredProjectsDesc")}
                </p>
              </FadeInUp>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <ScaleIn key={project.id} delay={index * 200}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-lift">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{project.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          <Link href={project.github}>
                            <Github className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {getTranslation(language, "code")}
                          </Link>
                        </Button>
                        <Button size="sm" asChild className="transition-all duration-300 hover:scale-105">
                          <Link href={project.live}>
                            <ExternalLink className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                            {getTranslation(language, "liveDemo")}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              ))}
            </div>

            <FadeInUp delay={600}>
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="transition-all duration-300 hover:scale-105 bg-transparent animate-pulse-glow"
                >
                  <Link href="/projects">
                    {getTranslation(language, "viewAllProjects")}{" "}
                    <ArrowRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </section>
      </AnimatedBackground>

      {/* Recent Blog Posts */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeInUp>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {getTranslation(language, "latestBlogPosts")}
              </h2>
            </FadeInUp>
            <FadeInUp delay={200}>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getTranslation(language, "blogDescription")}
              </p>
            </FadeInUp>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {recentPosts.map((post, index) => (
              <SlideIn key={post.id} direction={index % 2 === 0 ? "left" : "right"} delay={index * 200}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{post.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              </SlideIn>
            ))}
          </div>

          <FadeInUp delay={400}>
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link href="/blog">
                  {getTranslation(language, "readAllPosts")}{" "}
                  <ArrowRight className="ml-2 h-4 w-4 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 animate-gradient-x"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInUp>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-text-glow">
              {getTranslation(language, "ctaTitle")}
            </h2>
          </FadeInUp>
          <FadeInUp delay={200}>
            <p className="text-xl mb-8 opacity-90">{getTranslation(language, "ctaDescription")}</p>
          </FadeInUp>
          <FadeInUp delay={400}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="transition-all duration-300 hover:scale-105">
                <Link href="/contact">{getTranslation(language, "startProject")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/about">{getTranslation(language, "learnMore")}</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  )
}
