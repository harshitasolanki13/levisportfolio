'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const PROJECT_TYPES = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Other']
const BUDGETS = ['Under ₹5L', '₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹60L', '₹60L+']

interface FormState {
  name: string
  email: string
  phone: string
  project_type: string
  budget_range: string
  message: string
}

const INITIAL: FormState = {
  name: '', email: '', phone: '', project_type: '', budget_range: '', message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Something went wrong. Please try again.')
      setSubmitted(true)
      setForm(INITIAL)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-charcoal/30 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold transition-colors duration-300'

  const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-2'

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20">
        <CheckCircle size={48} className="text-gold mb-6" />
        <h2 className="font-serif text-3xl text-charcoal mb-4">Thank You</h2>
        <p className="font-sans text-sm text-charcoal/60 max-w-sm">
          Your inquiry has been received. We'll be in touch within 2–3 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 font-sans text-xs tracking-widest uppercase text-gold hover:text-charcoal transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={set('name')}
          placeholder="Your name"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="your@email.com"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91 00000 00000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Project Type</label>
          <select value={form.project_type} onChange={set('project_type')} className={inputClass}>
            <option value="">Select type</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Budget Range</label>
          <select value={form.budget_range} onChange={set('budget_range')} className={inputClass}>
            <option value="">Select range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Your Vision *</label>
        <textarea
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us about your space, your style, and what you're hoping to achieve..."
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="font-sans text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="filled" loading={loading} className="w-full justify-center">
        <Send size={14} />
        Send Inquiry
      </Button>
    </form>
  )
}
