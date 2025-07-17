import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="w-full bg-muted py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Your Trusted Partner in Chinese Sourcing & Export
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    From factory sourcing to global shipping — we handle every step so you can focus on growing your business.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <a href="#contact">Book a Free Consultation</a>
                    </Button>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-background px-4 py-2 rounded-full border">20+ Years in China</span>
                    <span className="bg-background px-4 py-2 rounded-full border">60+ Clients Worldwide</span>
                    <span className="bg-background px-4 py-2 rounded-full border">Based in Guangzhou & HK</span>
                </div>
            </div>
        </section>
    )
}
