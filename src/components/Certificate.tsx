"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ShieldCheck } from "lucide-react"

export function EstablishedCertificate() {
    const [open, setOpen] = useState(false)

    return (
        <section
            className="w-full bg-white py-28 px-6 border-t border-muted/40"
            id="certificate"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 md:gap-20">
                {/* Left: Text */}
                <div>
                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-xl font-medium text-green-600 mb-3 block"
                    >
                        <span className="inline-block mr-2">
                            <ShieldCheck className="w-7 h-7 text-green-600" />
                        </span>
                        Certified & Established
                    </motion.span>

                    {/* Heading with icon */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2 mb-6"
                    >

                        20+ Years of Verified Operations in China
                    </motion.h2>

                    {/* Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-muted-foreground text-base md:text-lg leading-relaxed"
                    >
                        Our official business registration certificate from China proves we’ve been legally operating since 2004 — helping global businesses source and scale with confidence.
                    </motion.p>
                </div>

                {/* Right: Zoomable Certificate */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="cursor-zoom-in rounded-xl overflow-hidden border border-muted shadow-md"
                        >

                            <Image
                                src="/images/licence.png"
                                alt="Chinese business certificate"
                                width={600}
                                height={850}
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl p-0 bg-white">
                        <Image
                            src="/images/licence.png"
                            alt="Full Chinese certificate"
                            width={1600}
                            height={2000}
                            className="w-full h-auto object-contain rounded"
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    )
}
