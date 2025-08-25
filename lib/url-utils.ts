export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function formatUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }
  return url
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(formatUrl(url))
    return urlObj.hostname.replace("www.", "")
  } catch {
    return url
  }
}

export function createMailtoLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.append("subject", subject)
  if (body) params.append("body", body)

  const queryString = params.toString()
  return `mailto:${email}${queryString ? `?${queryString}` : ""}`
}

export function createTelLink(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s/g, "")}`
}

export function generateSocialShareUrl(
  platform: "twitter" | "linkedin" | "facebook",
  url: string,
  text?: string,
  link?: string
): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = text ? encodeURIComponent(text) : ""

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    default:
      return url
  }
}
