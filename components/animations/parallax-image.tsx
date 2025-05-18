"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  speed?: number
  className?: string
  scale?: number
}

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.3,
  className = "",
  scale = 1.2,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = containerRef.current
    const image = imageRef.current

    if (!container || !image) return

    // Set initial scale to ensure no gaps during parallax
    gsap.set(image, { scale })

    // Create the parallax effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    // Calculate the distance to move based on the speed and container height
    const distance = container.offsetHeight * speed

    tl.fromTo(image, { y: -distance / 2 }, { y: distance / 2, ease: "none", duration: 1 })

    return () => {
      // Clean up ScrollTrigger instances
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [speed, scale])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
