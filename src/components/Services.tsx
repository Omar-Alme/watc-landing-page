"use client"

import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import {
    Factory,
    ShieldCheck,
    Truck,
    Briefcase,
} from "lucide-react"
import React, { useMemo } from "react"
import { useI18n } from "@/lib/i18n"

type Service = {
    title: string
    description: string
    image: string
    icon: React.ReactNode
}

function useServiceItems(t: (k: string) => string): Service[] {
    return useMemo(
        () => [
            {
                title: t("Services.items.sourcing.title"),
                description: t("Services.items.sourcing.desc"),
                image: "/images/image1.png",
                icon: <Factory className="h-5 w-5 text-emerald-600" />,
            },
            {
                title: t("Services.items.inspection.title"),
                description: t("Services.items.inspection.desc"),
                image: "/images/image2.png",
                icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
            },
            {
                title: t("Services.items.shipping.title"),
                description: t("Services.items.shipping.desc"),
                image: "/images/image3.png",
                icon: <Truck className="h-5 w-5 text-emerald-600" />,
            },
            {
                title: t("Services.items.consulting.title"),
                description: t("Services.items.consulting.desc"),
                image: "/images/shippingcontainer.png",
                icon: <Briefcase className="h-5 w-5 text-emerald-600" />,
            },
        ],
        [t]
    )
}

// Framer variants
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.08 * i },
    }),
}

export function Services() {
    const reduce = useReducedMotion()
    const { t } = useI18n()
    const SERVICES = useServiceItems(t)

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="services"
                aria-labelledby="services-title"
                className="relative w-full bg-white py-28 px-6 dark:bg-neutral-950"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Heading */}
                    <motion.span
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={0}
                        className="mb-2 block text-center text-xl font-medium text-emerald-700 dark:text-emerald-400"
                    >
                        {t("Services.eyebrow")}
                    </motion.span>

                    <motion.h2
                        id="services-title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={1}
                        className="mb-6 text-center text-4xl font-bold text-foreground"
                    >
                        {t("Services.title")}
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={2}
                        className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground"
                    >
                        {t("Services.subtitle")}
                    </motion.p>

                    {/* Timeline */}
                    <div className="relative mt-12">
                        {/* center line (desktop) */}
                        <div
                            aria-hidden
                            className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
                        >
                            <div className="h-full w-px bg-[linear-gradient(to_bottom,transparent,transparent_8px,rgba(16,185,129,0.55)_8px,rgba(16,185,129,0.55)_10px)] [background-size:1px_18px] opacity-70 dark:opacity-60" />
                        </div>

                        <div className="relative space-y-16">
                            {SERVICES.map((s, i) => {
                                const isLeft = i % 2 === 0
                                return (
                                    <motion.article
                                        key={s.title}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.35 }}
                                        custom={i + 3}
                                        className={`relative grid items-center gap-8 md:grid-cols-2 ${isLeft ? "" : "md:[&>*:first-child]:order-2"}`}
                                    >
                                        {/* node dot (desktop) */}
                                        <div
                                            aria-hidden
                                            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                                        >
                                            <span className="block h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_4px_#fff] dark:shadow-[0_0_0_4px_#0a0a0a]" />
                                        </div>

                                        {/* Copy card */}
                                        <div className="group overflow-hidden rounded-2xl border border-border/60 bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-neutral-900">
                                            <div className="mb-3 flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 shadow-sm dark:bg-emerald-900/30">
                                                    {s.icon}
                                                </div>
                                                <h3 className="text-2xl font-semibold text-foreground">{s.title}</h3>
                                            </div>
                                            <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{s.description}</p>
                                        </div>

                                        {/* Image card */}
                                        <motion.div
                                            whileHover={reduce ? {} : { y: -2 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-50/50 to-transparent shadow-sm dark:from-emerald-900/10 md:h-56"
                                        >
                                            <Image
                                                src={s.image}
                                                alt={s.title}
                                                fill
                                                sizes="(min-width: 768px) 560px, 100vw"
                                                className="object-cover"
                                                priority={i === 0}
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
                                        </motion.div>
                                    </motion.article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    )
}
