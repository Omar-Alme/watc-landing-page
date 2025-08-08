'use client'

import Image from "next/image"
import { useState } from "react"
import { FaWeixin, FaLinkedin, FaWhatsapp } from "react-icons/fa"

export function Footer() {

    const [isWeChatOpen, setIsWeChatOpen] = useState(false)

    return (
        <footer className="w-full border-t border-border bg-background py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">

                {/* Company Description */}
                <div>
                    <Image
                        src="/images/dark-logo.png"
                        alt="Logo"
                        width={80}
                        height={40}
                        className="mb-3"
                    />
                    <h4 className="font-semibold text-foreground mb-2">
                        World Associates Trading Company
                    </h4>
                    <p>Your trusted partner for Chinese sourcing and export services.</p>
                    <p>Building bridges between global businesses and Chinese manufacturers.</p>
                </div>

                {/* Services List */}
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Services</h4>
                    <ul className="space-y-1">
                        <li>Factory Sourcing</li>
                        <li>Product Inspections</li>
                        <li>Container Shipping</li>
                        <li>Business Consulting</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Info</h4>
                    <ul className="space-y-2">
                        <li>
                            Email:{" "}
                            <a href="mailto:watcglobal@gmail.com" className="underline">
                                watcglobal@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-4 mt-2 text-lg">
                            <a
                                href="https://wa.me/46738907053"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="hover:opacity-80 transition"
                            >
                                <FaWhatsapp className="text-green-500" />
                            </a>
                            {/* WeChat (Modal trigger) */}
                            <button
                                onClick={() => setIsWeChatOpen(true)}
                                aria-label="WeChat"
                                className="hover:opacity-80 transition cursor-pointer"
                            >
                                <FaWeixin className="text-green-600" />
                            </button>

                            <a
                                href="https://www.linkedin.com/company/gz-world-associates-consultants/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="hover:opacity-80 transition"
                            >
                                <FaLinkedin className="text-blue-600" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-10">
                © {new Date().getFullYear()} World Associates. All rights reserved.
            </div>

            {/* WeChat QR Modal */}
            {isWeChatOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsWeChatOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ×
                        </button>
                        <h3 className="text-center font-semibold mb-4">Scan WeChat QR</h3>
                        <Image
                            src="/images/wechatqr.png"
                            alt="WeChat QR Code"
                            width={250}
                            height={250}
                            className="mx-auto"
                        />
                    </div>
                </div>
            )}
        </footer>
    )
}
