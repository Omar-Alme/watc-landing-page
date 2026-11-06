"use client"

import Image from "next/image"
import { BookAction } from "@/components/Actions"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

const SLOTS = [
    { src: "/images/factory-visit.jpg", position: "50% 45%" },
    { src: "/images/inspection.jpg", position: "35% 40%" },
    { src: "/images/ship-cosco-guangzhou.jpg", position: "55% 55%" },
    { src: "/images/warehouse-guangzhou.jpg", position: "50% 70%" },
]

export function Services() {
    const { t, locale } = useI18n()
    const [statementRef, statementIn] = useInView()

    return (
        <section id="services" aria-labelledby="services-title" className="bg-paper px-5 py-20 sm:px-8 md:py-40">
            <h2 id="services-title" className="sr-only">
                {t("Services.title")}
            </h2>

            <div className="mx-auto max-w-[1360px]">
                <div ref={statementRef} data-reveal data-in={statementIn}>
                    <p className="max-w-[30em] text-[1.375rem] leading-[1.25] font-medium tracking-[-0.015em] text-ink sm:text-statement">
                        {SLOTS.map((slot, i) => (
                            <span key={slot.src} className="group/clause cursor-default">
                                <span className="transition-colors duration-300 group-hover/clause:text-green">
                                    {t(`Services.clauses.${i}`)}
                                </span>{" "}
                                <span className="relative inline-block h-[1em] w-[1.5em] translate-y-[0.14em] overflow-hidden rounded-[0.18em] align-baseline transition-[width] duration-500 ease-[var(--ease-out-strong)] sm:w-[1.9em] sm:group-hover/clause:w-[3.6em] motion-reduce:transition-none">
                                    <Image
                                        src={slot.src}
                                        alt={t(`Services.alts.${i}`)}
                                        fill
                                        sizes="160px"
                                        className="object-cover transition-transform duration-700 group-hover/clause:scale-110"
                                        style={{ objectPosition: slot.position }}
                                    />
                                </span>
                                {i < SLOTS.length - 1 ? (locale === "ar" ? "، " : ", ") : "."}
                            </span>
                        ))}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-12">
                    <div className="flex flex-col items-start gap-6 md:col-span-6 md:col-start-7">
                        <p className="text-lg text-ink">{t("Services.support")}</p>
                        <BookAction />
                    </div>
                </div>
            </div>
        </section>
    )
}
