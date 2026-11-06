"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useWhatsAppHref } from "@/components/Actions";
import { useI18n } from "@/lib/i18n";

/** Floating WhatsApp shortcut; appears once the hero's own actions have scrolled away. */
export function StickyChat() {
  const { t } = useI18n();
  const href = useWhatsAppHref();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Chat.label")}
      title={t("Chat.label")}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`press fixed end-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-green text-white shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-[opacity,transform] duration-300 ease-out hover:bg-green-hover ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaWhatsapp className="size-7" aria-hidden />
    </a>
  );
}
