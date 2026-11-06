"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { FaWhatsapp, FaWeixin } from "react-icons/fa"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { CONTACT_EMAIL, useWhatsAppHref } from "@/components/Actions"
import { WeChatDialog } from "@/components/WeChatDialog"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, { message: t("Contact.validation.name") }),
    company: z.string().optional(),
    email: z.string().email({ message: t("Contact.validation.email") }),
    whatsapp: z.string().optional(),
    message: z.string().min(10, { message: t("Contact.validation.message") }),
  })
}

const FIELD =
  "h-[52px] border-0 bg-paper px-4 text-base text-ink shadow-none placeholder:text-ink-soft focus-visible:ring-2 focus-visible:ring-lift md:text-base aria-invalid:ring-2 aria-invalid:ring-[#ffd5cf]"
const LABEL = "text-[15px] font-medium text-white data-[error=true]:text-white"
const ERROR = "text-[15px] font-medium text-[#ffe1dc]"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const { t, locale } = useI18n()
  const whatsappHref = useWhatsAppHref()
  const [ref, inView] = useInView()
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

  // Notches sit on the perforation (46% across; mirrored for Arabic)
  const notchX = locale === "ar" ? "54%" : "46%"

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper px-3 pt-28 pb-20 sm:px-8 md:pt-44 md:pb-40">
      <div
        ref={ref}
        data-reveal
        data-in={inView}
        className="mx-auto max-w-[1180px]"
      >
        <div
          className="coupon grid bg-navy text-white md:grid-cols-[46%_1fr]"
          style={{ "--notch-x": notchX } as React.CSSProperties}
        >
          {/* Stub: the part you keep */}
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 md:p-12">
            <div>
              <h2 id="contact-title" className="max-w-[12ch] text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] font-semibold tracking-tight">
                {t("Contact.title")}
              </h2>
              <p className="mt-4 max-w-[32ch] text-lg">{t("Contact.subtitle")}</p>
            </div>

            <div>
              <p className="text-body font-medium">{t("Contact.orChat")}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press inline-flex h-11 items-center gap-2 bg-navy-2 px-4 text-[15px] font-medium hover:bg-[#2a2a2a]"
                  >
                    <FaWhatsapp className="size-4" aria-hidden />
                    {t("Contact.whatsappLabel")}
                  </a>
                </li>
                <li>
                  <WeChatDialog>
                    <button
                      type="button"
                      className="press inline-flex h-11 items-center gap-2 bg-navy-2 px-4 text-[15px] font-medium hover:bg-[#2a2a2a]"
                    >
                      <FaWeixin className="size-4" aria-hidden />
                      {t("Contact.wechat")}
                    </button>
                  </WeChatDialog>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="press inline-flex h-11 items-center gap-2 bg-navy-2 px-4 text-[15px] font-medium hover:bg-[#2a2a2a]"
                  >
                    <Mail className="size-4" aria-hidden />
                    {t("Contact.emailLabel")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* The coupon: perforated from the stub */}
          <div className="border-t-[5px] border-dotted border-paper p-7 sm:p-10 md:border-t-0 md:border-s-[5px] md:p-12">
            {/* inline status (non-blocking) */}
            <div aria-live="polite" className="sr-only">
              {status === "success" ? t("Contact.statusSuccess") : null}
              {status === "error" ? t("Contact.statusError") : null}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} aria-busy={loading} noValidate>
                <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LABEL}>{t("Contact.name")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("Contact.placeholderName")}
                            autoComplete="name"
                            disabled={loading}
                            className={FIELD}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={ERROR} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LABEL}>{t("Contact.company")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("Contact.placeholderCompany")}
                            autoComplete="organization"
                            disabled={loading}
                            className={FIELD}
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
                      <FormItem>
                        <FormLabel className={LABEL}>{t("Contact.email")}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            dir="ltr"
                            placeholder={t("Contact.placeholderEmail")}
                            autoComplete="email"
                            inputMode="email"
                            disabled={loading}
                            className={`${FIELD} rtl:text-end`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={ERROR} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={LABEL}>{t("Contact.whatsapp")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("Contact.placeholderWhats")}
                            autoComplete="tel"
                            inputMode="tel"
                            disabled={loading}
                            className={FIELD}
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
                      <FormItem className="sm:col-span-2">
                        <FormLabel className={LABEL}>{t("Contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder={t("Contact.placeholderMessage")}
                            disabled={loading}
                            className={`${FIELD} h-auto min-h-[120px] py-3`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className={ERROR} />
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

                <button
                  type="submit"
                  disabled={loading}
                  className="press mt-6 flex h-14 w-full cursor-pointer items-center justify-center bg-green text-base font-medium text-white hover:bg-green-hover disabled:cursor-wait disabled:opacity-70"
                >
                  {loading ? t("Contact.sending") : t("Contact.submit")}
                </button>

                {/* tiny reassurance */}
                <p className="mt-3 text-center text-[15px] text-white">{t("Contact.subnote")}</p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
