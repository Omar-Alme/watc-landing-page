import Image from "next/image"
export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground">

                {/* Company Description */}
                <div>
                    <Image src="/images/dark-logo.png" alt="Logo" width={80} height={40} className="mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">World Associates Trading Company</h4>
                    <p>Your trusted partner for Chinese sourcing and export services.</p>
                    <p>Building bridges between global businesses and Chinese manufacturers.</p>
                </div>

                {/* Services List */}
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Services</h4>
                    <ul className="space-y-1">
                        <li>Factory Sourcing</li>
                        <li>Product Inspections</li>
                        <li>Container Shipping</li>
                        <li>Business Consulting</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Info</h4>
                    <ul className="space-y-1">
                        <li>Email: <a href="mailto:info@worldassociatestc.com" className="underline">info@worldassociatestc.com</a></li>
                        <li>WeChat: <span className="font-mono">WorldAssociatesTC</span></li>
                        <li>WhatsApp: <span className="font-mono">+86 138 0013 8888</span></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-10">
                © {new Date().getFullYear()} World Associates. All rights reserved.
            </div>
        </footer>
    )
}
