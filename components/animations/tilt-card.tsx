"use client"

import type React from "react"
import { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  perspective?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  scale?: number
  speed?: number
  glareOpacity?: number
  glareColor?: string
  gyroscope?: boolean
  reset?: boolean
  disabled?: boolean
}

export default function TiltCard({
  children,
  className = "",
  perspective = 1000,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.05,
  speed = 500,
  glareOpacity = 0.2,
  glareColor = "255, 255, 255",
  gyroscope = false,
  reset = true,
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })

  // Motion values for smooth animations
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Add springs for smoother motion
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Transform for the glare effect
  const glareX = useTransform(springRotateY, [-tiltMaxAngleY, tiltMaxAngleY], ["-50%", "150%"])
  const glareY = useTransform(springRotateX, [tiltMaxAngleX, -tiltMaxAngleX], ["-50%", "150%"])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    let clientX, clientY

    // Handle both mouse and touch events
    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate the mouse position relative to the center of the card
    const mouseX = clientX - centerX
    const mouseY = clientY - centerY

    // Calculate the percentage of the mouse position relative to the card dimensions
    const percentX = mouseX / (rect.width / 2)
    const percentY = mouseY / (rect.height / 2)

    // Calculate the tilt angle based on the mouse position
    const tiltX = -percentY * tiltMaxAngleX
    const tiltY = percentX * tiltMaxAngleY

    // Update the motion values
    rotateX.set(tiltX)
    rotateY.set(tiltY)

    // Update glare position
    setGlarePosition({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    })
  }

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovering(true)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovering(false)

    // Reset the tilt if reset is enabled
    if (reset) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }

  // Handle touch start
  const handleTouchStart = () => {
    if (disabled) return
    setIsTouching(true)
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (disabled) return
    setIsTouching(false)

    // Reset the tilt if reset is enabled
    if (reset) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }

  // Handle device orientation for gyroscope effect
  useEffect(() => {
    if (!gyroscope || disabled) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!cardRef.current || !event.gamma || !event.beta) return

      // Get the device orientation angles
      const gamma = event.gamma // Left to right tilt in degrees (-90 to 90)
      const beta = event.beta // Front to back tilt in degrees (-180 to 180)

      // Normalize the angles to our tilt range
      const normalizedGamma = (gamma / 45) * tiltMaxAngleY
      const normalizedBeta = ((beta - 45) / 45) * tiltMaxAngleX

      // Update the motion values
      rotateX.set(-normalizedBeta)
      rotateY.set(normalizedGamma)
    }

    window.addEventListener("deviceorientation", handleOrientation)

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [gyroscope, disabled, tiltMaxAngleX, tiltMaxAngleY, rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      animate={{
        scale: (isHovering || isTouching) && !disabled ? scale : 1,
        transition: { duration: speed / 1000 },
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Glare effect */}
        {(isHovering || isTouching) && glareOpacity > 0 && !disabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(${glareColor}, ${glareOpacity}) 0%, rgba(${glareColor}, 0) 80%)`,
              mixBlendMode: "overlay",
              zIndex: 1,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
