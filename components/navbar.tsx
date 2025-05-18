"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import MagneticButton from "@/components/animations/magnetic-button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t, language } = useLanguage()

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.skills"), href: "/skills" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" className="md:hidden" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <motion.span
              className="font-bold text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {language === "fa" ? "امیرمحمد خدابنده" : "Amirmohammad Khodabande"}
            </motion.span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item, i) => (
            <motion.div key={item.name} custom={i} initial="hidden" animate="visible" variants={variants}>
              <MagneticButton as="div" strength={10} radius={50}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              </MagneticButton>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          {/* <MagneticButton as="div" strength={30}>
            <Button asChild className="hidden md:flex">
              <Link href="/dashboard">{t("nav.dashboard")}</Link>
            </Button>
          </MagneticButton> */}
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background"
        >
          <div className="relative z-20 grid gap-6 p-4 rounded-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navigation.map((item, i) => (
                <motion.div key={item.name} custom={i} initial="hidden" animate="visible" variants={variants}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md ${
                      pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={navigation.length} initial="hidden" animate="visible" variants={variants}>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 rounded-md text-muted-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
