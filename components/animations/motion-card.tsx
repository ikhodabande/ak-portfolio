"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MotionCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function MotionCard({ children, delay = 0, className = "" }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
