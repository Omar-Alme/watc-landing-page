"use client"

import { ArrowRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export const WHATSAPP_NUMBER = "46738907053"
export const CONTACT_EMAIL = "yusuf@watcglobal.com"

export function useWhatsAppHref() {
  const { t } = useI18n()
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("Common.whatsappPrefill"))}`
}

type Tone = "green" | "paper" | "ink" | "quiet"

const TONES: Record<Tone, string> = {
  green: "bg-green text-white hover:bg-green-hover",
  paper: "bg-on-navy text-ink hover:bg-white",
  ink: "bg-ink text-on-navy hover:bg-navy-2",
  quiet: "bg-paper-2 text-ink hover:bg-[#e2e2e2]",
}

export function actionClass(tone: Tone, className?: string) {
  return cn(
    "press inline-flex h-13 min-h-[52px] items-center justify-center gap-2.5 px-6 text-base font-medium whitespace-nowrap",
    TONES[tone],
    className
  )
}

export function BookAction({ tone = "green", className, label }: { tone?: Tone; className?: string; label?: string }) {
  const { t } = useI18n()
  return (
    <a href="#contact" className={actionClass(tone, cn("group", className))}>
      {label ?? t("Common.cta.button")}
      <ArrowRight
        aria-hidden
        className="size-[1.1em] shrink-0 transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
      />
    </a>
  )
}

export function WhatsAppAction({ tone = "paper", className }: { tone?: Tone; className?: string }) {
  const { t } = useI18n()
  const href = useWhatsAppHref()
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={actionClass(tone, cn("group", className))}>
      <FaWhatsapp aria-hidden className="size-5 transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-rotate-12 group-hover:scale-110" />
      {t("Common.cta.whatsapp")}
    </a>
  )
}
