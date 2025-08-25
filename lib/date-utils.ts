export interface DateFormatOptions {
  locale?: string
  year?: "numeric" | "2-digit"
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow"
  day?: "numeric" | "2-digit"
}

export function formatDate(date: Date | string, locale = "en-US", options: DateFormatOptions = {}): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const defaultOptions: DateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return dateObj.toLocaleDateString(locale, { ...defaultOptions, ...options })
}

export function formatPersianDate(date: Date | string): string {
  return formatDate(date, "fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatEnglishDate(date: Date | string): string {
  return formatDate(date, "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getRelativeTime(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second")
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute")
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour")
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day")
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), "month")
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), "year")
  }
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getPersianYear(): number {
  const persianDate = new Date().toLocaleDateString("fa-IR-u-nu-latn")
  return Number.parseInt(persianDate.split("/")[0])
}
