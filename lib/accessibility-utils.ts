export function announceToScreenReader(message: string): void {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  ) as NodeListOf<HTMLElement>

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== "Tab") return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener("keydown", handleTabKey)

  // Focus the first element
  firstElement?.focus()

  // Return cleanup function
  return () => {
    element.removeEventListener("keydown", handleTabKey)
  }
}

export function getAriaLabel(text: string, context?: string): string {
  if (context) {
    return `${text}, ${context}`
  }
  return text
}

export function generateId(prefix = "element"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute("aria-expanded", expanded.toString())
}

export function setAriaHidden(element: HTMLElement, hidden: boolean): void {
  element.setAttribute("aria-hidden", hidden.toString())
}
