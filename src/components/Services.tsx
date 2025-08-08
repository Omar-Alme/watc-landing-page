"use client"

import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import {
    Factory,
    ShieldCheck,
    Truck,
    Briefcase,
} from "lucide-react"
import React, { useRef, useEffect, useState } from "react"

type Service = {
    title: string
    description: string
    image: string
    icon: React.ReactNode
}

const SERVICES: Service[] = [
    {
        title: "Factory Sourcing",
        description:
            "We connect you with trusted manufacturers tailored to your product, MOQ, and pricing needs.",
        image: "/images/image1.png",
        icon: <Factory className="h-5 w-5 text-emerald-600" />,
    },
    {
        title: "Quality Inspections",
        description:
            "On-site product checks, factory audits, and pre-shipment inspections for peace of mind.",
        image: "/images/image2.png",
        icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    },
    {
        title: "Shipping & Logistics",
        description:
            "We coordinate freight, customs, documentation, and global container shipping end-to-end.",
        image: "/images/image3.png",
        icon: <Truck className="h-5 w-5 text-emerald-600" />,
    },
    {
        title: "Export Consulting",
        description:
            "From contracts to compliance — we help you navigate China trade with zero friction.",
        image: "/images/shippingcontainer.png",
        icon: <Briefcase className="h-5 w-5 text-emerald-600" />,
    },
]

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
    const sectionRef = useRef<HTMLElement>(null)
    const [lineHeight, setLineHeight] = useState(0)

    // Auto-size vertical timeline between first and last items on desktop
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const cards = Array.from(el.querySelectorAll("[data-service-card]")) as HTMLElement[]
        if (cards.length < 2) return
        const top = cards[0].offsetTop + cards[0].offsetHeight / 2
        const last = cards[cards.length - 1]
        const bottom = last.offsetTop + last.offsetHeight / 2
        setLineHeight(bottom - top)
    }, [])

    return (
        <MotionConfig reducedMotion="user">
            <section
                ref={sectionRef}
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
                        Our Services
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
                        From Sourcing to Shipping — We Handle It All
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={2}
                        className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground"
                    >
                        Whether you&apos;re launching a new product or scaling up operations, we cover the
                        entire supply chain—factory sourcing, quality checks, global logistics, and export
                        consulting.
                    </motion.p>

                    {/* Vertical dotted line (desktop only) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[260px] hidden -translate-x-1/2 md:block"
                        style={{ height: lineHeight || 0 }}
                    >
                        <div
                            className="
                h-full w-px
                bg-[linear-gradient(to_bottom,transparent,transparent_6px,rgba(16,185,129,0.6)_6px,rgba(16,185,129,0.6)_8px)]
                [background-size:1px_14px]
                opacity-70
                dark:opacity-60
              "
                        />
                    </div>

                    {/* Cards */}
                    <div className="relative space-y-24">
                        {SERVICES.map((s, i) => {
                            const even = i % 2 === 0
                            return (
                                <motion.article
                                    key={s.title}
                                    data-service-card
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.4 }}
                                    custom={i + 3}
                                    className={`relative grid items-center gap-8 md:gap-16 ${even ? "md:grid-cols-[1fr_1fr]" : "md:grid-cols-[1fr_1fr] md:[&>*:first-child]:order-2"
                                        }`}
                                >
                                    {/* Timeline node (desktop) */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                                    >
                                        <span className="block h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_4px_#fff] dark:shadow-[0_0_0_4px_#0a0a0a]" />
                                    </div>

                                    {/* Copy */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 shadow-sm dark:bg-emerald-900/30">
                                                {s.icon}
                                            </div>
                                            <h3 className="text-2xl font-semibold text-foreground">{s.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                                    </div>

                                    {/* Image */}
                                    <motion.div
                                        whileHover={reduce ? {} : { y: -2 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="
                      relative h-64 w-full overflow-hidden rounded-xl border border-border/60 shadow-sm md:h-72
                      bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10
                    "
                                    >
                                        <Image
                                            src={s.image}
                                            alt={s.title}
                                            fill
                                            sizes="(min-width: 768px) 560px, 100vw"
                                            className="object-cover"
                                            priority={i === 0}
                                        />
                                        {/* subtle inner overlay for readability */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />
                                    </motion.div>
                                </motion.article>
                            )
                        })}
                    </div>
                </div>
            </section>
        </MotionConfig>
    )
}
