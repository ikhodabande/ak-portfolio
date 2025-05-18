"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MagneticButton from "@/components/animations/magnetic-button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure we only render theme changes on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      {/* <MagneticButton as="div" strength={20} radius={100}> */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      {/* </MagneticButton> */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>روشن</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>تاریک</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>سیستم</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
