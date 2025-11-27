"use client";

import { useI18n } from "@/lib/i18n";

export function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <section className="w-full min-h-screen border-t border-border bg-background px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {t("PrivacyPolicy.eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("PrivacyPolicy.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("PrivacyPolicy.lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section1.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section1.content")}
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section2.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section2.intro")}
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="ml-4 list-disc">
                <span className="font-semibold">
                  {t("PrivacyPolicy.section2.item1.title")}
                </span>{" "}
                {t("PrivacyPolicy.section2.item1.desc")}
              </li>
              <li className="ml-4 list-disc">
                <span className="font-semibold">
                  {t("PrivacyPolicy.section2.item2.title")}
                </span>{" "}
                {t("PrivacyPolicy.section2.item2.desc")}
              </li>
              <li className="ml-4 list-disc">
                <span className="font-semibold">
                  {t("PrivacyPolicy.section2.item3.title")}
                </span>{" "}
                {t("PrivacyPolicy.section2.item3.desc")}
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section3.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section3.intro")}
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section3.item1")}
              </li>
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section3.item2")}
              </li>
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section3.item3")}
              </li>
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section3.item4")}
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section7.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section7.content")}
            </p>
          </div>

          {/* Third-party Links */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section8.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section8.content")}
            </p>
          </div>

          {/* Contact Us */}
          <div className="rounded-lg border border-border bg-accent/30 p-6">
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section9.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section9.intro")}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section9.email")}{" "}
              <a
                href="mailto:watcglobal@gmail.com"
                className="font-semibold text-emerald-600 underline underline-offset-4 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                watcglobal@gmail.com
              </a>
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section4.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section4.content")}
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section5.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section5.content")}
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section6.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section6.intro")}
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section6.item1")}
              </li>
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section6.item2")}
              </li>
              <li className="ml-4 list-disc">
                {t("PrivacyPolicy.section6.item3")}
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section7.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section7.content")}
            </p>
          </div>

          {/* Third-party Links */}
          <div>
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section8.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section8.content")}
            </p>
          </div>

          {/* Contact Us */}
          <div className="rounded-lg border border-border bg-accent/30 p-6">
            <h2 className="text-2xl font-bold">
              {t("PrivacyPolicy.section9.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section9.intro")}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t("PrivacyPolicy.section9.email")}{" "}
              <a
                href="mailto:watcglobal@gmail.com"
                className="font-semibold text-emerald-600 underline underline-offset-4 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                watcglobal@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
