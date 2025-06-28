"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StartupLoader } from "./startup-loader"
import { useStartupLoader } from "@/hooks/use-startup-loader"

interface StartupWrapperProps {
  children: React.ReactNode
}

export function StartupWrapper({ children }: StartupWrapperProps) {
  const { showLoader, hasShownLoader, completeLoader } = useStartupLoader()

  return (
    <>
      <AnimatePresence mode="wait">{showLoader && <StartupLoader onComplete={completeLoader} />}</AnimatePresence>

      <AnimatePresence>
        {hasShownLoader && !showLoader && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
