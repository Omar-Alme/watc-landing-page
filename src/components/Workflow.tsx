"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

function useSteps(t: (k: string) => string) {
  // We'll read array entries directly using index-based keys to avoid passing arrays via t
  return [0,1,2,3,4,5,6].map((i) => ({
    title: t(`Workflow.steps.${i}.title`),
    description: t(`Workflow.steps.${i}.desc`),
  }))
}

export function WorkflowSection() {
  const { t } = useI18n()
  const steps = useSteps(t)
  return (
    <section className="w-full bg-white py-28 px-6 border-t border-muted/40" id="workflow">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-lg font-medium text-emerald-700 mb-2 block text-center"
        >
          {t("Workflow.eyebrow")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-20 text-foreground"
        >
          {t("Workflow.title")}
        </motion.h2>

        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-muted/30" />

          <div className="flex flex-col gap-16 relative z-10">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              const stepNumber = i + 1

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                  className={`flex flex-col md:flex-row items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Number dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold text-sm z-10 md:mx-6 my-4 md:my-0">
                    {stepNumber}
                  </div>

                  {/* Card (cleaner styles only) */}
                  <div className="relative w-full max-w-md rounded-xl border border-border/60 bg-white p-6 shadow-sm">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {t("Workflow.step")} {stepNumber}
                    </p>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                    {/* subtle bottom accent for consistency with your design language */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/25 to-emerald-500/0"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
