"use client"

import { motion } from "framer-motion"
import {
    ShieldCheck,
    Languages,
    MapPin,
    BadgeDollarSign,
    Boxes,
    Handshake,
    Timer,
} from "lucide-react"

const values = [
    {
        title: "Verified Factories Only",
        description: "We source from factories we’ve worked with — no middlemen, no Alibaba guessing.",
        icon: <ShieldCheck className="text-green-600 w-5 h-5" />,
    },
    {
        title: "No Miscommunication",
        description: "We speak English, Chinese, and Arabic — and act as your local representative.",
        icon: <Languages className="text-green-600 w-5 h-5" />,
    },
    {
        title: "Real Presence in China",
        description: "With offices in Guangzhou & HK, we’re on the ground inspecting your orders personally.",
        icon: <MapPin className="text-green-600 w-5 h-5" />,
    },
    {
        title: "Fixed Transparent Pricing",
        description: "No shady markups or hidden fees — just clear service rates that scale with you.",
        icon: <BadgeDollarSign className="text-green-600 w-5 h-5" />,
    },
    {
        title: "End-to-End Sourcing",
        description: "From textile to tools — we help clients source clothing, furniture, and industrial goods.",
        icon: <Boxes className="text-green-600 w-5 h-5" />,
    },
    {
        title: "You’re Not Alone",
        description: "We’ve helped 60+ businesses launch and scale — and we guide you every step of the way.",
        icon: <Handshake className="text-green-600 w-5 h-5" />,
    },
    {
        title: "Reliable Shipping",
        description: "We coordinate container shipping, customs, and timelines — with weekly updates.",
        icon: <Timer className="text-green-600 w-5 h-5" />,
    },
]

export function WhyChooseUs() {
    return (
        <section className="w-full bg-muted/50 py-28 px-6" id="why">
            <div className="max-w-6xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-medium text-green-600 mb-2 block text-center"
                >
                    Our advantage
                </motion.span>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-6"
                >
                    Why Choose Us
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center text-muted-foreground max-w-2xl mx-auto mb-16"
                >
                    We understand the risks of sourcing from overseas — and we built World Associates to solve them.
                    With boots on the ground, vetted partners, and hands-on support, we give you confidence from inquiry to delivery.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="flex items-start gap-4"
                        >
                            <div className="p-3 bg-green-100 rounded-md">{value.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
