"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
