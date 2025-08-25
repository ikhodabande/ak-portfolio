"use client"

import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function usePortfolioData() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const personalInfo = {
    name: language === "fa" ? "امیرمحمد خدابنده" : "Amirmohammad Khodabande",
    role: language === "fa" ? "توسعه‌دهنده فرانت‌اند" : "Frontend Developer",
    email: "amirmohammad@example.com",
    location: t.location,
  }

  const skills = ["React", "TypeScript", "Next.js", "Vite.js", "Tailwind CSS"]

  const navigationSections = [
    { id: "intro", label: t.intro || "Intro" },
    { id: "work", label: t.work || "Work" },
    { id: "thoughts", label: t.thoughts || "Thoughts" },
    { id: "connect", label: t.connect || "Connect" },
  ]

  return {
    personalInfo,
    skills,
    navigationSections,
    workExperience: t.workExperience,
    blogPosts: t.blogPosts,
    socialLinks: t.socialLinks,
    translations: t,
    language,
    isRTL,
  }
}
