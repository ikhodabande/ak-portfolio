"use client"

import { useEffect, forwardRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

interface WorkSectionProps {
  className?: string
}

export const WorkSection = forwardRef<HTMLElement, WorkSectionProps>(({ className = "" }, ref) => {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    gsap.fromTo(
      ".work-item",
      { opacity: 0, x: isRTL ? 50 : -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#work",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [isRTL])

  return (
    <section id="work" ref={ref} className={`min-h-screen py-32 ${className}`}>
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-light">{t.selectedWork}</h2>
          <div className="text-sm text-muted-foreground font-mono">
            {language === "fa" ? "۱۳۹۹ — ۱۴۰۳" : "2020 — 2025"}
          </div>
        </div>

        <div className="space-y-12">
          {t.workExperience.map((job, index) => (
            <div
              key={index}
              className="work-item group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              <div className="lg:col-span-2">
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {language === "fa"
                    ? ["۱۴۰۳", "۱۴۰۲", "۱۴۰۱", "۱۴۰۰"][index]
                    : ["2024", "2023", "2022", "2021"][index]}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground">{job.company}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
              </div>

              <div className={`lg:col-span-4 flex flex-wrap gap-2 ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}>
                {(index === 0
                  ? ["Next.js", "TypeScript", "Tailwind CSS"]
                  : index === 1
                    ? ["React", "Vite.js", "SCSS"]
                    : index === 2
                      ? ["React", "Redux", "Styled Components"]
                      : ["JavaScript", "React", "CSS3"]
                ).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

WorkSection.displayName = "WorkSection"
