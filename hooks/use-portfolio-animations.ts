"use client"
import { useLanguage } from "@/hooks/use-language"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"

export function usePortfolioAnimations() {
  const { isRTL } = useLanguage()

  const animationConfigs = [
    {
      trigger: "#work",
      elements: ".work-item",
      animation: {
        from: { opacity: 0, x: isRTL ? 50 : -50 },
        to: {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
      },
    },
    {
      trigger: "#thoughts",
      elements: ".thought-card",
      animation: {
        from: { opacity: 0, y: 50, scale: 0.95 },
        to: {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
      },
    },
    {
      trigger: "#connect",
      elements: ".connect-content",
      animation: {
        from: { opacity: 0, y: 30 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
      },
    },
  ]

  useGSAPAnimations(animationConfigs, [isRTL])
}
