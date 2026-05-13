import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers, Compass, Palette, Monitor, Briefcase } from 'lucide-react'

export const metadata: Metadata = { title: 'About' }

const services = [
  { icon: Compass, title: 'Space Planning', desc: 'Functional layouts that flow naturally with how you live and work.' },
  { icon: Palette, title: 'Interior Styling', desc: 'Curating every finish, texture, and object into a cohesive narrative.' },
  { icon: Layers, title: 'FF&E Procurement', desc: 'Sourcing furniture, fixtures, and equipment from trusted artisans worldwide.' },
  { icon: Monitor, title: '3D Visualization', desc: 'Photorealistic renders so you can see the design before a single nail is driven.' },
  { icon: Briefcase, title: 'Project Management', desc: 'End-to-end coordination from concept to handover — stress-free.' },
]

const awards = [
  { year: '2023', title: 'Elle Décor India — Best Residential Design' },
  { year: '2022', title: 'Architectural Digest — 40 Under 40 Designers' },
  { year: '2021', title: 'Houzz India — Best of Houzz Service' },
]

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-0 px-6 md:px-12 lg:px-24 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag mb-4">About</p>
          <h1 className="font-serif text-6xl md:text-7xl text-charcoal leading-none">
            The Studio
          </h1>
        </div>
      </div>

      {/* Bio Split */}
      <section className="section-pad bg-cream">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <div className="relative aspect-[3/4] order-2 md:order-1">
            <Image
              src="https://picsum.photos/seed/lm-portrait/900/1200"
              alt="Levisha Malviya"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute -bottom-4 -right-4 bg-gold/20 w-32 h-32 -z-10" />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="label-tag mb-4">Levisha Malviya</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Designing with
              <em className="italic text-gold"> purpose</em>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-5 font-sans text-base text-charcoal/70 leading-relaxed">
              <p>
                With over eight years of practice across residential, commercial, and hospitality
                sectors, I've come to understand that the finest design is invisible — it simply
                feels right.
              </p>
              <p>
                Trained at the Pearl Academy of Design and shaped by studios in Milan and Mumbai,
                my practice bridges classical Indian aesthetics with global contemporary sensibilities.
              </p>
              <p>
                Every project begins with a conversation. I believe deeply in co-creating — not
                imposing a look, but drawing out the personality that already exists in you and
                translating it into the spaces you inhabit every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 px-6 bg-charcoal text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl text-cream italic leading-relaxed">
            "Good design is not about decoration. It's about creating an environment where people
            can be their fullest selves."
          </p>
          <footer className="mt-6 font-sans text-xs tracking-widest uppercase text-gold">
            — Levisha Malviya
          </footer>
        </blockquote>
      </section>

      {/* Services */}
      <section className="section-pad bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag mb-4">What We Offer</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-14">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-charcoal/10 p-8 hover:border-gold transition-colors duration-300 group">
                <Icon size={24} className="text-gold mb-5" />
                <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {title}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-pad bg-charcoal/5">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag mb-4">Recognition</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-12">Awards</h2>
          <div className="space-y-6">
            {awards.map(({ year, title }) => (
              <div
                key={title}
                className="flex items-center gap-8 py-6 border-b border-charcoal/10"
              >
                <span className="font-serif text-2xl text-gold w-16 shrink-0">{year}</span>
                <p className="font-sans text-base text-charcoal">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-cream px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
          Let's Work Together
        </h2>
        <p className="font-sans text-base text-charcoal/60 mb-10 max-w-md mx-auto">
          Whether it's a single room or an entire building, every project receives the same care
          and attention to detail.
        </p>
        <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
          Get in Touch
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  )
}
