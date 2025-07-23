"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full bg-white py-24 px-6 text-foreground overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Text */}
        <div>
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full mb-4"
          >
            Trusted by 60+ global clients
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          >
            Your gateway to Chinese factories — with global delivery made easy.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl"
          >
            We handle factory sourcing, quality inspections, and worldwide shipping — so you can scale with confidence.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="mt-8"
          >
            <Button className="bg-green-600 hover:bg-green-500 text-white" size="lg" asChild>
              <a href="#contact">Book a Free Consultation</a>
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Floating Stats */}
        <div className="hidden md:flex flex-col gap-4">
          {[
            { label: "20+", desc: "Years of Sourcing & Export Experience" },
            { label: "60+", desc: "Clients Worldwide" },
            { label: "Guangzhou & HK", desc: "Local Operations On the Ground" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.2 }}
              className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm"
            >
              <div className="text-3xl font-bold">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Grid Background */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#00000011_1px,transparent_1px)] bg-[size:40px_40px]" />
    </section>
  )
}
