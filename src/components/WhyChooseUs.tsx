"use client"

import { MotionConfig, motion } from "framer-motion"
import {
  ShieldCheck,
  Languages,
  MapPin,
  BadgeDollarSign,
  Boxes,
  Handshake,
  Timer,
} from "lucide-react"
import React from "react"

type ValueItem = {
  title: string
  description: string
  icon: keyof typeof ICONS
}

const ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ShieldCheck,
  Languages,
  MapPin,
  BadgeDollarSign,
  Boxes,
  Handshake,
  Timer,
}

const VALUES: ValueItem[] = [
  {
    title: "Verified Factories Only",
    description: "We source from factories we’ve worked with — no middlemen, no Alibaba guessing.",
    icon: "ShieldCheck",
  },
  {
    title: "No Miscommunication",
    description: "We speak English, Chinese, and Arabic — and act as your local representative.",
    icon: "Languages",
  },
  {
    title: "Real Presence in China",
    description: "With offices in Guangzhou & HK, we’re on the ground inspecting your orders personally.",
    icon: "MapPin",
  },
  {
    title: "Fixed Transparent Pricing",
    description: "No shady markups or hidden fees — just clear service rates that scale with you.",
    icon: "BadgeDollarSign",
  },
  {
    title: "End-to-End Sourcing",
    description: "From textile to tools — we help clients source clothing, furniture, and industrial goods.",
    icon: "Boxes",
  },
  {
    title: "You’re Not Alone",
    description: "We’ve helped 60+ businesses launch and scale — and we guide you every step of the way.",
    icon: "Handshake",
  },
  {
    title: "Reliable Shipping",
    description: "We coordinate container shipping, customs, and timelines — with weekly updates.",
    icon: "Timer",
  },
]

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.06 * i } }),
}

export function WhyChooseUs() {
  // const reduce = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="why-us"
        aria-labelledby="why-title"
        className="
          relative w-full py-28 px-6
          bg-muted/40 dark:bg-neutral-950
        "
      >
        {/* soft decorative backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]
                     bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:36px_36px]"
        />

        <div className="mx-auto max-w-6xl">
          <motion.span
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="mb-2 block text-center text-xl font-medium text-emerald-700 dark:text-emerald-400"
          >
            Our advantage
          </motion.span>

          <motion.h2
            id="why-title"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="mb-6 text-center text-4xl font-bold text-foreground"
          >
            Why Choose Us
          </motion.h2>

          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="mx-auto mb-14 max-w-2xl text-center text-muted-foreground"
          >
            We understand the risks of overseas sourcing. With vetted partners and boots on the
            ground, we give you confidence from inquiry to delivery.
          </motion.p>

          {/* values grid */}
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VALUES.map((v, i) => {
              const Icon = ICONS[v.icon]
              return (
                <motion.li
                  role="listitem"
                  key={v.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  custom={i + 3}
                >
                  <div
                    className="
                      group relative h-full rounded-xl border border-border/60 bg-white dark:bg-neutral-900
                      p-5 shadow-sm transition
                      hover:-translate-y-0.5 hover:shadow-md
                    "
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>

                    {/* subtle bottom accent */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute inset-x-0 bottom-0 h-1 rounded-b-xl
                        bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0
                        opacity-0 transition-opacity group-hover:opacity-100
                      "
                    />
                  </div>
                </motion.li>
              )
            })}
          </ul>

          {/* optional: mini-proof strip */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={VALUES.length + 4}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span>Verified suppliers</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
            <span>Escrow options</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block" />
            <span>Weekly order updates</span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
