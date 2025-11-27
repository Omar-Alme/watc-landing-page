"use client";

import { EstablishedCertificate } from "@/components/Certificate";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { GlobalReach } from "@/components/GlobalReach";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
// import { Testimonials } from "@/components/Testimonials"
import { TrustLogos } from "@/components/TrustLogos";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorkflowSection } from "@/components/Workflow";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustLogos />
        <Services />
        <WhyChooseUs />
        <GlobalReach />
        {/* <Testimonials /> */}
        <EstablishedCertificate />
        <WorkflowSection />
        <CTA />
        <ContactForm />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
