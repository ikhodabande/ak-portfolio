"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
  quality?: number
  fill?: boolean
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder = "/placeholder.svg",
  priority = false,
  quality = 75,
  fill = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const shouldLoad = priority || isIntersecting

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-gray-100 dark:bg-gray-800", className)}
      style={!fill ? { width, height } : undefined}
    >
      {shouldLoad && (
        <>
          {/* Placeholder */}
          {!isLoaded && !isError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full" />
            </div>
          )}

          {/* Main Image */}
          <Image
            src={isError ? placeholder : src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            quality={quality}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              fill ? "object-cover" : "",
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setIsError(true)
              setIsLoaded(true)
            }}
            priority={priority}
          />
        </>
      )}

      {/* Loading indicator for non-intersecting images */}
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
