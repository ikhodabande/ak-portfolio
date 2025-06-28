"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fa")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    // Update document attributes
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"
    document.documentElement.lang = lang

    // Update font classes
    const root = document.documentElement
    root.classList.remove("font-en", "font-fa")
    root.classList.add(lang === "fa" ? "font-fa" : "font-en")

    // Update body class for better font rendering
    document.body.classList.remove("persian-text", "english-text")
    document.body.classList.add(lang === "fa" ? "persian-text" : "english-text")
  }

  const isRTL = language === "fa"

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language

    // Apply font classes
    const root = document.documentElement
    root.classList.remove("font-en", "font-fa")
    root.classList.add(isRTL ? "font-fa" : "font-en")

    // Apply text classes to body
    document.body.classList.remove("persian-text", "english-text")
    document.body.classList.add(isRTL ? "persian-text" : "english-text")
  }, [language, isRTL])

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
