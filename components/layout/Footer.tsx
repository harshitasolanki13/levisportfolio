import Link from 'next/link'
import { Instagram, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-serif text-3xl text-cream mb-4">Levisha Malviya</p>
            <p className="font-sans text-sm leading-relaxed text-cream/60 max-w-xs">
              Crafting interiors that are an extension of who you are — timeless, considered, and deeply personal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-tag text-gold mb-6">Navigate</p>
            <ul className="space-y-3">
              {['Portfolio', 'About', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-tag text-gold mb-6">Get in Touch</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@levishamalviya.com"
                  className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail size={14} />
                  hello@levishamalviya.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/levishamalviya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <Instagram size={14} />
                  @levishamalviya
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/40 tracking-wide">
            © {year} Levisha Malviya Interior Design Studio. All rights reserved.
          </p>
          <p className="font-sans text-xs text-cream/30 tracking-widest uppercase">
            Spaces That Tell Your Story
          </p>
        </div>
      </div>
    </footer>
  )
}
