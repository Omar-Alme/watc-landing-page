"use client"

import { MessageSquare } from "lucide-react"
import Link from "next/link"

export function StickyChat() {
    return (
        <Link
            href="https://wa.me/yourwhatsapplink"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition"
        >
            <MessageSquare className="w-5 h-5" />
        </Link>
    )
}
