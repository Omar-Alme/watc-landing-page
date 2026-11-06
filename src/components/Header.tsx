"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BookAction, WhatsAppAction } from "@/components/Actions"
import { useI18n } from "@/lib/i18n"

type NavItem = { href: string; label: string }

const LOCALES = [
    { code: "en", label: "English", flag: "/flags/gb.svg" },
    { code: "ar", label: "العربية", flag: "/flags/sa.svg" },
] as const

export function Header() {
    const pathname = usePathname()
    const { t, locale, setLocale } = useI18n()
    const [langOpen, setLangOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const langRef = useRef<HTMLDivElement | null>(null)

    // On other pages, anchors point back to the home page sections
    const base = pathname === "/" ? "" : "/"

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!langRef.current) return
            if (e.target instanceof Node && !langRef.current.contains(e.target)) {
                setLangOpen(false)
            }
        }
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setLangOpen(false)
        }
        document.addEventListener("click", onDocClick)
        document.addEventListener("keydown", onEsc)
        return () => {
            document.removeEventListener("click", onDocClick)
            document.removeEventListener("keydown", onEsc)
        }
    }, [])

    const NAV: NavItem[] = useMemo(
        () => [
            { href: `${base}#services`, label: t("Common.nav.services") },
            { href: `${base}#workflow`, label: t("Common.nav.workflow") },
            { href: `${base}#why-us`, label: t("Common.nav.why") },
            { href: `${base}#faq`, label: t("Common.nav.faq") },
        ],
        [t, base]
    )

    // Reading progress, and which section is under the header
    const progressRef = useRef<HTMLDivElement | null>(null)
    const [activeId, setActiveId] = useState<string | null>(null)
    useEffect(() => {
        if (pathname !== "/") return
        const ids = ["services", "why-us", "workflow", "faq"]
        let frame = 0
        const update = () => {
            frame = 0
            const max = document.documentElement.scrollHeight - window.innerHeight
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
            }
            const line = window.innerHeight * 0.35
            let found: string | null = null
            for (const id of ids) {
                const el = document.getElementById(id)
                if (!el) continue
                const { top, bottom } = el.getBoundingClientRect()
                if (top <= line && bottom > line) found = id
            }
            setActiveId(found)
        }
        const onScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [pathname])

    const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-navy text-on-navy" aria-label="Site header">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-10 focus:bg-green focus:px-3 focus:py-2 focus:text-sm focus:text-white"
            >
                {t("Common.skip")}
            </a>

            <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8">
                <Link href="/" className="flex items-center gap-3" aria-label={t("Common.brand")}>
                    <Image
                        src="/images/dark-logo.png"
                        alt=""
                        width={36}
                        height={36}
                        className="invert"
                        priority
                    />
                    <span className="text-[17px] font-semibold tracking-tight">{t("Common.short")}</span>
                </Link>

                <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
                    {NAV.map((item) => {
                        const isActive = activeId !== null && item.href.endsWith(`#${activeId}`)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "true" : undefined}
                                className={`group relative px-3 py-2 text-[15px] transition-colors hover:text-white ${isActive ? "text-white" : "text-on-navy-soft"}`}
                            >
                                {item.label}
                                <span
                                    aria-hidden
                                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-lift transition-transform duration-300 ease-[var(--ease-out-strong)] rtl:origin-right ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                                />
                            </Link>
                        )
                    })}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <div className="relative" ref={langRef}>
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            aria-label={t("Common.language")}
                            className="press flex h-10 items-center gap-2 px-3 text-sm text-on-navy-soft hover:bg-navy-2 hover:text-white"
                        >
                            <Image src={current.flag} alt="" width={18} height={12} />
                            <span className="font-medium">{locale.toUpperCase()}</span>
                            <svg width="10" height="10" viewBox="0 0 20 20" aria-hidden>
                                <path d="M5 7l5 6 5-6z" fill="currentColor" />
                            </svg>
                        </button>
                        {langOpen && (
                            <div
                                role="listbox"
                                aria-label={t("Common.language")}
                                className="absolute end-0 top-full z-20 mt-1 w-40 origin-top bg-paper py-1 text-ink shadow-[0_12px_32px_rgba(0,0,0,0.28)] animate-in fade-in-0 zoom-in-95 duration-150"
                            >
                                {LOCALES.map((l) => (
                                    <button
                                        key={l.code}
                                        type="button"
                                        role="option"
                                        aria-selected={locale === l.code}
                                        onClick={() => {
                                            setLocale(l.code)
                                            setLangOpen(false)
                                        }}
                                        className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-start text-sm hover:bg-paper-2 ${locale === l.code ? "font-semibold" : ""}`}
                                    >
                                        <Image src={l.flag} alt="" width={18} height={12} />
                                        <span>{l.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <BookAction label={t("Common.cta.short")} className="h-11 min-h-11 px-5 text-[15px]" />
                </div>

                {/* Phone and tablet */}
                <div className="flex items-center gap-2 lg:hidden">
                    <BookAction label={t("Common.cta.short")} className="hidden h-10 min-h-10 px-4 text-sm sm:inline-flex" />
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="press flex h-10 items-center gap-2 bg-navy-2 px-3 text-sm font-medium"
                                aria-label={t("Common.menu")}
                            >
                                <Menu className="size-5" aria-hidden />
                                {t("Common.menu")}
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side={locale === "ar" ? "left" : "right"}
                            className="w-[320px] gap-0 border-0 bg-navy p-0 text-on-navy sm:w-[380px]"
                        >
                            <SheetTitle className="sr-only">{t("Common.menu")}</SheetTitle>
                            <div className="flex flex-col gap-1 px-6 pt-20">
                                {NAV.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="py-3 text-2xl font-medium tracking-tight hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8 flex flex-col gap-2 px-6">
                                <BookAction className="w-full" />
                                <WhatsAppAction className="w-full" />
                            </div>
                            <div className="mt-8 flex gap-2 px-6" role="group" aria-label={t("Common.language")}>
                                {LOCALES.map((l) => (
                                    <button
                                        key={l.code}
                                        type="button"
                                        aria-pressed={locale === l.code}
                                        onClick={() => setLocale(l.code)}
                                        className={`press flex h-11 flex-1 items-center justify-center gap-2 text-sm ${locale === l.code ? "bg-on-navy text-ink" : "bg-navy-2 text-on-navy"}`}
                                    >
                                        <Image src={l.flag} alt="" width={18} height={12} />
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div
                ref={progressRef}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-lift rtl:origin-right"
            />
        </header>
    )
}
