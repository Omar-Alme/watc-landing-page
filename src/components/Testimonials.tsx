"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
    {
        label: "Cosmetic Line",
        quote: "Genius supply-chain system",
        description:
            "We've been working with World Associates since March 2024, and our supply chain has never been better. The team genuinely cares about brand success and handled our increasing volume with ease.",
        name: "Rai, COO at Smooche",
        date: "11 September 2024",
    },
    {
        label: "Standard Line",
        quote: "One of the best decisions we made this year",
        description:
            "Packages are shipped faster and more reliably, which made a massive difference for us. Our account manager is always responsive. They really understand sourcing and offer excellent growth advice.",
        name: "Musa, Co-Founder at Eyekonik",
        date: "11 October 2024",
    },
    {
        label: "Premium Line",
        quote: "World Associates is a game-changer",
        description:
            "We were struggling with quality issues and delays. Since partnering with World Associates, our products arrive on time and meet our standards. Their team is proactive and solutions-oriented.",
        name: "Aisha, Founder at Luxe Goods",
        date: "11 November 2024",
    },
]

export function Testimonials() {
    return (
        <section className="w-full bg-white py-28 px-6" id="testimonials">
            <div className="max-w-6xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-medium text-green-600 mb-2 block text-center"
                >
                    Testimonials
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    What other clients say about working with us
                </motion.h2>

                <Carousel
                    opts={{ align: "center", loop: true }}
                    plugins={[Autoplay({ delay: 6000 })]}
                    className="overflow-visible"
                >
                    <CarouselContent className="-ml-4 md:-ml-6">
                        {testimonials.map((t, i) => (
                            <CarouselItem
                                key={i}
                                className="pl-4 md:pl-6 basis-[90%] md:basis-[70%]"
                            >
                                <div className="min-h-[400px] md:min-h-[450px] bg-muted rounded-xl overflow-hidden  grid grid-cols-1 md:grid-cols-2">
                                    {/* Testimonial Text */}
                                    <div className="p-6 md:p-8 flex flex-col justify-between">
                                        <div>
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                {t.label}
                                            </span>

                                            <h3 className="mt-4 text-xl font-semibold text-foreground">“{t.quote}”</h3>
                                            <p className="mt-2 text-muted-foreground">{t.description}</p>
                                        </div>

                                        <div className="flex items-center gap-3 mt-6">
                                            <div className="w-10 h-10 rounded-full bg-gray-300" />
                                            <div className="text-sm">
                                                <div className="font-medium text-foreground">{t.name}</div>
                                                <div className="text-muted-foreground text-xs">Date: {t.date}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Block */}
                                    <div className="relative h-72 md:h-full">
                                        <Image
                                            src="/images/man.png"
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="-left-4 md:-left-6" />
                    <CarouselNext className="-right-4 md:-right-6" />
                </Carousel>
            </div>
        </section>
    )
}
