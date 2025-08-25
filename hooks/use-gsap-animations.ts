"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimationConfig {
  trigger: string
  elements: string
  animation: {
    from: gsap.TweenVars
    to: gsap.TweenVars
  }
  scrollTrigger?: {
    start?: string
    end?: string
    toggleActions?: string
  }
}

export function useGSAPAnimations(configs: AnimationConfig[], dependencies: any[] = []) {
  useEffect(() => {
    configs.forEach(({ trigger, elements, animation, scrollTrigger }) => {
      gsap.fromTo(elements, animation.from, {
        ...animation.to,
        scrollTrigger: {
          trigger,
          start: scrollTrigger?.start || "top 70%",
          toggleActions: scrollTrigger?.toggleActions || "play none none reverse",
          ...scrollTrigger,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, dependencies)
}
