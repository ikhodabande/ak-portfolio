import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
  },
  slideInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
  },
}

export function createScrollAnimation(
  elements: string | Element | Element[],
  preset: keyof typeof animationPresets,
  options: AnimationOptions & { trigger?: string; start?: string; toggleActions?: string } = {},
) {
  const {
    duration = 0.8,
    delay = 0,
    ease = "power2.out",
    stagger = 0,
    trigger,
    start = "top 70%",
    toggleActions = "play none none reverse",
  } = options

  const animation = animationPresets[preset]

  return gsap.fromTo(elements, animation.from, {
    ...animation.to,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          toggleActions,
        }
      : undefined,
  })
}

export function createTypingAnimation(
  element: Element,
  text: string,
  finalHTML: string,
  options: { duration?: number; showCursor?: boolean; onComplete?: () => void } = {},
) {
  const { duration = 2, showCursor = true, onComplete } = options

  if (!element) return

  element.innerHTML = ""

  return gsap.to(element, {
    duration,
    text,
    ease: "none",
    onUpdate: function () {
      if (showCursor && this.progress() < 1) {
        element.innerHTML = element.innerHTML + "|"
      }
    },
    onComplete: () => {
      element.innerHTML = finalHTML
      onComplete?.()
    },
  })
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
