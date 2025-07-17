import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
    {
        name: "Johan L.",
        title: "E-commerce Owner, Sweden",
        quote:
            "World Associates helped us find a reliable supplier and ship over 10,000 units to Stockholm. Everything was smooth and on time.",
    },
    {
        name: "Fatima R.",
        title: "Retailer, UAE",
        quote:
            "They handled sourcing, quality checks, and freight with zero headaches. We felt like we had a real partner on the ground in China.",
    },
    {
        name: "James T.",
        title: "Private Label Brand, UK",
        quote:
            "Their inspection reports and negotiation support saved us thousands. We won't work with anyone else in China.",
    },
]

export function Testimonials() {
    return (
        <section className="w-full py-20 px-6 bg-background" id="testimonials">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Clients Say</h2>
                <p className="mt-4 text-muted-foreground">
                    Trusted by entrepreneurs and growing brands around the world.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {testimonials.map((t, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle className="text-left">{t.name}</CardTitle>
                                <p className="text-sm text-muted-foreground text-left">{t.title}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground text-left italic">“{t.quote}”</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
