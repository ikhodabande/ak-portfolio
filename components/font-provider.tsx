"use client"

import type React from "react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export function FontProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  useEffect(() => {
    const root = document.documentElement

    // Remove existing font classes
    root.classList.remove("font-en", "font-fa")

    // Add appropriate font class based on language
    if (language === "fa") {
      root.classList.add("font-fa")
    } else {
      root.classList.add("font-en")
    }
  }, [language])

  return <>{children}</>
}
