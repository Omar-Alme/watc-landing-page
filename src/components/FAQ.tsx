"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n"

export function FAQ() {
  const { t } = useI18n()
  const items = [0,1,2,3].map((i) => ({
    question: t(`FAQ.items.${i}.q`),
    answer: t(`FAQ.items.${i}.a`),
  }))
  return (
    <section id="faq" className="w-full bg-muted/50 py-28 px-6 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-2 block text-center text-lg font-medium text-emerald-700 dark:text-emerald-400"
        >
          {t("FAQ.eyebrow")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl"
        >
          {t("FAQ.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground"
        >
          {t("FAQ.ctaPrefix")} {" "}
          <a href="#contact" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            {t("FAQ.ctaLink")}
          </a>
          .
        </motion.p>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="
                rounded-xl border border-border/60 bg-white shadow-sm transition
                hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20 dark:bg-neutral-900
              "
            >
              <AccordionTrigger className="px-4 py-3 text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
