"use client"

import { useLanguage } from "@/contexts/language-context"

interface PersianNumberProps {
  value: number | string
  className?: string
}

const englishToPersianDigits: { [key: string]: string } = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
}

const persianToEnglishDigits: { [key: string]: string } = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
}

export function PersianNumber({ value, className }: PersianNumberProps) {
  const { language } = useLanguage()

  const convertDigits = (str: string, toPersian: boolean) => {
    const digitMap = toPersian ? englishToPersianDigits : persianToEnglishDigits
    return str.replace(/[0-9۰-۹]/g, (digit) => digitMap[digit] || digit)
  }

  const displayValue = language === "fa" ? convertDigits(String(value), true) : convertDigits(String(value), false)

  return <span className={`persian-numbers ${className || ""}`}>{displayValue}</span>
}

// Utility functions for number conversion
export const toPersianDigits = (str: string): string => {
  return str.replace(/[0-9]/g, (digit) => englishToPersianDigits[digit] || digit)
}

export const toEnglishDigits = (str: string): string => {
  return str.replace(/[۰-۹]/g, (digit) => persianToEnglishDigits[digit] || digit)
}
