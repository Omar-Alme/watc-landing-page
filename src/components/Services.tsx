import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Factory, ShieldCheck, Briefcase } from "lucide-react"

const services = [
    {
        icon: <Factory className="h-8 w-8 text-green-600" />,
        title: "Factory Sourcing",
        description: "We connect you with trusted manufacturers tailored to your product and pricing needs.",
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
        title: "Quality Inspections",
        description: "On-site product checks, factory visits, and pre-shipment inspections.",
    },
    {
        icon: <Truck className="h-8 w-8 text-green-600" />,
        title: "Shipping & Logistics",
        description: "We coordinate freight, documentation, and container shipping globally.",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-green-600" />,
        title: "Export Consulting",
        description: "Let us handle the legal, language, and logistics complexities for you.",
    },
]

export function Services() {
    return (
        <section className="w-full py-20 px-6 bg-background" id="services">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What We Do</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    End-to-end export support from factory floor to global delivery.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {services.map((service, index) => (
                        <Card key={index} className="text-left h-full">
                            <CardHeader className="flex items-center space-x-4">
                                {service.icon}
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
