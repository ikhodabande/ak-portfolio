"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Database, Layers, Terminal, GitBranch, Cpu, LineChart } from "lucide-react"
import ScrollReveal from "@/components/animations/scroll-reveal"
import { useLanguage } from "@/context/language-context"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TiltCard from "@/components/animations/tilt-card"

export default function SkillsSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const skills = [
    {
      category: language === "fa" ? "فرانت اند" : "Front-end",
      icon: Code,
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js"],
    },
    {
      category: "UI/UX",
      icon: Palette,
      items: ["Tailwind CSS", "Styled Components", "Figma", "Adobe XD", "CSS Animation"],
    },
    {
      category: language === "fa" ? "بک اند" : "Back-end",
      icon: Database,
      items: ["Node.js", "Express", "RESTful APIs", "GraphQL", "Firebase"],
    },
    {
      category: language === "fa" ? "معماری" : "Architecture",
      icon: Layers,
      items: ["Responsive Design", "Progressive Web Apps", "JAMstack", "Serverless"],
    },
    {
      category: language === "fa" ? "ابزارها" : "Tools",
      icon: Terminal,
      items: ["VS Code", "Webpack", "Vite", "npm/yarn", "Jest", "Cypress"],
    },
    {
      category: language === "fa" ? "کنترل نسخه" : "Version Control",
      icon: GitBranch,
      items: ["Git", "GitHub", "GitLab", "CI/CD", "GitHub Actions"],
    },
    {
      category: language === "fa" ? "یکپارچه سازی هوش مصنوعی" : "AI Integration",
      icon: Cpu,
      items: ["OpenAI API", "Hugging Face", "TensorFlow.js", "ML Integration"],
    },
    {
      category: language === "fa" ? "تحلیل" : "Analytics",
      icon: LineChart,
      items: ["Google Analytics", "SEO Optimization", "Performance Metrics", "Lighthouse"],
    },
  ]

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const section = sectionRef.current
    if (!section) return

    // Create a staggered animation for the skill cards
    const cards = section.querySelectorAll(".skill-card")

    gsap.set(cards, { y: 50, opacity: 0 })

    ScrollTrigger.batch(cards, {
      interval: 0.1, // time window (in seconds) for batching to occur
      batchMax: 3, // maximum batch size (targets)
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        }),
      start: "top 85%",
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <ScrollReveal className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t("skills.title")}</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">{t("skills.subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {skills.map((skill, index) => (
            <TiltCard
              key={skill.category}
              className="skill-card"
              tiltMaxAngleX={7}
              tiltMaxAngleY={7}
              glareOpacity={0.1}
            >
              <Card className="overflow-hidden h-full bg-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <skill.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{skill.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-gray-500 dark:text-gray-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
