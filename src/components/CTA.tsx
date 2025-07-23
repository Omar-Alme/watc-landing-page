"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTA() {
    return (
        <section className="w-full bg-green-50 py-24 px-6 border-t border-muted/40">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                >
                    Ready to Start Sourcing with Confidence?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-muted-foreground mb-8 text-lg"
                >
                    Book a free consultation — no obligations, just honest advice from our team in China.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <Button size="lg" asChild>
                        <a href="#contact">Book Free Consultation</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
