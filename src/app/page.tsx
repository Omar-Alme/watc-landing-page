import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Testimonials } from "@/components/Testimonials"
import { WhyChooseUs } from "@/components/WhyChooseUs"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Testimonials />
      </main>
    </>
  )
}
