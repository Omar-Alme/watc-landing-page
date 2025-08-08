"use client"

import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i },
  }),
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative w-full overflow-hidden bg-white"
        aria-label="Intro"
      >
        {/* Subtle backdrop */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          {/* soft gradient blob */}
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
          {/* faint grid */}
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left */}
            <div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {/* trust badge */}
                <motion.div
                  custom={0}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  Trusted by 60+ global clients
                </motion.div>

                {/* headline */}
                <motion.h1
                  custom={1}
                  className="text-pretty text-4xl font-bold leading-tight tracking-tight md:text-5xl"
                >
                  Your gateway to Chinese factories — with global delivery made easy.
                </motion.h1>

                {/* subhead */}
                <motion.p
                  custom={2}
                  className="max-w-xl text-base text-muted-foreground md:text-lg"
                >
                  We handle factory sourcing, quality inspections, and worldwide shipping — so you can scale with confidence.
                </motion.p>

                {/* CTAs */}
                <motion.div custom={3} className="flex flex-wrap items-center gap-3 pt-2">
                  <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500" asChild>
                    <a href="#contact">Book a Free Consultation</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#workflow">See How It Works</a>
                  </Button>
                </motion.div>

                {/* social proof row (optional logos) */}
                <motion.div
                  custom={4}
                  className="mt-4 flex items-center gap-6 text-xs text-muted-foreground"
                >
                  <span>Verified suppliers • Escrow options • End-to-end logistics</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: compact stats card column */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } }}
                className="grid gap-4"
              >
                {[
                  { k: "20+", v: "Years of sourcing & export experience" },
                  { k: "60+", v: "Clients worldwide" },
                  { k: "Guangzhou & HK", v: "Local operations on the ground" },
                ].map((item, i) => (
                  <motion.div
                    key={item.k}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: 0.1 * i }}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm"
                  >
                    <div className="text-2xl font-semibold text-foreground">{item.k}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
