"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative w-full bg-white text-foreground py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Trust badge */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 inline-block px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                >
                Trusted by 60+ global clients
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-3xl font-bold tracking-tight"
                >
                    Your gateway to Chinese factories and global delivery.
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
                >
                    We handle everything from factory sourcing to inspections and global shipping — so you can scale with confidence.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="mt-8"
                >
                    <Button className="bg-green-600 hover:bg-green-500 text-white" size="lg" asChild>
                        <a href="#contact">Book a Free Consultation</a>
                    </Button>
                </motion.div>
            </div>

            {/* Floating Stat Boxes */}
            <div className="absolute top-1/2 right-12 transform -translate-y-1/2 z-0 hidden lg:block">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="bg-green-50 p-4 rounded-lg mb-4 text-foreground border border-green-200"
                >
                    <div className="text-2xl font-bold">20+</div>
                    <p className="text-sm text-muted-foreground">Years of Sourcing & Export Experience in China</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                    className="bg-green-50 p-4 rounded-lg mb-4 text-foreground border border-green-200"
                >
                    <div className="text-2xl font-bold">60+</div>
                    <p className="text-sm text-muted-foreground">Clients Worldwide</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 }}
                    className="bg-green-50 p-4 rounded-lg text-foreground border border-green-200"
                >
                    <div className="text-2xl font-bold">Location</div>
                    <p className="text-sm text-muted-foreground">Based in Guangzhou & HK</p>
                </motion.div>
            </div>

            {/* Optional: soft radial background */}
            <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#00000011_1px,transparent_1px)] bg-[size:40px_40px]" />
        </section>
    )
}
