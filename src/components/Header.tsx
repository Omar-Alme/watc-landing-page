import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="w-full bg-white text-foreground py-4 px-6  top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/dark-logo.png"
                        alt="World Associates Logo"
                        width={65}
                        height={65}
                    />
                    <span className="text-lg font-semibold">World Association Trading Consultancy</span>
                </div>
                <Button asChild>
                    <a href="#contact">Book Consultation</a>
                </Button>
            </div>
        </header>
    )
}
