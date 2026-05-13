import type { Metadata } from 'next'
import { Mail, Phone, Instagram, MapPin } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Info panel */}
        <div className="bg-charcoal text-cream px-10 md:px-16 py-20 flex flex-col justify-between">
          <div>
            <p className="label-tag text-gold mb-4">Let's Talk</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Start a
              <br />
              <em className="italic text-gold">Conversation</em>
            </h1>
            <div className="h-px w-12 bg-gold mb-8" />
            <p className="font-sans text-base text-cream/60 leading-relaxed max-w-sm">
              Every great space starts with a conversation. Tell us about your project and we'll
              be in touch within 2–3 business days.
            </p>
          </div>

          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-4">
              <Mail size={18} className="text-gold shrink-0" />
              <a
                href="mailto:hello@levishamalviya.com"
                className="font-sans text-sm text-cream/70 hover:text-gold transition-colors"
              >
                hello@levishamalviya.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-gold shrink-0" />
              <a
                href="tel:+919810000000"
                className="font-sans text-sm text-cream/70 hover:text-gold transition-colors"
              >
                +91 98100 00000
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Instagram size={18} className="text-gold shrink-0" />
              <a
                href="https://instagram.com/levishamalviya"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream/70 hover:text-gold transition-colors"
              >
                @levishamalviya
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={18} className="text-gold shrink-0" />
              <p className="font-sans text-sm text-cream/70">
                New Delhi, India — available nationwide
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="bg-cream px-10 md:px-16 py-20">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
