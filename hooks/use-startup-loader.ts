"use client"

import { useState, useEffect } from "react"

export function useStartupLoader() {
  const [showLoader, setShowLoader] = useState(true)
  const [hasShownLoader, setHasShownLoader] = useState(false)

  useEffect(() => {
    // Check if loader has been shown in this session
    const loaderShown = sessionStorage.getItem("startup-loader-shown")

    if (loaderShown) {
      setShowLoader(false)
      setHasShownLoader(true)
    }
  }, [])

  const completeLoader = () => {
    setShowLoader(false)
    setHasShownLoader(true)
    sessionStorage.setItem("startup-loader-shown", "true")
  }

  return {
    showLoader,
    hasShownLoader,
    completeLoader,
  }
}
