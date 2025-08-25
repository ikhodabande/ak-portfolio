"use client"

import { useEffect, forwardRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger)

interface ThoughtsSectionProps {
  className?: string
}

export const ThoughtsSection = forwardRef<HTMLElement, ThoughtsSectionProps>(({ className = "" }, ref) => {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    gsap.fromTo(
      ".thought-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#thoughts",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  return (
    <section id="thoughts" ref={ref} className={`min-h-screen py-32 ${className}`}>
      <div className="space-y-16">
        <h2 className="text-4xl font-light">{t.recentThoughts}</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {t.blogPosts.map((post, index) => (
            <article
              key={index}
              className="thought-card group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <span>{t.readMore}</span>
                  <svg
                    className={`w-4 h-4 transform group-hover:${isRTL ? "-translate-x-1" : "translate-x-1"} transition-transform duration-300 ${isRTL ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

ThoughtsSection.displayName = "ThoughtsSection"
