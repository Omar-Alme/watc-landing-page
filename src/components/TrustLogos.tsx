"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const logos = [
    "brand1.png", "brand1.png", "brand1.png", "brand1.png", "brand1.png",
    "brand1.png", "brand1.png", "brand1.png", "brand1.png", "brand1.png",
]

export function TrustLogos() {
    return (
        <section className="w-full py-16 bg-white px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-medium text-green-600 mb-2 block"
                >
                    Trusted By Global Clients
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-semibold text-center text-foreground mb-10"
                >
                    Brands, wholesalers & startups across 15+ countries trust us to deliver
                </motion.h2>

                {/* Looping Logos */}
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-12 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {logos.map((logo, i) => (
                            <div key={i} className="w-36 h-14 relative grayscale hover:grayscale-0 transition">
                                <Image
                                    src={`/images/${logo}`}
                                    alt={`Trusted brand ${i}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
