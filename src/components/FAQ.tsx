"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What types of products can you help me source?",
        answer: "We specialize in textiles, clothing, furniture, building materials, and industrial goods — thanks to long-standing factory relationships.",
    },
    {
        question: "Do you work with small businesses or only large orders?",
        answer: "We work with both. While bulk sourcing is our main service, we also support startups placing their first container orders.",
    },
    {
        question: "How do I know your factories are legit?",
        answer: "All factories are verified through personal visits and long-term partnerships. No Alibaba resellers or unverified middlemen.",
    },
    {
        question: "Can I track my shipments?",
        answer: "Yes, we provide weekly updates, shipping documents, and photos from our team in China during inspections.",
    },
]

export function FAQ() {
    return (
        <section className="w-full bg-muted/50 py-28 px-6" id="faq">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-8"
                >
                    Frequently Asked Questions
                </motion.h2>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-muted rounded-md shadow-sm">
                            <AccordionTrigger className="text-left px-4 py-3 font-medium">{item.question}</AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
