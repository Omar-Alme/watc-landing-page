"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useI18n } from "@/lib/i18n"

type NavItem = { href: string; label: string }

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const { t, locale, setLocale } = useI18n()
    const [langOpen, setLangOpen] = useState(false)
    const langRef = useRef<HTMLDivElement | null>(null)

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
            { href: "#services", label: t("Common.nav.services") },
            { href: "#workflow", label: t("Common.nav.workflow") },
            { href: "#why-us", label: t("Common.nav.why") },
            { href: "#faq", label: t("Common.nav.faq") },
        ],
        [t]
    )

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            data-scrolled={scrolled}
            className="
        fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter,transform] duration-300
        supports-[backdrop-filter]:backdrop-blur-md
        "
            aria-label="Site header"
        >
            {/* subtle background + border only after scroll for a cleaner first paint */}
            <div
                className="
          mx-auto max-w-6xl px-4 sm:px-6
          "
            >
                {/* Skip link for a11y */}
                <a
                    href="#main"
                    className="
            sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
            rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground shadow
          "
                >
                    Skip to content
                </a>

                <div
                    className="
            mt-3 flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-5
            transition-all
            data-[scrolled=true]:mt-2
            data-[scrolled=true]:shadow-sm
            data-[scrolled=true]:border data-[scrolled=true]:border-border/50
            data-[scrolled=true]:bg-white/75 dark:data-[scrolled=true]:bg-neutral-900/60
          "
                    data-scrolled={scrolled}
                >
                    {/* Left: Logo + Name */}
                    <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
                        {/* Light/Dark logo swap */}
                        <Image
                            src="/images/dark-logo.png"
                            alt={t("Common.brand")}
                            width={40}
                            height={40}
                            className="rounded-md dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/light-logo.png"
                            alt={t("Common.brand")}
                            width={40}
                            height={40}
                            className="rounded-md hidden dark:block"
                            priority
                        />
                        <span className="text-sm sm:text-base font-semibold tracking-tight">
                            {t("Common.brand")}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV.map((item) => (
                            <NavLink key={item.href} href={item.href} active={pathname === item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right side: Lang dropdown + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setLangOpen((v) => !v)}
                                aria-haspopup="listbox"
                                aria-expanded={langOpen}
                                className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-muted/40"
                                title={locale === "en" ? "English" : "العربية"}
                            >
                                <Image src={locale === "en" ? "/flags/gb.svg" : "/flags/sa.svg"} alt={locale.toUpperCase()} width={18} height={12} />
                                <span className="font-medium">{locale.toUpperCase()}</span>
                                <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden>
                                    <path d="M5 7l5 6 5-6z" fill="currentColor" />
                                </svg>
                            </button>
                            {langOpen && (
                                <div
                                    role="listbox"
                                    className="absolute right-0 z-20 mt-1 w-32 overflow-hidden rounded-md border border-border bg-popover shadow-sm"
                                >
                                    <button
                                        role="option"
                                        aria-selected={locale === "en"}
                                        onClick={() => {
                                            setLocale("en")
                                            setLangOpen(false)
                                        }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted/40 ${locale === "en" ? "bg-muted/30" : ""}`}
                                    >
                                        <Image src="/flags/gb.svg" alt="English" width={18} height={12} />
                                        <span>English</span>
                                    </button>
                                    <button
                                        role="option"
                                        aria-selected={locale === "ar"}
                                        onClick={() => {
                                            setLocale("ar")
                                            setLangOpen(false)
                                        }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted/40 ${locale === "ar" ? "bg-muted/30" : ""}`}
                                    >
                                        <Image src="/flags/sa.svg" alt="العربية" width={18} height={12} />
                                        <span>العربية</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                            <a href="#contact" aria-label={t("Common.cta.button")}>{t("Common.cta.button")}</a>
                        </Button>
                    </div>

                    {/* Mobile menu (Sheet) */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2" aria-label="Open menu">
                                    <Menu className="h-5 w-5" />
                                    Menu
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                                <div className="mt-6 flex flex-col gap-5 px-4">
                                    <details className="rounded-md border border-border p-3">
                                        <summary className="flex cursor-pointer items-center gap-2 text-sm">
                                            <Image src={locale === "en" ? "/flags/gb.svg" : "/flags/sa.svg"} alt={locale.toUpperCase()} width={18} height={12} />
                                            <span className="font-medium">{locale === "en" ? "English" : "العربية"}</span>
                                        </summary>
                                        <div className="mt-3 flex items-center gap-3">
                                            <button onClick={() => setLocale("en")} className="flex items-center gap-2 rounded border border-border px-3 py-1.5 text-xs">
                                                <Image src="/flags/gb.svg" alt="English" width={18} height={12} />
                                                <span>English</span>
                                            </button>
                                            <button onClick={() => setLocale("ar")} className="flex items-center gap-2 rounded border border-border px-3 py-1.5 text-xs">
                                                <Image src="/flags/sa.svg" alt="العربية" width={18} height={12} />
                                                <span>العربية</span>
                                            </button>
                                        </div>
                                    </details>
                                    {NAV.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="rounded-md px-2 py-2 text-base text-foreground hover:bg-muted/40"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <Button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                                        <a href="#contact">{t("Common.cta.button")}</a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

/* ---- helpers ---- */

function NavLink({
    href,
    active,
    children,
}: {
    href: string
    active?: boolean
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`
        group relative rounded-md px-3 py-2 text-sm font-medium
        text-muted-foreground hover:text-foreground
        transition-colors
      `}
        >
            {children}
            {/* subtle active/hover underline */}
            <span
                className={`
          pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] rounded
          bg-foreground/70 transition-all
          ${active ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"}
        `}
            />
        </Link>
    )
}
