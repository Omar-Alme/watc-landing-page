"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { motion } from "framer-motion"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    company: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    whatsapp: z.string().optional(),
    message: z.string().min(10, { message: "Please describe your inquiry" }),
})

export function ContactForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            whatsapp: "",
            message: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        toast.success("Message sent successfully!")
        form.reset()
    }

    return (
        <section className="w-full py-28 px-6 bg-white border-t border-muted/40" id="contact">
            <div className="max-w-2xl mx-auto text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-medium text-green-600 mb-2 block"
                >
                    Contact Us
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Book a Free Consultation
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-muted-foreground mb-10 max-w-xl mx-auto"
                >
                    Let us know what you&#39;re looking for and we’ll get in touch within 24 hours.
                </motion.p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl><Input placeholder="John Smith" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl><Input placeholder="ABC Imports Ltd." {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>WhatsApp / WeChat</FormLabel>
                                    <FormControl><Input placeholder="+46 7X XXX XXXX" {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} placeholder="Tell us what you need help with..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" size="lg">
                            Send Inquiry
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}
