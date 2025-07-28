"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Initial Inquiry",
    description: "Contact factory → Get quotation → Receive sample",
  },
  {
    title: "Payment Processing",
    description: "Customer pays → We pay factory",
  },
  {
    title: "Production Phase",
    description: "Factory production + follow-up",
  },
  {
    title: "Packing & Customs",
    description: "Packing details & customs prep",
  },
  {
    title: "Shipping",
    description: "Loading container + export docs",
  },
  {
    title: "Bill of Lading",
    description: "Confirm bill of lading",
  },
  {
    title: "Final Delivery",
    description: "Send documents to customer",
  },
]

export function WorkflowSection() {
  return (
    <section className="w-full bg-white py-28 px-6 border-t border-muted/40" id="workflow">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-lg font-medium text-green-600 mb-2 block text-center"
        >
          How We Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-20"
        >
          Our Workflow from Inquiry to Delivery
        </motion.h2>

        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-muted/20" />

          <div className="flex flex-col gap-16 relative z-10">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              const stepNumber = i + 1

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.8, 0.25, 1], // smooth spring-like
                  }}
                  className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Number dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-semibold text-sm z-10 md:mx-6 my-4 md:my-0">
                    {stepNumber}
                  </div>

                  {/* Card */}
                  <div className="relative backdrop-blur-md bg-white/80 border border-green-200 rounded-xl shadow-md p-6 max-w-md w-full">
                    <p className="text-xs uppercase tracking-wide text-green-600 font-medium mb-1">
                      Step {stepNumber}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}


            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-24 text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Ready to streamline your sourcing process?
              </h3>
              <p className="text-muted-foreground mb-6">
                Book a free consultation with our team and discover how we can simplify your workflow from factory to delivery.
              </p>
              <a
                href="#contact" // Change this to your booking or contact section
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-all"
              >
                Book a Free Consultation
              </a>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
