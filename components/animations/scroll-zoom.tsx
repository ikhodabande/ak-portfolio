"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ScrollZoomProps {
  children: ReactNode
  startScale?: number
  endScale?: number
  className?: string
}

export default function ScrollZoom({ children, startScale = 0.8, endScale = 1, className = "" }: ScrollZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // Set initial scale
    gsap.set(content, { scale: startScale })

    // Create the zoom effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    })

    tl.to(content, {
      scale: endScale,
      ease: "none",
      duration: 1,
    })

    return () => {
      // Clean up ScrollTrigger instances
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [startScale, endScale])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>
    </div>
  )
}
