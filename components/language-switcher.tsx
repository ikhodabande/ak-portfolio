"use client"

import { useLanguage } from "@/hooks/use-language"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "fa" : "en")}
      className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
      aria-label="Toggle language"
    >
      <div className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {language === "en" ? "فا" : "EN"}
      </div>
    </button>
  )
}
