"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import type { Locale } from "@/lib/i18n";

export function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname() || "/en";
    const search = useSearchParams();
    const locale = useLocale() as Locale;

    function switchTo(next: Locale) {
        // replace leading /en or /ar
        const newPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`);
        const query = search?.toString();
        router.push(query ? `${newPath}?${query}` : newPath);
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => switchTo("en")}
                aria-label="Switch to English"
                aria-pressed={locale === "en"}
                className={`rounded-md p-1 border transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30
          ${locale === "en" ? "border-emerald-500" : "border-transparent"}`}
                title="English"
            >
                <Image src="/flags/gb.svg" alt="" width={22} height={22} />
            </button>
            <button
                onClick={() => switchTo("ar")}
                aria-label="التبديل إلى العربية"
                aria-pressed={locale === "ar"}
                className={`rounded-md p-1 border transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30
          ${locale === "ar" ? "border-emerald-500" : "border-transparent"}`}
                title="العربية"
            >
                <Image src="/flags/sa.svg" alt="" width={22} height={22} />
            </button>
        </div>
    );
}
