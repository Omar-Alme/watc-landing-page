"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  company: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  whatsapp: z.string().optional(),
  message: z.string().min(10, { message: "Please describe your inquiry" }),
})

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", company: "", email: "", whatsapp: "", message: "" },
    mode: "onTouched",
  })

  async function onSubmit(raw: z.infer<typeof formSchema>) {
    const data = {
      ...raw,
      // tiny cleanup
      name: raw.name.trim(),
      company: raw.company?.trim() || "",
      email: raw.email.trim(),
      whatsapp: raw.whatsapp?.trim() || "",
      message: raw.message.trim(),
      _honeypot: "",
    }

    try {
      setLoading(true)
      setStatus("idle")

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Request failed")

      toast.success("Message sent! We’ll reply within 24 hours.")
      setStatus("success")
      form.reset()
    } catch {
      toast.error("Something went wrong. Please try again.")
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="w-full border-t border-muted/40 bg-white px-6 py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-2 block text-lg font-medium text-emerald-700"
        >
          Contact us
        </motion.span>

        <motion.h2
          id="contact-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold md:text-4xl text-foreground"
        >
          Book a free consultation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-10 max-w-xl text-muted-foreground"
        >
          Tell us what you need and our team in China will get back to you within 24 hours.
        </motion.p>

        {/* inline status (non-blocking) */}
        <div aria-live="polite" className="sr-only">
          {status === "success" ? "Your message was sent successfully." : null}
          {status === "error" ? "There was an error sending your message." : null}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-left"
            aria-busy={loading}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Smith"
                        autoComplete="name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ABC Imports Ltd."
                        autoComplete="organization"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        inputMode="email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>WhatsApp / WeChat</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+46 7X XXX XXXX or WeChat ID"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about your product, target MOQ, timeline, and destination..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Honeypot (hidden) */}
            <input
              type="text"
              name="_honeypot"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white mt-6 w-full cursor-pointer" size="lg" disabled={loading}>
              {loading ? "Sending…" : "Send inquiry"}
            </Button>

            {/* tiny reassurance */}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              We’ll never share your details. Response within 24 hours.
            </p>
          </form>
        </Form>
      </div>
    </section>
  )
}
