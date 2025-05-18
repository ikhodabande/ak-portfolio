"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "button" | "div" | "a"
  disabled?: boolean
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 200,
  as = "button",
  disabled = false,
  onClick,
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    // Calculate the center of the button
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate the distance from the mouse to the center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Calculate the distance from the mouse to the center using Pythagorean theorem
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // If the mouse is within the radius, move the button
    if (distance < radius) {
      // The closer to the center, the stronger the effect
      const strengthFactor = 1 - Math.min(distance / radius, 1)

      setPosition({
        x: distanceX * strengthFactor * (strength / 10),
        y: distanceY * strengthFactor * (strength / 10),
      })
    } else {
      // If the mouse is outside the radius, reset the position
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    // Reset the position when the mouse leaves
    setPosition({ x: 0, y: 0 })
  }

  const Component = motion[as as keyof typeof motion]

  const props2 = {
    ...(as === "a" ? { href, target, rel } : {}),
    ...(as === "button" ? { onClick, disabled } : {}),
    ...props,
  }

  return (
    <motion.div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Component {...props2} className="w-full h-full">
        {children}
      </Component>
    </motion.div>
  )
}
