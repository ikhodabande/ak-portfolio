"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

interface NavDotsProps {
  activeSection: string
  className?: string
}

export function NavDots({ activeSection, className = "" }: NavDotsProps) {
  const navDotsRef = useRef<HTMLDivElement>(null)
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    gsap.fromTo(
      navDotsRef.current?.children || [],
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 3,
      },
    )
  }, [])

  return (
    <nav className={`fixed ${isRTL ? "right-8" : "left-8"} top-1/2 -translate-y-1/2 z-10 hidden lg:block ${className}`}>
      <div ref={navDotsRef} className="flex flex-col gap-4">
        {["intro", "work", "thoughts", "connect"].map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-2 rounded-full transition-all duration-500 h-4 ${
              activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Navigate to ${t[section as keyof typeof t]}`}
          />
        ))}
      </div>
    </nav>
  )
}
