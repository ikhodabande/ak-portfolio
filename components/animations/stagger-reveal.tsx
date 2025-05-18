"use client"

import { useRef, useEffect, Children, cloneElement, isValidElement, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface StaggerRevealProps {
  children: ReactNode
  stagger?: number
  duration?: number
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  className?: string
  once?: boolean
}

export default function StaggerReveal({
  children,
  stagger = 0.1,
  duration = 1,
  from = { y: 50, opacity: 0 },
  to = { y: 0, opacity: 1, ease: "power3.out" },
  className = "",
  once = true,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = containerRef.current
    const elements = elementsRef.current.filter(Boolean) as HTMLElement[]

    if (!container || elements.length === 0) return

    // Set initial state
    gsap.set(elements, from)

    // Create the stagger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom-=100",
        toggleActions: once ? "play none none none" : "play none none reset",
      },
    })

    tl.to(elements, {
      ...to,
      duration,
      stagger,
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
  }, [stagger, duration, from, to, once, children])

  // Clone children to add refs
  const childrenWithRefs = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        ref: (el: HTMLElement | null) => {
          elementsRef.current[index] = el
        },
      })
    }
    return child
  })

  return (
    <div ref={containerRef} className={className}>
      {childrenWithRefs}
    </div>
  )
}
