import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter, vazirmatn, notoSansFarsi } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ClientLayout } from "@/components/client-layout"

export const metadata: Metadata = {
  title: "امیرمحمد خدابنده - توسعه‌دهنده فرانت‌اند | Amirmohammad Khodabande - Front-End Developer",
  description:
    "توسعه‌دهنده حرفه‌ای فرانت‌اند متخصص در React، Next.js و تکنولوژی‌های مدرن وب | Professional front-end developer specializing in React, Next.js, and modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          // inter.variable,
          // vazirmatn.variable,
          // notoSansFarsi.variable,
          "font-sans antialiased transition-all duration-300",
        )}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
