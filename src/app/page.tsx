"use client";

import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ClientsGlobe } from "@/components/ClientsGlobe";
// import { Proof } from "@/components/Proof"; // back once the renewed licence arrives
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
// import { Testimonials } from "@/components/Testimonials"
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorkflowSection } from "@/components/Workflow";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        {/* <Proof /> */}
        <ClientsGlobe />
        <Services />
        <WhyChooseUs />
        <WorkflowSection />
        <Stats />
        <CTA />
        <ContactForm />
        {/* <Testimonials /> */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
