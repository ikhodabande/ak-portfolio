"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

interface TypingAnimationOptions {
  text: string
  finalHTML: string
  duration?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function useTypingAnimation({
  text,
  finalHTML,
  duration = 2,
  showCursor = true,
  onComplete,
}: TypingAnimationOptions) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    element.innerHTML = ""

    const tl = gsap.timeline()

    tl.to(element, {
      duration,
      text,
      ease: "none",
      onUpdate: function () {
        if (showCursor && this.progress() < 1) {
          element.innerHTML = element.innerHTML + "|"
        }
      },
      onComplete: () => {
        element.innerHTML = finalHTML
        onComplete?.()
      },
    })

    return () => {
      tl.kill()
    }
  }, [text, finalHTML, duration, showCursor, onComplete])

  return { elementRef }
}
