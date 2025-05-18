"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ScrollProgressProps {
  className?: string
  barClassName?: string
  height?: number
  color?: string
  position?: "top" | "bottom"
}

export default function ScrollProgress({
  className = "",
  barClassName = "",
  height = 4,
  color = "bg-primary",
  position = "top",
}: ScrollProgressProps) {
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const progressBar = progressBarRef.current

    if (!progressBar) return

    // Create the progress bar animation
    gsap.to(progressBar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        ref={progressBarRef}
        className={`h-full w-0 ${color} ${barClassName}`}
        style={{ transformOrigin: "left" }}
      ></div>
    </div>
  )
}
