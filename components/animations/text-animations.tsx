"use client"

import React from "react"

import type { ReactNode } from "react"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

// Fade In Up Animation
interface FadeInUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, duration = 600, className }: FadeInUpProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Typewriter Effect
interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 0, speed = 50, className, onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, started, onComplete])

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Slide In From Direction
interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 600,
  distance = 50,
  className,
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"

    switch (direction) {
      case "left":
        return `translate3d(-${distance}px, 0, 0)`
      case "right":
        return `translate3d(${distance}px, 0, 0)`
      case "up":
        return `translate3d(0, -${distance}px, 0)`
      case "down":
        return `translate3d(0, ${distance}px, 0)`
      default:
        return `translate3d(-${distance}px, 0, 0)`
    }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Staggered Children Animation
interface StaggeredChildrenProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredChildren({ children, staggerDelay = 100, className }: StaggeredChildrenProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <FadeInUp key={index} delay={index * staggerDelay}>
          {child}
        </FadeInUp>
      ))}
    </div>
  )
}

// Scale In Animation
interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, duration = 400, className }: ScaleInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.8)",
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Text Reveal Animation
interface TextRevealProps {
  text: string
  delay?: number
  className?: string
}

export function TextReveal({ text, delay = 0, className }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <span
        className={cn(
          "inline-block transition-transform duration-700 ease-out",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        {text}
      </span>
    </div>
  )
}

// Gradient Text Animation
interface GradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
}

export function GradientText({ children, className, colors = ["#3B82F6", "#8B5CF6", "#EC4899"] }: GradientTextProps) {
  return (
    <span
      className={cn("bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x", className)}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </span>
  )
}

// Floating Animation
interface FloatingProps {
  children: ReactNode
  duration?: number
  delay?: number
  className?: string
}

export function Floating({ children, duration = 3000, delay = 0, className }: FloatingProps) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Word by Word Animation
interface WordByWordProps {
  text: string
  delay?: number
  wordDelay?: number
  className?: string
}

export function WordByWord({ text, delay = 0, wordDelay = 200, className }: WordByWordProps) {
  const words = text.split(" ")
  const [visibleWords, setVisibleWords] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (visibleWords < words.length) {
      const timer = setTimeout(() => {
        setVisibleWords((prev) => prev + 1)
      }, wordDelay)

      return () => clearTimeout(timer)
    }
  }, [visibleWords, words.length, wordDelay, started])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500 ease-out mr-1 rtl:mr-0 rtl:ml-1",
            index < visibleWords ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

// Text Shimmer Animation
interface TextShimmerProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
}

export function TextShimmer({ children, className, duration = 2000, delay = 0 }: TextShimmerProps) {
  return (
    <span
      className={cn(
        "relative inline-block bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100 bg-clip-text text-transparent animate-shimmer",
        className,
      )}
      style={{
        backgroundSize: "200% 100%",
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </span>
  )
}
