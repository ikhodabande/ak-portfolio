"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Layer {
  content: ReactNode
  speed: number
  className?: string
}

interface ParallaxLayersProps {
  layers: Layer[]
  className?: string
  container?: boolean
}

export default function ParallaxLayers({ layers, className = "", container = true }: ParallaxLayersProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const section = sectionRef.current
    if (!section) return

    // Create a timeline for each layer
    const timelines = layerRefs.current.map((layer, index) => {
      if (!layer) return null

      const speed = layers[index].speed
      const distance = section.offsetHeight * speed

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      tl.fromTo(layer, { y: -distance / 2 }, { y: distance / 2, ease: "none", duration: 1 })

      return tl
    })

    return () => {
      // Clean up ScrollTrigger instances
      timelines.forEach((tl) => tl?.kill())
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [layers])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div className={container ? "container px-4 md:px-6 relative" : "relative"}>
        {layers.map((layer, index) => (
          <div
            key={index}
            ref={(el) => (layerRefs.current[index] = el)}
            className={`absolute inset-0 ${layer.className || ""}`}
          >
            {layer.content}
          </div>
        ))}
      </div>
    </div>
  )
}
