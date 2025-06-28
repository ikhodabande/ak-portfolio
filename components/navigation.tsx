"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Code2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"
import { LanguageToggle } from "./language-toggle"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "blog", href: "/blog" },
  { name: "contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl">امیرمحمد خدابنده</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300",
              )}
            >
              {getTranslation(language, item.name as keyof typeof import("@/lib/i18n").translations.en)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <ThemeToggle />
          <LanguageToggle />
          <Button variant="outline" asChild>
            <Link href="/contact">{getTranslation(language, "hireMe")}</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">{getTranslation(language, "dashboard")}</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle />
          <LanguageToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "left" : "right"} className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                      pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    {getTranslation(language, item.name as keyof typeof import("@/lib/i18n").translations.en)}
                  </Link>
                ))}
                <div className="flex flex-col space-y-4 pt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      {getTranslation(language, "hireMe")}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      {getTranslation(language, "dashboard")}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
