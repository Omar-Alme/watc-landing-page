"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"

/** Counts a figure like "20+" up from zero once `run` turns true; keeps its suffix and digit script. */
function CountUp({ value, run }: { value: string; run: boolean }) {
    const { toLocaleDigits } = useI18n()
    const ascii = value.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    const target = Number(ascii.match(/\d+/)?.[0] ?? 0)
    const suffix = ascii.replace(/\d+/, "")
    const [n, setN] = useState(target)

    useEffect(() => {
        if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setN(target)
            return
        }
        let frame = 0
        const start = performance.now()
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / 1400)
            setN(Math.round(target * (1 - Math.pow(1 - p, 4))))
            if (p < 1) frame = requestAnimationFrame(tick)
        }
        setN(0)
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [run, target])

    return (
        <>
            <span aria-hidden>{toLocaleDigits(`${n}${suffix}`)}</span>
            <span className="sr-only">{value}</span>
        </>
    )
}

/** Three client-approved figures on tiles that refuse to line up. */
export function Stats() {
    const { t } = useI18n()
    const [ref, inView] = useInView()
    const [restRef, restIn] = useInView()

    return (
        <section aria-labelledby="stats-title" className="bg-paper px-5 py-20 sm:px-8 md:py-40">
            <div className="mx-auto grid max-w-[1360px] gap-2 md:grid-cols-12">
                <h2 id="stats-title" className="mb-6 text-heading font-semibold text-ink md:sr-only">
                    {t("Stats.title")}
                </h2>

                <div
                    ref={ref}
                    data-reveal
                    data-in={inView}
                    className="flex min-h-[52vw] flex-col justify-between bg-green p-6 text-white md:col-span-6 md:min-h-[min(70vh,680px)] md:p-8"
                >
                    <p className="tabular text-[clamp(3.5rem,6.4vw,6rem)] leading-none font-semibold tracking-tight">
                        <CountUp value={t("Stats.years")} run={inView} />
                    </p>
                    <p className="max-w-[22ch] text-lg">{t("Stats.yearsLabel")}</p>
                </div>

                <div className="mt-6 md:col-span-6 md:mt-0">
                    <h2
                        aria-hidden
                        className="hidden h-[min(14vh,140px)] items-end ps-2 pb-6 text-heading font-semibold text-ink md:flex"
                    >
                        {t("Stats.title")}
                    </h2>
                    <div ref={restRef} data-reveal data-in={restIn} className="grid grid-cols-2 items-start gap-2">
                        <div className="flex min-h-[48vw] flex-col justify-between bg-ink p-5 text-on-navy md:min-h-[min(44vh,420px)] md:p-7">
                            <p className="tabular text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-semibold tracking-tight">
                                <CountUp value={t("Stats.clients")} run={restIn} />
                            </p>
                            <p className="text-body">{t("Stats.clientsLabel")}</p>
                        </div>
                        <div className="mt-8 flex min-h-[40vw] flex-col justify-between bg-paper-2 p-5 text-ink md:mt-[min(12vh,120px)] md:min-h-[min(34vh,320px)] md:p-7">
                            <p className="tabular text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-semibold tracking-tight">
                                <CountUp value={t("Stats.countries")} run={restIn} />
                            </p>
                            <p className="text-body">{t("Stats.countriesLabel")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
