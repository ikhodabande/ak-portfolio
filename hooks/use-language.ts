"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Language = "en" | "fa"

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",
      isRTL: false,
      setLanguage: (lang: Language) => {
        set({
          language: lang,
          isRTL: lang === "fa",
        })
        // Update document direction
        if (typeof document !== "undefined") {
          document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"
          document.documentElement.lang = lang
        }
      },
    }),
    {
      name: "language-storage",
    },
  ),
)
