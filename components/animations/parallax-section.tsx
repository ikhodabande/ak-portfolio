"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "vertical" | "horizontal"
  container?: boolean
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "vertical",
  container = true,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    // Calculate the distance to move based on the speed
    const distance = direction === "vertical" ? section.offsetHeight * speed : section.offsetWidth * speed

    // Create the parallax effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    if (direction === "vertical") {
      tl.fromTo(content, { y: -distance / 2 }, { y: distance / 2, ease: "none", duration: 1 })
    } else {
      tl.fromTo(content, { x: -distance / 2 }, { x: distance / 2, ease: "none", duration: 1 })
    }

    return () => {
      // Clean up ScrollTrigger instances
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [speed, direction])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={contentRef} className={container ? "container px-4 md:px-6" : ""}>
        {children}
      </div>
    </div>
  )
}
