"use client"

import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background py-4 px-6 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold tracking-tight">
                    World Associates
                </div>
                <Button asChild>
                    <a href="#contact">Book Consultation</a>
                </Button>
            </div>
        </header>
    )
}


