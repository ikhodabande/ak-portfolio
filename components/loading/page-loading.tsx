"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface PageLoadingProps {
  message?: string
  fullScreen?: boolean
}

export function PageLoading({ message = "Loading...", fullScreen = true }: PageLoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-white dark:bg-gray-900",
        fullScreen ? "min-h-screen" : "h-64",
      )}
    >
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-gray-600 dark:text-gray-400 animate-pulse">{message}</p>
    </div>
  )
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ")
}
