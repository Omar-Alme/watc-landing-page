import type { Metadata } from "next";
import { Anton, Geist, IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { StickyChat } from "@/components/StickyChat";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

// Hero only: big condensed caps and the speed readout
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "World Associates Trading Company | Trusted Sourcing & Export from China",
  description:
    "World Associates Trading Company connects global businesses with vetted Chinese manufacturers. We offer factory sourcing, product inspections, container shipping, and export consulting, with transparency and reliability at every step.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks that script runs, so entrance styles never hide content without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${geistSans.variable} ${plexArabic.variable} ${anton.variable} ${jetbrainsMono.variable} antialiased`}>
        <I18nProvider>
          {children}
          <Toaster position="bottom-left" toastOptions={{ style: { borderRadius: 0 } }} />
          <StickyChat />
        </I18nProvider>
      </body>
    </html>
  );
}
