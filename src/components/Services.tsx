"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
    Factory,
    ShieldCheck,
    Truck,
    Briefcase,
} from "lucide-react"

const services = [
    {
        title: "Factory Sourcing",
        description:
            "We connect you with trusted manufacturers tailored to your product, MOQ, and pricing needs.",
        image: "/images/shippingcontainer.png",
        icon: <Factory className="h-5 w-5 text-green-600" />,
    },
    {
        title: "Quality Inspections",
        description:
            "On-site product checks, factory audits, and pre-shipment inspections for peace of mind.",
        image: "/images/shippingcontainer.png",
        icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
    },
    {
        title: "Shipping & Logistics",
        description:
            "We coordinate freight, customs, documentation, and global container shipping end-to-end.",
        image: "/images/shippingcontainer.png",
        icon: <Truck className="h-5 w-5 text-green-600" />,
    },
    {
        title: "Export Consulting",
        description:
            "From contracts to compliance — we help you navigate China trade with zero friction.",
        image: "/images/shippingcontainer.png",
        icon: <Briefcase className="h-5 w-5 text-green-600" />,
    },
]

export function Services() {
    return (
        <section className="w-full bg-white py-28 px-6" id="services">
            <div className="max-w-6xl mx-auto relative">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold tracking-tight text-center mb-20"
                >
                    What We Do
                </motion.h2>

                {/* Vertical Timeline Line */}
                <div className="hidden md:block absolute top-[120px] left-1/2 w-[2px] bg-green-300 z-0 transform -translate-x-1/2"
                    style={{ height: `${services.length * 390 - 30}px` }} />

                {/* Service Blocks */}
                <div className="space-y-32 relative z-10">
                    {services.map((service, index) => {
                        const isEven = index % 2 === 0
                        const direction = isEven ? "md:flex-row" : "md:flex-row-reverse"

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col ${direction} items-center gap-12 md:gap-20`}
                            >
                                {/* Timeline Dot */}
                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                                    <div
                                        className="w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"
                                        style={{ top: `${index * 320}px` }}
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 md:max-w-[50%] space-y-4 text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center shadow-md">
                                            {service.icon}
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                                </div>

                                {/* Image */}
                                <div className="flex-1 w-full h-64 md:h-72 relative overflow-hidden rounded-xl shadow-lg border border-gray-200">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
