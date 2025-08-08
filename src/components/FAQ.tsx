"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of products can you help me source?",
    answer:
      "We specialize in textiles, clothing, furniture, building materials, and industrial goods — thanks to long-standing factory relationships.",
  },
  {
    question: "Do you work with small businesses or only large orders?",
    answer:
      "We work with both. While bulk sourcing is our main service, we also support startups placing their first container orders.",
  },
  {
    question: "How do I know your factories are legit?",
    answer:
      "All factories are verified through personal visits and long-term partnerships. No Alibaba resellers or unverified middlemen.",
  },
  {
    question: "Can I track my shipments?",
    answer:
      "Yes, we provide weekly updates, shipping documents, and photos from our team in China during inspections.",
  },
]

export function FAQ() {
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
          FAQ
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl"
        >
          Frequently asked questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground"
        >
          Can’t find what you’re looking for?{" "}
          <a href="#contact" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            Contact our team
          </a>
          .
        </motion.p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, i) => (
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
