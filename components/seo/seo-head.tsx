import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "profile"
  twitterCard?: "summary" | "summary_large_image"
  author?: string
  publishedTime?: string
  modifiedTime?: string
  locale?: string
  alternateLocales?: { [key: string]: string }
}

export function generateSEOMetadata({
  title = "Amirmohammad Khodabande - Frontend Developer",
  description = "Frontend developer specializing in React, Next.js, and Vite.js. Creating modern web experiences with cutting-edge technologies.",
  keywords = ["Frontend Developer", "React", "Next.js", "Vite.js", "TypeScript"],
  canonical = "/",
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  author = "Amirmohammad Khodabande",
  locale = "en_US",
  alternateLocales = { "en-US": "/en", "fa-IR": "/fa" },
}: SEOProps = {}): Metadata {
  const baseUrl = "https://amirmohammad.dev"

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: alternateLocales,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonical}`,
      siteName: `${author} Portfolio`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
      creator: "@amirmohammad",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
