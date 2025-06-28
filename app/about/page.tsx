import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MapPin, Calendar, Award, Code, Palette, Smartphone, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise applications using React, TypeScript, and Next.js. Mentoring junior developers and establishing coding standards.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Co.",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications and e-commerce platforms. Collaborated with designers and backend developers to deliver high-quality user experiences.",
    },
    {
      title: "Junior Web Developer",
      company: "StartUp Ventures",
      period: "2019 - 2020",
      description:
        "Built landing pages and marketing websites using modern web technologies. Gained experience in full-stack development and agile methodologies.",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      description: "Focused on software engineering, web development, and computer graphics. Graduated with honors.",
    },
  ]

  const certifications = [
    "AWS Certified Developer",
    "Google Analytics Certified",
    "React Developer Certification",
    "Accessibility Specialist",
  ]

  const skills = [
    { category: "Frontend", items: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
    { category: "Styling", items: ["Tailwind CSS", "Styled Components", "Sass", "CSS Modules", "Bootstrap"] },
    { category: "Tools", items: ["Git", "Webpack", "Vite", "Docker", "Figma", "Adobe XD"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"] },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate front-end developer with 5+ years of experience creating beautiful, functional, and user-friendly
            web applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                <p className="text-gray-600 mb-4">Frontend Developer</p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>Remote / Worldwide</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>5+ Years Experience</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span>50+ Projects Completed</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <section>
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-4">
                  Hello! I'm John, a passionate frontend developer based remotely with over 5 years of experience in
                  creating exceptional digital experiences. My journey in web development started during my computer
                  science studies, where I discovered my love for bringing designs to life through code.
                </p>
                <p className="mb-4">
                  I specialize in modern JavaScript frameworks, particularly React and Next.js, and have a keen eye for
                  design and user experience. I believe that great websites should not only look beautiful but also be
                  fast, accessible, and provide an intuitive user experience.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing my knowledge through blog posts and mentoring. I'm always excited to work on challenging
                  projects that push the boundaries of what's possible on the web.
                </p>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {skillGroup.category === "Frontend" && <Code className="h-5 w-5 text-blue-600" />}
                        {skillGroup.category === "Styling" && <Palette className="h-5 w-5 text-purple-600" />}
                        {skillGroup.category === "Tools" && <Zap className="h-5 w-5 text-yellow-600" />}
                        {skillGroup.category === "Backend" && <Smartphone className="h-5 w-5 text-green-600" />}
                        {skillGroup.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="text-lg font-medium text-blue-600">{job.company}</CardDescription>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0">
                          {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle>{edu.degree}</CardTitle>
                          <CardDescription className="text-lg font-medium text-blue-600">{edu.school}</CardDescription>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <Card key={cert}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">{cert}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
