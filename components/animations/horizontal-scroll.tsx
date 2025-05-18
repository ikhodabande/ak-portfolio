"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  duration?: number
  pinSpacing?: boolean
}

export default function HorizontalScroll({
  children,
  className = "",
  duration = 1,
  pinSpacing = true,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // Calculate the width of the scrolling content
    const contentWidth = container.scrollWidth
    const viewportWidth = window.innerWidth

    // Create the horizontal scroll effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${contentWidth - viewportWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        pinSpacing,
        invalidateOnRefresh: true,
      },
    })

    tl.to(container, {
      x: -(contentWidth - viewportWidth),
      ease: "none",
      duration,
    })

    return () => {
      // Clean up ScrollTrigger instances
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [duration, pinSpacing])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={containerRef} className="flex">
        {children}
      </div>
    </div>
  )
}
