"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Sparkles } from "lucide-react"

interface StartupLoaderProps {
  onComplete: () => void
}

export function StartupLoader({ onComplete }: StartupLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { text: "Initializing Portfolio...", duration: 800 },
    { text: "Loading Projects...", duration: 600 },
    { text: "Setting up Blog...", duration: 500 },
    { text: "Preparing Dashboard...", duration: 400 },
    { text: "Finalizing Experience...", duration: 700 },
  ]

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let stepTimeout: NodeJS.Timeout
    let currentProgress = 0
    let stepIndex = 0

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 3 + 1

        if (currentProgress >= 100) {
          currentProgress = 100
          setProgress(100)
          clearInterval(progressInterval)

          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 800)
          }, 500)
        } else {
          setProgress(Math.min(currentProgress, 100))
        }
      }, 50)
    }

    const updateSteps = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex)
        stepTimeout = setTimeout(() => {
          stepIndex++
          updateSteps()
        }, steps[stepIndex].duration)
      }
    }

    updateProgress()
    updateSteps()

    return () => {
      clearInterval(progressInterval)
      clearTimeout(stepTimeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-x" />

            {/* Floating Particles */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1200,
                  y: typeof window !== "undefined" ? Math.random() * window.innerHeight : Math.random() * 800,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center text-white max-w-md mx-auto px-6">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-4 relative"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30" />
                  <div className="absolute inset-2 rounded-full border-2 border-purple-400/50" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                امیرمحمد خدابنده
              </h1>
              <p className="text-lg text-blue-200">Front-End Developer</p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8"
            >
              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </motion.div>
                </div>

                {/* Progress Percentage */}
                <div className="flex justify-center mt-4">
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    key={Math.floor(progress)}
                  >
                    <span>{Math.floor(progress)}%</span>
                  </motion.div>
                </div>
              </div>

              {/* Loading Steps */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-blue-200"
              >
                {steps[currentStep]?.text}
              </motion.div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-8 left-8"
          >
            <div className="w-16 h-16 border-l-2 border-t-2 border-blue-400/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute top-8 right-8"
          >
            <div className="w-16 h-16 border-r-2 border-t-2 border-purple-400/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-8 left-8"
          >
            <div className="w-16 h-16 border-l-2 border-b-2 border-blue-400/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-8 right-8"
          >
            <div className="w-16 h-16 border-r-2 border-b-2 border-purple-400/50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
