'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaWeixin, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n"

export function Footer() {
    const [openWeChat, setOpenWeChat] = useState(false)
    const { t, toLocaleDigits } = useI18n()

    return (
        <footer
            className="w-full border-t border-border bg-background/80 px-6 py-12 backdrop-blur supports-[backdrop-filter]:bg-background/70"
            aria-labelledby="footer-heading"
        >
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-sm text-muted-foreground md:grid-cols-3">
                {/* Brand / About */}
                <div>
                    {/* light/dark logo swap */}
                    <div className="mb-3 flex items-center gap-3">
                        <Image
                            src="/images/dark-logo.png"
                            alt="World Associates logo"
                            width={80}
                            height={40}
                            className="dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/light-logo.png"
                            alt="World Associates logo"
                            width={80}
                            height={40}
                            className="hidden dark:block"
                            priority
                        />
                    </div>

                    <h2 id="footer-heading" className="mb-2 text-base font-semibold text-foreground">
                        World Associates Trading Company
                    </h2>
                    <p>{t("Footer.about1")}</p>
                    <p>{t("Footer.about2")}</p>
                </div>

                {/* Services / Quick links */}
                <nav aria-label="Footer navigation">
                    <h3 className="mb-2 text-base font-semibold text-foreground">{t("Footer.services")}</h3>
                    <ul className="space-y-1">
                        <li>
                            <a href="#services" className="hover:text-foreground">
                                {t("Services.items.sourcing.title")}
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-foreground">
                                {t("Services.items.inspection.title")}
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-foreground">
                                {t("Services.items.shipping.title")}
                            </a>
                        </li>
                        <li>
                            <a href="#services" className="hover:text-foreground">
                                {t("Services.items.consulting.title")}
                            </a>
                        </li>
                    </ul>
                    <div className="mt-4">
                        <a href="#workflow" className="underline underline-offset-4 hover:no-underline">
                            {t("Footer.seeHow")}
                        </a>
                    </div>
                </nav>

                {/* Contact / Social */}
                <div>
                    <h3 className="mb-2 text-base font-semibold text-foreground">{t("Footer.contact")}</h3>
                    <ul className="space-y-2">
                        <li>
                            {t("Footer.emailLabel")} {" "}
                            <a href="mailto:watcglobal@gmail.com" className="underline underline-offset-4 hover:no-underline">
                                watcglobal@gmail.com
                            </a>
                        </li>
                        <li className="mt-2">
                            <div className="flex items-center gap-4 text-lg">
                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/46738907053"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 rounded"
                                    title="Chat on WhatsApp"
                                >
                                    <FaWhatsapp className="text-emerald-500" />
                                </a>

                                {/* WeChat (Dialog) */}
                                <Dialog open={openWeChat} onOpenChange={setOpenWeChat}>
                                    <DialogTrigger asChild>
                                        <button
                                            aria-label="WeChat QR"
                                            className="transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 rounded cursor-pointer"
                                            title="Show WeChat QR"
                                        >
                                            <FaWeixin className="text-emerald-600" />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xs rounded-xl p-0">
                                        <div className="p-4 text-center">
                                            <h4 className="mb-3 text-sm font-semibold text-foreground">{t("Footer.scanWeChat")}</h4>
                                            <Image
                                                src="/images/wechatqr.png"
                                                alt="WeChat QR code"
                                                width={260}
                                                height={260}
                                                className="mx-auto"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/company/gz-world-associates-consultants/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 rounded"
                                    title="Company on LinkedIn"
                                >
                                    <FaLinkedin className="text-sky-700 dark:text-sky-500" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
                <p>{t("Footer.copyright").replace("{year}", toLocaleDigits(String(new Date().getFullYear())))}</p>
                <div className="flex items-center gap-4">
                        <a href="#faq" className="hover:text-foreground">
                         {t("Common.nav.faq")}
                    </a>
                    <a href="#contact" className="hover:text-foreground">
                        {t("Footer.contact")}
                    </a>
                    <a href="#why-us" className="hover:text-foreground">
                        {t("Common.nav.why")}
                    </a>
                    <a href="#services" className="hover:text-foreground">
                        {t("Common.nav.services")}
                    </a>
                    <Link href="/" className="hover:text-foreground">
                        {t("Footer.backToTop")}
                    </Link>
                </div>
            </div>
        </footer>
    )
}
