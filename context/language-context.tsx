"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fa" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  fa: {
    // Navigation
    "nav.home": "خانه",
    "nav.projects": "پروژه ها",
    "nav.skills": "مهارت ها",
    "nav.blog": "وبلاگ",
    "nav.about": "درباره من",
    "nav.contact": "تماس",
    "nav.dashboard": "داشبورد",

    // Hero Section
    "hero.title": "امیرمحمد خدابنده",
    "hero.subtitle": "طراح و توسعه دهنده فرانت اند",
    "hero.description": "متخصص در ساخت وب‌سایت‌های مدرن و کاربرپسند با استفاده از React و Next.js",
    "hero.viewProjects": "مشاهده پروژه ها",
    "hero.contact": "تماس با من",

    // About Section
    "about.title": "درباره من",
    "about.description1":
      "من امیرمحمد خدابنده هستم، یک توسعه دهنده فرانت اند با تجربه در ساخت وب‌سایت‌های مدرن و کاربرپسند. تخصص من در React، Next.js و طراحی رابط کاربری است.",
    "about.description2":
      "با بیش از چندین سال تجربه در صنعت، من پروژه‌های متنوعی را برای مشتریان مختلف انجام داده‌ام و همیشه به دنبال یادگیری فناوری‌های جدید و بهبود مهارت‌های خود هستم.",

    // Projects Section
    "projects.title": "پروژه های برجسته",
    "projects.subtitle": "نمونه کارهای اخیر من در زمینه طراحی و توسعه وب",
    "projects.viewAll": "مشاهده همه پروژه ها",
    "projects.github": "گیت‌هاب",
    "projects.liveDemo": "نمایش زنده",

    // Blog Section
    "blog.title": "آخرین مقالات",
    "blog.subtitle": "مطالب آموزشی و تخصصی در زمینه فرانت اند و هوش مصنوعی",
    "blog.readMore": "ادامه مطلب",
    "blog.viewAll": "مشاهده همه مقالات",

    // Skills Section
    "skills.title": "مهارت های من",
    "skills.subtitle": "تخصص ها و فناوری هایی که با آنها کار می کنم",

    // Contact Section
    "contact.title": "تماس با من",
    "contact.subtitle": "برای همکاری یا سوالات خود با من در تماس باشید",
    "contact.sendMessage": "ارسال پیام",
    "contact.email": "یا از طریق ایمیل:",

    // Footer
    "footer.rights": "تمامی حقوق محفوظ است.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.dashboard": "Dashboard",

    // Hero Section
    "hero.title": "Amirmohammad Khodabande",
    "hero.subtitle": "Front-end Developer & Designer",
    "hero.description": "Specialized in building modern and user-friendly websites using React and Next.js",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact Me",

    // About Section
    "about.title": "About Me",
    "about.description1":
      "I'm Amirmohammad Khodabande, a front-end developer with experience in building modern and user-friendly websites. My expertise is in React, Next.js, and UI design.",
    "about.description2":
      "With several years of experience in the industry, I've worked on various projects for different clients and I'm always looking to learn new technologies and improve my skills.",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "My recent work in web design and development",
    "projects.viewAll": "View All Projects",
    "projects.github": "GitHub",
    "projects.liveDemo": "Live Demo",

    // Blog Section
    "blog.title": "Latest Articles",
    "blog.subtitle": "Educational and specialized content on front-end and AI",
    "blog.readMore": "Read More",
    "blog.viewAll": "View All Articles",

    // Skills Section
    "skills.title": "My Skills",
    "skills.subtitle": "Expertise and technologies I work with",

    // Contact Section
    "contact.title": "Contact Me",
    "contact.subtitle": "Get in touch for collaboration or questions",
    "contact.sendMessage": "Send Message",
    "contact.email": "Or via email:",

    // Footer
    "footer.rights": "All rights reserved.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to Farsi, but check localStorage on client
  const [language, setLanguageState] = useState<Language>("fa")
  const [mounted, setMounted] = useState(false)

  // Set up translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)

      // Update HTML dir and lang attributes
      document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"
      document.documentElement.lang = lang
    }
  }

  // Initialize from localStorage on client
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fa" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }

    // Update HTML dir and lang attributes
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr"
    document.documentElement.lang = language

    setMounted(true)
  }, [])

  // Only render children when mounted (to avoid hydration mismatch)
  if (!mounted) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
