import { NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, project_type, budget_range, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase.from('inquiries').insert({
      name,
      email,
      phone,
      project_type,
      budget_range,
      message,
      status: 'New',
      notes: '',
    })

    if (error) throw error

    // Send confirmation email (non-blocking)
    resend.emails.send({
      from: 'Levisha Malviya Studio <hello@levishamalviya.com>',
      to: email,
      subject: 'We received your inquiry — Levisha Malviya Studio',
      html: `
        <div style="font-family: Georgia, serif; color: #1C1C1C; max-width: 600px; margin: 0 auto; padding: 40px;">
          <h1 style="font-size: 28px; margin-bottom: 8px;">Thank you, ${name}.</h1>
          <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7;">
            We've received your inquiry and will be in touch within 2–3 business days
            to discuss your project vision.
          </p>
          <hr style="border: none; border-top: 1px solid #C9A96E; margin: 32px 0;" />
          <p style="font-size: 13px; color: #888;">
            Levisha Malviya Interior Design Studio
          </p>
        </div>
      `,
    }).catch(() => {}) // fire-and-forget, don't fail the request if email fails

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
