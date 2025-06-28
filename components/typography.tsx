"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface TypographyProps {
  children: React.ReactNode
  className?: string
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  as?: React.ElementType
}

export function Typography({ children, className, variant = "p", as, ...props }: TypographyProps) {
  const { language } = useLanguage()
  const Component = as || variant

  const baseClasses = {
    h1: "text-4xl lg:text-6xl font-bold",
    h2: "text-3xl lg:text-4xl font-bold",
    h3: "text-2xl lg:text-3xl font-semibold",
    h4: "text-xl lg:text-2xl font-semibold",
    h5: "text-lg lg:text-xl font-medium",
    h6: "text-base lg:text-lg font-medium",
    p: "text-base",
    span: "text-base",
  }

  const languageClasses = {
    fa: "persian-text",
    en: "english-text",
  }

  return (
    <Component
      className={cn(baseClasses[variant], languageClasses[language], "transition-all duration-300", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// Specialized components for better semantic meaning
export function Heading({
  level = 1,
  children,
  className,
  ...props
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}) {
  return (
    <Typography variant={`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"} className={className} {...props}>
      {children}
    </Typography>
  )
}

export function Text({
  children,
  className,
  size = "base",
  ...props
}: {
  children: React.ReactNode
  className?: string
  size?: "sm" | "base" | "lg" | "xl"
}) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  return (
    <Typography variant="p" className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Typography>
  )
}

export function MixedText({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn("mixed-content-text", className)} {...props}>
      {children}
    </span>
  )
}
