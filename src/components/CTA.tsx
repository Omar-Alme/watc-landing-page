"use client"

import { BookAction, WhatsAppAction } from "@/components/Actions"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"
import { useTilt } from "@/lib/use-tilt"

/** The invitation is a reply card lying on the page, cropped by the section's edge. */
export function CTA() {
    const { t, locale } = useI18n()
    const [ref, inView] = useInView()
    const tilt = useTilt(5)

    return (
        <section aria-labelledby="cta-title" className="overflow-hidden bg-navy px-5 pt-24 sm:px-8 md:pt-32">
            <div
                ref={ref}
                data-reveal
                data-in={inView}
                className="mx-auto grid max-w-[1360px] items-end gap-12 md:grid-cols-12"
            >
                <p className="max-w-[26ch] text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug text-on-navy md:col-span-4 md:mb-40">
                    {t("CTA.lead")}
                </p>

                <div className="-mb-16 w-full [perspective:1400px] md:col-span-7 md:col-start-6 md:-mb-14">
                    <div
                        ref={tilt.ref}
                        onPointerMove={tilt.onPointerMove}
                        onPointerLeave={tilt.onPointerLeave}
                        className={`tilt bg-paper px-7 pt-12 pb-24 text-center text-ink sm:px-12 md:pt-14 md:pb-28 ${locale === "ar" ? "-rotate-1 md:-rotate-2" : "rotate-1 md:rotate-2"}`}
                    >
                        <h2 id="cta-title" className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">
                            {t("CTA.title")}
                        </h2>
                        <p className="mx-auto mt-3 max-w-[36ch] text-body text-ink">{t("CTA.body")}</p>
                        <div className="mt-8 grid gap-2">
                            <BookAction tone="ink" className="h-14 w-full" />
                            <WhatsAppAction tone="green" className="h-14 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
