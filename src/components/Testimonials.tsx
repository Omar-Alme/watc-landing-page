"use client"

import { MotionConfig, motion } from "framer-motion"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react"

type Testimonial = {
    label: string
    quote: string
    description: string
    name: string
    roleCompany?: string
    date: string
    avatar?: string
    photo?: string
}

const TESTIMONIALS: Testimonial[] = [
    {
        label: "Cosmetic Line",
        quote: "Genius supply-chain system",
        description:
            "We've been working with World Associates since March 2024, and our supply chain has never been better. The team genuinely cares about brand success and handled our increasing volume with ease.",
        name: "Rai",
        roleCompany: "COO at Smooche",
        date: "11 September 2024",
        avatar: "/images/avatars/rai.png",
        photo: "/images/testimonials/cosmetics.jpg",
    },
    {
        label: "Standard Line",
        quote: "One of the best decisions we made this year",
        description:
            "Packages are shipped faster and more reliably, which made a massive difference for us. Our account manager is always responsive. They really understand sourcing and offer excellent growth advice.",
        name: "Musa",
        roleCompany: "Co-Founder at Eyekonik",
        date: "11 October 2024",
        avatar: "/images/avatars/musa.png",
        photo: "/images/testimonials/boxes.jpg",
    },
    {
        label: "Premium Line",
        quote: "World Associates is a game-changer",
        description:
            "We were struggling with quality issues and delays. Since partnering with World Associates, our products arrive on time and meet our standards. Their team is proactive and solutions-oriented.",
        name: "Aisha",
        roleCompany: "Founder at Luxe Goods",
        date: "11 November 2024",
        avatar: "/images/avatars/aisha.png",
        photo: "/images/testimonials/warehouse.jpg",
    },
]

// simple entrance variant
const fade = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.08 * i } }),
}

export function Testimonials() {
    // const reduce = useReducedMotion()

    return (
        <MotionConfig reducedMotion="user">
            <section id="testimonials" className="w-full bg-white py-28 px-6 dark:bg-neutral-950">
                <div className="mx-auto max-w-6xl">
                    <motion.span
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={0}
                        className="mb-2 block text-center text-xl font-medium text-emerald-700 dark:text-emerald-400"
                    >
                        Testimonials
                    </motion.span>

                    <motion.h2
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={1}
                        className="mb-12 text-center text-4xl font-bold text-foreground"
                    >
                        What clients say about working with us
                    </motion.h2>

                    <Carousel
                        opts={{ align: "center", loop: true }}
                        // pause on hover/focus and user interaction
                        plugins={[
                            Autoplay({
                                delay: 6000,
                                stopOnInteraction: true,
                                stopOnMouseEnter: true,
                            }),
                        ]}
                        className="group overflow-visible"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {TESTIMONIALS.map((t, i) => (
                                <CarouselItem
                                    key={t.name + i}
                                    className="pl-4 md:pl-6 basis-[92%] md:basis-[70%] xl:basis-[60%]"
                                >
                                    <motion.figure
                                        variants={fade}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.3 }}
                                        custom={i + 2}
                                        className="
                      grid min-h-[420px] grid-cols-1 overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm
                      md:min-h-[460px] md:grid-cols-[1.1fr_0.9fr] dark:bg-neutral-900
                    "
                                    >
                                        {/* Text panel */}
                                        <div className="flex flex-col justify-between p-6 md:p-8">
                                            <div>
                                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    {t.label}
                                                </span>

                                                <blockquote className="mt-4">
                                                    <p className="text-xl font-semibold leading-snug text-foreground">
                                                        “{t.quote}”
                                                    </p>
                                                    <p className="mt-2 text-muted-foreground">{t.description}</p>
                                                </blockquote>
                                            </div>

                                            <figcaption className="mt-6 flex items-center gap-3">
                                                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white dark:ring-neutral-900">
                                                    <Image
                                                        src={t.avatar || "/images/avatar-fallback.png"}
                                                        alt=""
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="text-sm">
                                                    <div className="font-medium text-foreground">
                                                        {t.name}
                                                        {t.roleCompany ? (
                                                            <span className="text-muted-foreground">, {t.roleCompany}</span>
                                                        ) : null}
                                                        <span className="ml-2 inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                            Verified
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">Date: {t.date}</div>
                                                </div>
                                            </figcaption>
                                        </div>

                                        {/* Image panel */}
                                        <div className="relative">
                                            <Image
                                                src={t.photo || "/images/man.png"}
                                                alt=""
                                                fill
                                                sizes="(min-width: 1024px) 520px, 100vw"
                                                className="object-cover"
                                                priority={i === 0}
                                            />
                                            {/* overlay for readability */}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent dark:from-black/35" />
                                        </div>
                                    </motion.figure>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious
                            className="
                -left-4 md:-left-6
                bg-white/90 backdrop-blur hover:bg-white
                dark:bg-neutral-900/80 dark:hover:bg-neutral-900
              "
                            aria-label="Previous testimonial"
                        />
                        <CarouselNext
                            className="
                -right-4 md:-right-6
                bg-white/90 backdrop-blur hover:bg-white
                dark:bg-neutral-900/80 dark:hover:bg-neutral-900
              "
                            aria-label="Next testimonial"
                        />
                    </Carousel>

                    {/* subtle helper text */}
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                        Hover or focus to pause. Swipe on mobile.
                    </p>
                </div>
            </section>
        </MotionConfig>
    )
}
