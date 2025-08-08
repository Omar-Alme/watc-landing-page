"use client"

import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import React from "react"

type Logo = { src: string; alt: string }

const LOGOS: Logo[] = [
    { src: "brand1.png", alt: "Brand One" },
    { src: "brand2.png", alt: "Brand Two" },
    { src: "brand3.png", alt: "Brand Three" },
    { src: "brand4.png", alt: "Brand Four" },
    { src: "brand5.png", alt: "Brand Five" },
    { src: "brand6.png", alt: "Brand Six" },
    { src: "brand7.png", alt: "Brand Seven" },
    { src: "brand8.png", alt: "Brand Eight" },
    { src: "brand9.png", alt: "Brand Nine" },
    { src: "brand10.png", alt: "Brand Ten" },
]

// utility: duplicate for seamless loop
function dup<T>(arr: T[], times = 2): T[] {
    return Array.from({ length: times }).flatMap(() => arr)
}

export function TrustLogos() {
    const reduce = useReducedMotion()
    const row = dup(LOGOS, 2) // duplicated once for continuity

    // animation setup
    const marquee = {
        animate: reduce
            ? {}
            : {
                x: ["0%", "-50%"],
                transition: { duration: 22, repeat: Infinity, ease: "linear" as const },
            },
    }

    return (
        <MotionConfig reducedMotion="user">
            <section className="w-full bg-white py-16 px-6 dark:bg-neutral-950" aria-label="Trusted by">
                <div className="mx-auto max-w-6xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        className="mb-2 block text-xl font-medium text-emerald-700 dark:text-emerald-400"
                    >
                        Trusted by global clients
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="mx-auto mb-10 max-w-2xl text-balance text-2xl font-semibold text-foreground"
                    >
                        Brands, wholesalers & startups across 15+ countries trust us to deliver
                    </motion.h2>

                    {/* marquee wrapper with edge fade + pause on hover */}
                    <div
                        className="
              group relative w-full overflow-hidden
              [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
            "
                    >
                        <motion.div
                            {...marquee}
                            className="
                flex w-max items-center gap-12 pr-12
                group-hover:[animation-play-state:paused]
              "
                        >
                            {row.map((logo, i) => (
                                <LogoItem key={`${logo.src}-${i}`} logo={logo} />
                            ))}
                        </motion.div>
                    </div>

                    {/* optional: second row, opposite direction */}
                    <div
                        className="
              group relative mt-6 w-full overflow-hidden
              [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
            "
                    >
                        <motion.div
                            animate={
                                reduce
                                    ? {}
                                    : { x: ["-50%", "0%"], transition: { duration: 24, repeat: Infinity, ease: "linear" } }
                            }
                            className="flex w-max items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
                        >
                            {row.map((logo, i) => (
                                <LogoItem key={`row2-${logo.src}-${i}`} logo={logo} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    )
}

/* --- subcomponents --- */

function LogoItem({ logo }: { logo: Logo }) {
    return (
        <div
            className="
        relative h-12 w-36 shrink-0
        grayscale opacity-80 transition
        hover:grayscale-0 hover:opacity-100
        dark:grayscale dark:opacity-70 dark:hover:opacity-100
      "
            aria-label={logo.alt}
            role="img"
            title={logo.alt}
        >
            <Image
                src={`/images/${logo.src}`}
                alt={logo.alt}
                fill
                sizes="144px"
                className="object-contain"
                loading="lazy"
                decoding="async"
            />
        </div>
    )
}
