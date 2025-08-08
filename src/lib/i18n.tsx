"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import en from "@/messages/en.json"
import ar from "@/messages/ar.json"

type Locale = "en" | "ar"

type I18nContextValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
  toLocaleDigits: (input: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const ALL_MESSAGES = {
  en,
  ar,
} as const

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const saved = window.localStorage.getItem("lang") as Locale | null
  if (saved === "en" || saved === "ar") return saved
  const nav = navigator.language?.toLowerCase() || "en"
  return nav.startsWith("ar") ? "ar" : "en"
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  // Update <html> attributes when locale changes
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    window.localStorage.setItem("lang", locale)
  }, [locale])

  const dir = locale === "ar" ? "rtl" : "ltr"

  function convertDigits(input: string): string {
    if (locale !== "ar") return input
    const map: Record<string, string> = {
      "0": "٠", "1": "١", "2": "٢", "3": "٣", "4": "٤",
      "5": "٥", "6": "٦", "7": "٧", "8": "٨", "9": "٩",
    }
    return input.replace(/[0-9]/g, (d) => map[d] ?? d)
  }

  const t = useCallback(
    (key: string, fallback?: string) => {
      // Supports keys like "Namespace.a.b.0.c" and flat keys-with-dots under intermediate levels
      if (!key) return ""
      const [rawNs, ...rest] = key.split(".")
      const messagesForLocale: any = (ALL_MESSAGES as any)[locale] || {}
      const nsKey = Object.keys(messagesForLocale).find((k) => k.toLowerCase() === rawNs.toLowerCase())
      const namespaceObj = nsKey ? messagesForLocale[nsKey] : undefined
      if (!namespaceObj) return fallback ?? key

      // Stepwise traversal; if a segment is missing, try flat lookup using the remaining segments joined with dots at the current level
      let cursor: any = namespaceObj
      for (let i = 0; i < rest.length; i++) {
        if (cursor == null) break
        const seg = rest[i]
        const idx = Number.isInteger(Number(seg)) ? Number(seg) : seg
        const next = cursor?.[idx as any]
        if (next === undefined) {
          const remaining = rest.slice(i).join(".")
          const flatHere = cursor?.[remaining]
          if (typeof flatHere === "string") return flatHere
          cursor = undefined
          break
        } else {
          cursor = next
        }
      }
      if (typeof cursor === "string") return convertDigits(cursor)

      // Fallback to flat lookup at the namespace root
      const flatAtRoot = rest.join(".")
      const rootVal = (namespaceObj as any)?.[flatAtRoot]
      if (typeof rootVal === "string") return convertDigits(rootVal)

      return fallback ?? key
    },
    [locale]
  )

  const value = useMemo<I18nContextValue>(() => ({ locale, dir, setLocale, t, toLocaleDigits: convertDigits }), [locale, dir, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}


