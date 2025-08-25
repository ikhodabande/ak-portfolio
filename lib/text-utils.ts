export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase())
}

export function extractInitials(name: string, maxInitials = 2): string {
  return name
    .split(" ")
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

export function formatReadingTime(wordCount: number, wordsPerMinute = 200): string {
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export function formatPersianReadingTime(wordCount: number, wordsPerMinute = 200): string {
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} دقیقه مطالعه`
}

export function removeHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "")
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

export function isRTLText(text: string): boolean {
  const rtlChars = /[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/
  return rtlChars.test(text)
}
