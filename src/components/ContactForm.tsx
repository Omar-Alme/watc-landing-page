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
import { useI18n } from "@/lib/i18n"

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, { message: t("Contact.validation.name") }),
    company: z.string().optional(),
    email: z.string().email({ message: t("Contact.validation.email") }),
    whatsapp: z.string().optional(),
    message: z.string().min(10, { message: t("Contact.validation.message") }),
  })
}

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const { t } = useI18n()
  const formSchema = makeSchema(t)

  const form = useForm<z.infer<ReturnType<typeof makeSchema>>>({
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

      toast.success(t("Contact.toastSuccess"))
      setStatus("success")
      form.reset()
    } catch {
      toast.error(t("Contact.toastError"))
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
          {t("Contact.eyebrow")}
        </motion.span>

        <motion.h2
          id="contact-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold md:text-4xl text-foreground"
        >
          {t("Contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-10 max-w-xl text-muted-foreground"
        >
          {t("Contact.subtitle")}
        </motion.p>

        {/* inline status (non-blocking) */}
        <div aria-live="polite" className="sr-only">
          {status === "success" ? t("Contact.statusSuccess") : null}
          {status === "error" ? t("Contact.statusError") : null}
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
                    <FormLabel>{t("Contact.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Contact.placeholderName")}
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
                    <FormLabel>{t("Contact.company")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Contact.placeholderCompany")}
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
                    <FormLabel>{t("Contact.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("Contact.placeholderEmail")}
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
                    <FormLabel>{t("Contact.whatsapp")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Contact.placeholderWhats")}
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
                    <FormLabel>{t("Contact.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder={t("Contact.placeholderMessage")}
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
              {loading ? t("Contact.sending") : t("Contact.submit")}
            </Button>

            {/* tiny reassurance */}
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("Contact.subnote")}</p>
          </form>
        </Form>
      </div>
    </section>
  )
}
