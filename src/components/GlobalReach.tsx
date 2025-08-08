"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import Image from "next/image"

export function GlobalReach() {
    const { t } = useI18n()
    return (
        <section className="w-full bg-white py-32 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className=" text-xl font-medium text-emerald-700 dark:text-emerald-400 mb-2 block"
                >
                    {t("Global.eyebrow")}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-6"
                >
                    {t("Global.title")}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-muted-foreground mb-16 max-w-2xl mx-auto"
                >
                    {t("Global.subtitle")}
                </motion.p>

                <div className="relative w-full h-[500px] md:h-[650px] rounded-lg overflow-hidden shadow border border-muted bg-white">
                    <Image
                        src="/images/worldmap.png"
                        alt={t("Global.mapAlt")}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
