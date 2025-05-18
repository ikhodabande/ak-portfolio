import type React from "react"
import "./globals.css"
import { Inter, Vazirmatn } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/context/language-context"
import type { Metadata, Viewport } from "next"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata: Metadata = {
  title: {
    template: "%s | امیرمحمد خدابنده",
    default: "امیرمحمد خدابنده | طراح و توسعه دهنده فرانت اند",
  },
  description:
    "طراحی وبسایت و توسعه فرانت اند با امیرمحمد خدابنده - Amirmohammad Khodabande Front-end Developer Portfolio",
  keywords: [
    "امیرمحمد خدابنده",
    "طراحی وبسایت",
    "فرانت اند",
    "Amirmohammad Khodabande",
    "Front-end Developer",
    "Web Design",
  ],
  manifest: "/manifest.json",
  authors: [
    {
      name: "Amirmohammad Khodabande",
      url: "https://yourwebsite.com",
    },
  ],
  creator: "Amirmohammad Khodabande",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    title: "امیرمحمد خدابنده | طراح و توسعه دهنده فرانت اند",
    description: "طراحی وبسایت و توسعه فرانت اند با امیرمحمد خدابنده",
    siteName: "امیرمحمد خدابنده",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "امیرمحمد خدابنده",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "امیرمحمد خدابنده | طراح و توسعه دهنده فرانت اند",
    description: "طراحی وبسایت و توسعه فرانت اند با امیرمحمد خدابنده",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.variable} ${vazirmatn.variable} font-sans`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
