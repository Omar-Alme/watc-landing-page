"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaWeixin, FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";
import { CONTACT_EMAIL, useWhatsAppHref } from "@/components/Actions";
import { WeChatDialog } from "@/components/WeChatDialog";
import { useI18n } from "@/lib/i18n";

const LINKEDIN = "https://www.linkedin.com/company/gz-world-associates-consultants/";

/** The back of the card: a postcard panel with a scalloped top, the address block and a stamp. */
export function Footer() {
  const { t, toLocaleDigits } = useI18n();
  const whatsappHref = useWhatsAppHref();
  const pathname = usePathname();
  const base = pathname === "/" ? "" : "/";

  const nav = [
    { href: `${base}#services`, label: t("Common.nav.services") },
    { href: `${base}#workflow`, label: t("Common.nav.workflow") },
    { href: `${base}#why-us`, label: t("Common.nav.why") },
    { href: `${base}#faq`, label: t("Common.nav.faq") },
    { href: `${base}#contact`, label: t("Common.nav.contact") },
  ];

  const row = "inline-flex items-center gap-3 text-lg text-ink hover:text-green";

  return (
    <footer aria-labelledby="footer-heading" className="bg-navy px-3 pt-24 sm:px-8 md:pt-32">
      <div className="postcard mx-auto max-w-[1180px] bg-paper px-6 pt-16 pb-8 text-ink sm:px-10 md:px-14 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/dark-logo.png" alt="" width={44} height={44} />
              <span className="text-lg font-semibold tracking-tight">{t("Common.short")}</span>
            </div>
            <h2 id="footer-heading" className="mt-8 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight">
              {t("Footer.signoff")}
            </h2>
            <p className="mt-4 max-w-[40ch] text-body">
              {t("Footer.about1")} {t("Footer.about2")}
            </p>
            <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-body text-ink-soft hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative">
            {/* The stamp */}
            <div className="absolute end-0 top-0 w-16 rotate-3 bg-paper-2 p-1.5 md:w-[88px]">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/ship-cosco-guangzhou.jpg"
                  alt={t("Footer.stampAlt")}
                  fill
                  sizes="88px"
                  className="object-cover"
                  style={{ objectPosition: "60% 50%" }}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-3 pe-24 pt-2 md:pe-28">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={row}>
                  <Mail className="size-5 shrink-0" aria-hidden />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={row}>
                  <FaWhatsapp className="size-5 shrink-0" aria-hidden />
                  <span dir="ltr">+46 73 890 70 53</span>
                </a>
              </li>
              <li>
                <WeChatDialog>
                  <button type="button" className={`${row} cursor-pointer`}>
                    <FaWeixin className="size-5 shrink-0" aria-hidden />
                    {t("Contact.wechat")}
                  </button>
                </WeChatDialog>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={row}>
                  <FaLinkedin className="size-5 shrink-0" aria-hidden />
                  LinkedIn
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-lg">
                <MapPin className="size-5 shrink-0" aria-hidden />
                {t("Footer.registered")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-center text-[13px] text-ink-soft">
          <p>
            {t("Footer.copyright").replace("{year}", toLocaleDigits(String(new Date().getFullYear())))}
            {" · "}
            <Link href="/privacy" className="underline hover:text-ink">
              {t("Footer.privacy")}
            </Link>
            {" · "}
            <a href="#top" className="underline hover:text-ink" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}>
              {t("Footer.backToTop")}
            </a>
          </p>
          <p>{t("Footer.credit")}</p>
        </div>
      </div>
    </footer>
  );
}
