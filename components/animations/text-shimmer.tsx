"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface TextShimmerProps {
  children: React.ReactNode
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
