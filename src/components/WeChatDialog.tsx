"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n"

/** Wraps any trigger; opens the WeChat QR code. */
export function WeChatDialog({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xs border-0 bg-paper p-6 text-center sm:max-w-xs">
        <DialogTitle className="text-base font-semibold text-ink">{t("Footer.scanWeChat")}</DialogTitle>
        <Image src="/images/wechatqr.png" alt="WeChat QR code" width={260} height={260} className="mx-auto" />
      </DialogContent>
    </Dialog>
  )
}
