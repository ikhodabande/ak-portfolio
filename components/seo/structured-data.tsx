interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  description: string
  url: string
  sameAs: string[]
  address: {
    locality: string
    country: string
  }
  skills: string[]
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  sameAs,
  address,
  skills,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressCountry: address.country,
    },
    knowsAbout: skills,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface WebsiteStructuredDataProps {
  name: string
  url: string
  description: string
  author: string
}

export function WebsiteStructuredData({ name, url, description, author }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface ArticleStructuredDataProps {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  url: string
  image?: string
}

export function ArticleStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
