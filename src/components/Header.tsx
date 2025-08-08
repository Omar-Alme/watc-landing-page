"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type NavItem = { href: string; label: string }
const NAV: NavItem[] = [
    { href: "#services", label: "Services" },
    { href: "#workflow", label: "Workflow" },
    { href: "#why-us", label: "Why Us" },
    { href: "#faq", label: "FAQ" },
]

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

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
                            alt="World Associates Trading Company"
                            width={40}
                            height={40}
                            className="rounded-md dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/light-logo.png"
                            alt="World Associates Trading Company"
                            width={40}
                            height={40}
                            className="rounded-md hidden dark:block"
                            priority
                        />
                        <span className="text-sm sm:text-base font-semibold tracking-tight">
                            World Associates Trading Company
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

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                            <a href="#contact" aria-label="Book a consultation">Book Consultation</a>
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
                                <div className="mt-6 flex flex-col gap-4">
                                    {NAV.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-base text-foreground hover:underline underline-offset-4"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <Button className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                                        <a href="#contact">Book Consultation</a>
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
