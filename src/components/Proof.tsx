"use client"

import Image from "next/image"
import { ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"
import { useTilt } from "@/lib/use-tilt"

/** A rubber stamp that lands on the licence once the card is in view; its ring turns slowly. */
function Stamp() {
    const { t, toLocaleDigits } = useI18n()
    const ring = toLocaleDigits(t("Proof.stamp"))
    return (
        <svg viewBox="0 0 120 120" aria-hidden className="stamp pointer-events-none absolute -end-4 -top-10 size-28 sm:-end-8 md:size-32">
            <defs>
                <path id="stamp-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <circle cx="60" cy="60" r="57" fill="none" stroke="var(--green)" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="35" fill="none" stroke="var(--green)" strokeWidth="1.5" />
            <g className="stamp-ring">
                <text fill="var(--green)" style={{ font: "600 8.5px var(--font-sans)" }}>
                    {/* Anchored from the middle so right-to-left text stays on the ring too */}
                    <textPath href="#stamp-ring" startOffset="50%" textAnchor="middle" textLength="280" lengthAdjust="spacingAndGlyphs">
                        {ring.toUpperCase()}
                    </textPath>
                </text>
            </g>
            <text
                x="60"
                y="68"
                textAnchor="middle"
                fill="var(--green)"
                style={{ font: "700 22px var(--font-sans)", letterSpacing: "-0.02em" }}
            >
                {toLocaleDigits("2004")}
            </text>
        </svg>
    )
}

/**
 * Replaces the logo cloud. With one client logo, the proof is the company itself:
 * the licence, stamped, and who it was issued to.
 */
export function Proof() {
    const { t, locale } = useI18n()
    const [ref, inView] = useInView()
    const tilt = useTilt(6)

    return (
        <section aria-labelledby="proof-title" className="overflow-hidden bg-navy px-4 pt-24 md:pt-32">
            <div ref={ref} data-in={inView} className="[perspective:1400px]">
                <div
                    ref={tilt.ref}
                    onPointerMove={tilt.onPointerMove}
                    onPointerLeave={tilt.onPointerLeave}
                    data-reveal
                    data-in={inView}
                    className={`tilt mx-auto -mb-28 w-full max-w-[760px] bg-paper px-7 pt-12 pb-40 text-center text-ink sm:px-14 sm:pt-14 md:-mb-24 ${locale === "ar" ? "-rotate-1 md:-rotate-[1.5deg]" : "rotate-1 md:rotate-[1.5deg]"}`}
                >
                    <h2 id="proof-title" className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">
                        {t("Proof.title")}
                    </h2>
                    <p className="mx-auto mt-3 max-w-[44ch] text-body text-ink-soft">{t("Proof.lead")}</p>

                    <div className="relative mt-10">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="group relative block w-full cursor-zoom-in overflow-hidden bg-paper-2"
                                    aria-label={t("Proof.zoom")}
                                >
                                    <Image
                                        src="/images/license.png"
                                        alt={t("Proof.licenceAlt")}
                                        width={2338}
                                        height={1653}
                                        sizes="(min-width: 768px) 650px, 90vw"
                                        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.035]"
                                    />
                                    <span className="absolute end-3 bottom-3 inline-flex translate-y-1 items-center gap-1.5 bg-ink px-3 py-1.5 text-sm text-on-navy opacity-90 transition-[translate,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <ZoomIn className="size-4" aria-hidden />
                                        {t("Proof.zoom")}
                                    </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[min(96vw,1400px)] border-0 bg-paper p-2 sm:max-w-[min(96vw,1400px)]">
                                <DialogTitle className="sr-only">{t("Proof.fullAlt")}</DialogTitle>
                                <div className="max-h-[86vh] overflow-auto">
                                    <Image
                                        src="/images/license.png"
                                        alt={t("Proof.fullAlt")}
                                        width={2338}
                                        height={1653}
                                        sizes="96vw"
                                        className="h-auto w-full"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Stamp />
                    </div>

                    <p className="mt-9 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.7]">
                        <span lang="zh">{t("Proof.entity")}</span>
                        {" ·  "}
                        {t("Proof.registered")}
                        {" ·  "}
                        {t("Proof.district")}
                    </p>
                </div>
            </div>
        </section>
    )
}
