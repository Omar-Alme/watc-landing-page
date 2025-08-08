"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function CTA() {
    const { t } = useI18n()
    return (
        <section
            className="
        w-full border-t border-muted/40 bg-gradient-to-b from-emerald-50 to-white py-24 px-6
        dark:from-emerald-900/10 dark:to-neutral-950
      "
            aria-label="Call to action"
        >
            {/* subtle pattern */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]
                   bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:36px_36px]"
            />
            <div className="mx-auto max-w-5xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-3xl font-bold text-foreground md:text-4xl"
                >
                    {t("Common.cta.title")}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground"
                >
                    {t("Common.cta.subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
                >
                    <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500" asChild>
                        <a href="#contact" aria-label={t("Common.cta.button")}>{t("Common.cta.button")}</a>
                    </Button>
                    <a
                        href="#faq"
                        className="text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
                    >
                        {t("Common.cta.seeFaqs")}
                    </a>
                </motion.div>

                {/* micro reassurance */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className="mt-4 text-sm text-muted-foreground"
                >
                    {t("Common.cta.reassurance")}
                </motion.p>
            </div>
        </section>
    )
}
