"use client"

import { useState } from "react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ShieldCheck} from "lucide-react"

export function EstablishedCertificate() {
    const [open, setOpen] = useState(false)
    const reduce = useReducedMotion()

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="certificate"
                aria-labelledby="cert-title"
                className="w-full bg-white py-28 px-6 border-t border-muted/40 dark:bg-neutral-950"
            >
                <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
                    {/* Left: Text */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                            className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300"
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Certified & Established
                        </motion.span>

                        <motion.h2
                            id="cert-title"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
                        >
                            20+ Years of Verified Operations in China
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            className="text-base leading-relaxed text-muted-foreground md:text-lg"
                        >
                            Our official business registration certificate from China verifies legal operations
                            since <strong>2004</strong>—supporting global brands with compliant sourcing, quality
                            checks, and end-to-end logistics.
                        </motion.p>

                        {/* quick facts */}
                        <motion.ul
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: 0.1 }}
                            className="mt-5 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2"
                        >
                            <li>• Registered entity: Mainland China</li>
                            <li>• Since: 2004</li>
                            <li>• On-ground hubs: Guangzhou & Hong Kong</li>
                            <li>• Certificate available on request</li>
                        </motion.ul>
                    </div>

                    {/* Right: Zoomable Certificate */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <figure className="m-0">
                            <DialogTrigger asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45 }}
                                    className="
                    relative cursor-zoom-in overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm
                    dark:bg-neutral-900
                  "
                                >
                                    {/* tiny corner hint */}
                                    <div className="pointer-events-none absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                                        Click to zoom
                                    </div>

                                    <Image
                                        src="/images/license.png"
                                        alt="Business registration certificate (thumbnail)"
                                        width={800}
                                        height={1150}
                                        className={`h-auto w-full object-contain ${reduce ? "" : "transition-transform duration-300 hover:scale-[1.01]"}`}
                                        loading="lazy"
                                    />
                                </motion.div>
                            </DialogTrigger>

                            <figcaption className="mt-3 text-xs text-muted-foreground">
                                Official registration certificate (sample preview). Personal details redacted.
                            </figcaption>
                        </figure>

                        <DialogContent className="p-0 sm:w-[95vw] sm:max-w-[95vw]">
                            <div className="flex max-h-[85vh] items-center justify-center overflow-auto bg-black/5 p-3 dark:bg-black/20">
                                <Image
                                    src="/images/license.png"
                                    alt="Business registration certificate — full size"
                                    width={2400}
                                    height={3300}
                                    className="h-auto max-h-[85vh] w-auto max-w-full object-contain"
                                    priority
                                />
                            </div>
                        </DialogContent>


                    </Dialog>
                </div>
            </section>
        </MotionConfig>
    )
}
