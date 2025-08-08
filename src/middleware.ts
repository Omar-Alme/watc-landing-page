import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n";

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always" // URLs like /en, /ar
});

export const config = {
    matcher: ["/", "/(en|ar)/:path*"]
};
