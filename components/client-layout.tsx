"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { StartupWrapper } from "@/components/startup/startup-wrapper"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <StartupWrapper>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </StartupWrapper>
      </LanguageProvider>
    </ThemeProvider>
  )
}
