import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { generateSEOMetadata } from "@/components/seo/seo-head"
import { PersonStructuredData, WebsiteStructuredData } from "@/components/seo/structured-data"
import { FaviconLinks } from "@/components/seo/favicon-links"
import { seoConfig } from "@/lib/seo-config"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
})

export const metadata: Metadata = generateSEOMetadata({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  author: seoConfig.author.name,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${vazirmatn.variable}`}>
      <head>
        <PersonStructuredData
          name={seoConfig.author.name}
          jobTitle="Frontend Developer"
          description={seoConfig.defaultDescription}
          url={seoConfig.siteUrl}
          sameAs={[
            seoConfig.author.github,
            seoConfig.author.linkedin,
            `https://twitter.com/${seoConfig.social.twitter}`,
          ]}
          address={seoConfig.address}
          skills={seoConfig.skills}
        />
        <WebsiteStructuredData
          name={`${seoConfig.author.name} Portfolio`}
          url={seoConfig.siteUrl}
          description={seoConfig.defaultDescription}
          author={seoConfig.author.name}
        />
        <FaviconLinks />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
