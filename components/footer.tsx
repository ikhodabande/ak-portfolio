"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const { t, language } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ]

  const footerSections = [
    {
      title: language === "fa" ? "لینک های سریع" : "Quick Links",
      links: [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.projects"), href: "/projects" },
        { name: t("nav.blog"), href: "/blog" },
        { name: t("nav.about"), href: "/about" },
      ],
    },
    {
      title: language === "fa" ? "خدمات" : "Services",
      links: [
        { name: language === "fa" ? "طراحی وبسایت" : "Web Design", href: "/services/web-design" },
        {
          name: language === "fa" ? "توسعه فرانت اند" : "Frontend Development",
          href: "/services/frontend-development",
        },
        { name: language === "fa" ? "طراحی واکنشگرا" : "Responsive Design", href: "/services/responsive-design" },
        { name: language === "fa" ? "بهینه سازی SEO" : "SEO Optimization", href: "/services/seo-optimization" },
      ],
    },
  ]

  return (
    <footer className="w-full py-6 md:py-8 border-t bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium">
              {language === "fa" ? "امیرمحمد خدابنده" : "Amirmohammad Khodabande"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "fa"
                ? "طراح و توسعه دهنده فرانت اند با تمرکز بر ساخت وب‌سایت‌های مدرن و کاربرپسند"
                : "Front-end Developer & Designer focused on building modern and user-friendly websites"}
            </p>
            <div className="flex space-x-3 rtl:space-x-reverse">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium mb-3">{section.title}</h3>
              <nav className="flex flex-col space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: language === "fa" ? -5 : 5 }}
                    initial={{ opacity: 0, x: language === "fa" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * linkIndex }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-3">{language === "fa" ? "تماس با من" : "Contact Me"}</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>{language === "fa" ? "تهران، ایران" : "Tehran, Iran"}</p>
              <p>
                <a href="mailto:your.email@example.com" className="hover:text-foreground transition-colors">
                  your.email@example.com
                </a>
              </p>
              <p>
                <a href="tel:+989123456789" className="hover:text-foreground transition-colors">
                  +98 912 345 6789
                </a>
              </p>
            </address>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            © {currentYear} {language === "fa" ? "امیرمحمد خدابنده" : "Amirmohammad Khodabande"}. {t("footer.rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
