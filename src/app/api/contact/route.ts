import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
    name: z.string().min(2),
    company: z.string().optional(),
    email: z.string().email(),
    whatsapp: z.string().optional(),
    message: z.string().min(10),
    _honeypot: z.string().optional(), // hidden field to trap bots
})

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const parsed = schema.safeParse(json)
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }

        // bot trap: if filled, silently succeed
        if (parsed.data._honeypot) {
            return NextResponse.json({ ok: true })
        }

        const { name, company, email, whatsapp, message } = parsed.data

        // For local/dev you can use "onboarding@resend.dev".
        // For prod, verify your domain in Resend and use something like no-reply@watcglobal.com
        await resend.emails.send({
            from: "WATC <no-reply@watcglobal.com>",
            to: "watcglobal@gmail.com",
            replyTo: email,
            subject: `New inquiry from ${name}`,
            html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6;">
          <h2 style="margin:0 0 12px;">New Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || "—"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp / WeChat:</strong> ${whatsapp || "—"}</p>
          <p><strong>Message:</strong></p>
          <div>${message.replace(/\n/g, "<br/>")}</div>
        </div>
      `,
        })

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
}
