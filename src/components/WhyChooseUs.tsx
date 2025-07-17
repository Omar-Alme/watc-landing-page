import { CheckCircle } from "lucide-react"

const reasons = [
    "10+ years of experience in China",
    "Based in Guangzhou & Hong Kong",
    "Bilingual communication (English / Chinese)",
    "Factory relationships you can trust",
    "On-ground support for inspections & logistics",
    "Transparent pricing with no hidden fees",
]

export function WhyChooseUs() {
    return (
        <section className="w-full py-20 px-6 bg-muted" id="why-us">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose Us</h2>
                <p className="mt-4 text-muted-foreground">
                    We&#39;re not just agents — we&#39;re your long-term sourcing partner on the ground in China.
                </p>

                <ul className="mt-10 space-y-4 text-left">
                    {reasons.map((reason, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="text-green-600 mt-1" />
                            <span className="text-sm md:text-base text-foreground">{reason}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
