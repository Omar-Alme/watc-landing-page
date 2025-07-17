"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background py-4 px-6 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/images/watc-logo1.png"
                        alt="World Associates Logo"
                        width={60}
                        height={60}
                        className="rounded-sm"
                    />
                    <span className="text-lg font-bold">WATC</span>
                </div>
                <Button asChild>
                    <a href="#contact">Book Consultation</a>
                </Button>
            </div>
        </header>
    )
}

