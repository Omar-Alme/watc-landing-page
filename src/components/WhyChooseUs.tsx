"use client"

import Image from "next/image"
import { BookAction, WhatsAppAction } from "@/components/Actions"
import { useI18n } from "@/lib/i18n"
import { useInView } from "@/lib/use-in-view"

const VALUES = ["verified", "noMiscomm", "presence", "pricing", "end2end", "guide", "shipping"] as const

export function WhyChooseUs() {
  const { t } = useI18n()
  const [aRef, aIn] = useInView()
  const [bRef, bIn] = useInView()
  const [listRef, listIn] = useInView()

  return (
    <section id="why-us" aria-labelledby="why-title">
      {/* Two photographs, two fields, meeting on one edge */}
      <div className="grid md:grid-cols-2">
        <div
          ref={aRef}
          data-settle
          data-in={aIn}
          className="group relative flex min-h-[60svh] flex-col justify-between overflow-hidden bg-paper-2 md:min-h-[88svh]"
        >
          <h2
            id="why-title"
            className="relative z-10 px-5 pt-10 text-heading font-semibold text-ink sm:px-8 md:pt-14"
          >
            {t("Why.title")}
          </h2>
          <div className="relative mx-5 mt-8 flex-1 overflow-hidden sm:mx-8">
            <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-out-strong)] group-hover:scale-[1.04]">
              <Image
                src="/images/factory-visit.jpg"
                alt={t("Hero.photos.0")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xl font-medium text-ink">{t("Why.panelA.name")}</p>
              <p className="mt-1 text-body text-ink">{t("Why.panelA.fact")}</p>
            </div>
            <BookAction tone="ink" label={t("Common.cta.short")} className="shrink-0" />
          </div>
        </div>

        <div
          ref={bRef}
          data-settle
          data-in={bIn}
          className="group relative flex min-h-[60svh] flex-col justify-between overflow-hidden bg-navy text-on-navy md:min-h-[88svh]"
        >
          <div className="relative mx-5 mt-10 flex-1 overflow-hidden sm:mx-8 md:mt-14">
            <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[var(--ease-out-strong)] group-hover:scale-[1.04]">
              <Image
                src="/images/warehouse-guangzhou.jpg"
                alt={t("Hero.photos.1")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "45% 60%" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xl font-medium">{t("Why.panelB.name")}</p>
              <p className="mt-1 text-body text-on-navy">{t("Why.panelB.fact")}</p>
            </div>
            <WhatsAppAction className="shrink-0" />
          </div>
        </div>
      </div>

      {/* The reasons, in full */}
      <div className="bg-paper px-5 py-20 sm:px-8 md:py-40">
        <div ref={listRef} data-reveal data-in={listIn} className="mx-auto grid max-w-[1360px] gap-12 md:grid-cols-12">
          <h3 className="max-w-[16ch] text-heading font-semibold text-ink md:col-span-12 md:max-w-none lg:col-span-4 lg:max-w-[16ch]">{t("Why.listTitle")}</h3>
          <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2 md:col-span-12 lg:col-span-8">
            {VALUES.map((key) => (
              <div key={key}>
                <dt className="text-xl font-semibold tracking-tight text-ink">{t(`Why.values.${key}.title`)}</dt>
                <dd className="mt-2 text-body text-ink">{t(`Why.values.${key}.desc`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
