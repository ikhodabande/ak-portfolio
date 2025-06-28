"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Code2 className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">امیرمحمد خدابنده</span>
            </div>
            <p className="text-gray-400">{getTranslation(language, "footerDescription")}</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-800 transition-colors">
                <Link href="https://github.com" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-800 transition-colors">
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-800 transition-colors">
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:bg-gray-800 transition-colors">
                <Link href="mailto:amirmohammad@webcom.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{getTranslation(language, "quickLinks")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {getTranslation(language, "about")}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  {getTranslation(language, "projects")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {getTranslation(language, "blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {getTranslation(language, "contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{getTranslation(language, "services")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{getTranslation(language, "webDevelopment")}</li>
              <li>{getTranslation(language, "uiuxDesign")}</li>
              <li>{getTranslation(language, "mobileApps")}</li>
              <li>{getTranslation(language, "consulting")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{getTranslation(language, "contactInfo")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 amirmohammad@webcom.com</li>
              <li>📱 +98 912 345 6789</li>
              <li>📍 {getTranslation(language, "remote")}</li>
              <li>🏢 {getTranslation(language, "companyName")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 امیرمحمد خدابنده. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
