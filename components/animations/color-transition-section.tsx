"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ColorTransitionSectionProps {
  children: ReactNode
  className?: string
  fromColor?: string
  toColor?: string
  darkFromColor?: string
  darkToColor?: string
  duration?: number
  ease?: string
}

export default function ColorTransitionSection({
  children,
  className = "",
  fromColor = "white",
  toColor = "white",
  darkFromColor = "rgb(15, 23, 42)", // slate-900
  darkToColor = "rgb(15, 23, 42)", // slate-900
  duration = 0.8,
  ease = "power1.inOut",
}: ColorTransitionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const section = sectionRef.current
    if (!section || isInitializedRef.current) return

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains("dark")
    const startColor = isDarkMode ? darkFromColor : fromColor
    const endColor = isDarkMode ? darkToColor : toColor

    // Create the scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: endColor,
          duration,
          ease,
        })
      },
      onLeaveBack: () => {
        gsap.to("body", {
          backgroundColor: startColor,
          duration,
          ease,
        })
      },
    })

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const isDark = document.documentElement.classList.contains("dark")
          gsap.to("body", {
            backgroundColor: isDark ? darkToColor : toColor,
            duration,
            ease,
          })
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    isInitializedRef.current = true

    return () => {
      // Clean up
      trigger.kill()
      observer.disconnect()
    }
  }, [fromColor, toColor, darkFromColor, darkToColor, duration, ease])

  return (
    <div ref={sectionRef} className={`color-transition-section ${className}`}>
      {children}
    </div>
  )
}
