"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/animations/magnetic-button"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "fa" ? "en" : "fa")
  }

  return (
    // <MagneticButton as="div" strength={20} radius={100}>
      <Button variant="outline" size="sm" onClick={toggleLanguage} className="font-medium">
        {language === "fa" ? "English" : "فارسی"}
      </Button>
    // </MagneticButton>
  )
}
