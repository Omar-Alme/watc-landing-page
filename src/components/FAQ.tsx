"use client"

import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

const COUNT = 6

function Band({ index }: { index: number }) {
  const { t } = useI18n()
  const [ref, inView] = useInView()
  return (
    <div
      className={`group relative transition-colors duration-500 hover:bg-green-pale ${index % 2 === 0 ? "bg-paper" : "bg-paper-2"}`}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 start-0 w-1 origin-top scale-y-0 bg-green transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-y-100"
      />
      <div
        ref={ref}
        data-reveal
        data-in={inView}
        className="mx-auto grid max-w-[1360px] gap-4 px-5 py-8 sm:px-8 md:grid-cols-12 md:gap-8 md:py-14"
      >
        <h3 className="text-[clamp(1.375rem,2.2vw,2rem)] leading-tight font-semibold tracking-tight text-ink md:col-span-5">
          {t(`FAQ.items.${index}.q`)}
        </h3>
        <p className="max-w-[60ch] text-lg leading-relaxed text-ink md:col-span-6 md:col-start-7">
          {t(`FAQ.items.${index}.a`)}
        </p>
      </div>
    </div>
  )
}

/** A band per question; every answer is visible, no toggles. */
export function FAQ() {
  const { t } = useI18n()
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="flex min-h-[30svh] items-end bg-paper-2 px-5 pt-20 pb-8 text-ink sm:px-8 md:min-h-[40svh] md:pb-10">
        <h2 id="faq-title" className="mx-auto w-full max-w-[1360px] text-[clamp(2.75rem,7vw,6.5rem)] leading-none font-semibold tracking-tight">
          {t("FAQ.title")}
        </h2>
      </div>
      {Array.from({ length: COUNT }, (_, i) => (
        <Band key={i} index={i} />
      ))}
    </section>
  )
}
