"use client"

import { useEffect } from "react"
import { useTheme } from "@/hooks/use-theme"
import { useActiveSection } from "@/hooks/use-active-section"
import { useLanguage } from "@/hooks/use-language"
import { usePortfolioAnimations } from "@/hooks/use-portfolio-animations"
import { HeroSection } from "@/components/sections/hero-section"
import { WorkSection } from "@/components/sections/work-section"
import { ThoughtsSection } from "@/components/sections/thoughts-section"
import { ConnectSection } from "@/components/sections/connect-section"
import { NavDots } from "@/components/navigation/nav-dots"
import { PortfolioFooter } from "@/components/layout/portfolio-footer"

export default function Home() {
  const { isDark, toggleTheme } = useTheme()
  const { activeSection, setSectionRef } = useActiveSection(["intro", "work", "thoughts", "connect"])
  const { language, isRTL } = useLanguage()

  usePortfolioAnimations()

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [isRTL, language])

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <NavDots activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <HeroSection ref={setSectionRef(0)} />

        <WorkSection ref={setSectionRef(1)} />

        <ThoughtsSection ref={setSectionRef(2)} />

        <ConnectSection ref={setSectionRef(3)} />

        <PortfolioFooter isDark={isDark} onToggleTheme={toggleTheme} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
