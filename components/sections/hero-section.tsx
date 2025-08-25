"use client"

import { useEffect, useRef, forwardRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

gsap.registerPlugin(TextPlugin)

interface HeroSectionProps {
  className?: string
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ className = "" }, ref) => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroDescRef = useRef<HTMLParagraphElement>(null)
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set([heroTitleRef.current, heroDescRef.current, ".hero-info", ".hero-skills"], { opacity: 0, y: 30 })

    if (heroTitleRef.current) {
      const nameText = language === "fa" ? "امیرمحمد\nخدابنده" : "Amirmohammad\nKhodabande"
      heroTitleRef.current.innerHTML = ""

      tl.to(heroTitleRef.current, {
        duration: 2,
        text: nameText,
        ease: "none",
        onUpdate: function () {
          if (this.progress() < 1) {
            heroTitleRef.current!.innerHTML = heroTitleRef.current!.innerHTML + "|"
          }
        },
        onComplete: () => {
          heroTitleRef.current!.innerHTML =
            language === "fa"
              ? 'امیرمحمد<br /><span class="text-muted-foreground">خدابنده</span>'
              : 'Amirmohammad<br /><span class="text-muted-foreground">Khodabande</span>'
        },
      }).to(
        [heroDescRef.current, ".hero-info", ".hero-skills"],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5",
      )
    }
  }, [language, isRTL])

  return (
    <header id="intro" ref={ref} className={`min-h-screen flex items-center ${className}`}>
      <div className="grid lg:grid-cols-5 gap-16 w-full">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">{t.portfolio}</div>
            <h1 ref={heroTitleRef} className="text-6xl font-light tracking-tight lg:text-6xl min-h-[120px]"></h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p ref={heroDescRef} className="text-xl text-muted-foreground leading-relaxed">
              {t.frontendDeveloper}
              <span className="text-foreground"> React</span>,<span className="text-foreground"> Next.js</span>,{" "}
              {language === "fa" ? "و" : "and"}
              <span className="text-foreground"> Vite.js</span>.
            </p>

            <div className="hero-info flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {t.availableForWork}
              </div>
              <div>{t.location}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
          <div className="hero-info space-y-4">
            <div className="text-sm text-muted-foreground font-mono">{t.currently}</div>
            <div className="space-y-2">
              <div className="text-foreground">{language === "fa" ? "توسعه‌دهنده فرانت‌اند" : "Frontend Developer"}</div>
              <div className="text-muted-foreground">{t.freelance}</div>
              <div className="text-xs text-muted-foreground">
                {language === "fa" ? "۱۴۰۲ — اکنون" : "2023 — Present"}
              </div>
            </div>
          </div>

          <div className="hero-skills space-y-4">
            <div className="text-sm text-muted-foreground font-mono">{t.focus}</div>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Vite.js", "Tailwind CSS"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})

HeroSection.displayName = "HeroSection"
