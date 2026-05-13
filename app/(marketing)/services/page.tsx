import type { Metadata } from 'next'
import Link from 'next/link'
import { Compass, Palette, Layers, Monitor, Briefcase, ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = { title: 'Services' }

const services = [
  {
    icon: Compass,
    title: 'Space Planning',
    tagline: 'The blueprint of how you live',
    description:
      'Before a single piece of furniture is selected, we map out how each space will flow, breathe, and function. Good space planning is invisible — you simply feel at home.',
    includes: [
      'Site measurement and analysis',
      'Traffic flow optimization',
      'Furniture layout planning',
      'Lighting strategy',
      'Zoning for privacy and gathering',
    ],
    price: '₹45,000',
  },
  {
    icon: Palette,
    title: 'Interior Styling',
    tagline: 'The art of the considered whole',
    description:
      'Colour, texture, pattern, and scale — when these elements are in dialogue, a room transforms from a collection of things into a living composition.',
    includes: [
      'Colour palette development',
      'Material and finish selection',
      'Art and accessory curation',
      'Window treatment design',
      'Mood board presentations',
    ],
    price: '₹60,000',
  },
  {
    icon: Layers,
    title: 'FF&E Procurement',
    tagline: 'The right object in the right place',
    description:
      'We source furniture, fixtures, and equipment from our network of trusted craftspeople, importers, and studios — ensuring every piece meets our quality and aesthetic standards.',
    includes: [
      'Vendor sourcing and negotiation',
      'Sample review and approval',
      'Order management',
      'Delivery coordination',
      'Punch-list and defect resolution',
    ],
    price: '₹80,000',
  },
  {
    icon: Monitor,
    title: '3D Visualization',
    tagline: 'See it before you build it',
    description:
      'Photorealistic renders and virtual walkthroughs that let you experience the design in full detail before a single decision is locked in.',
    includes: [
      'Concept sketches and mood boards',
      'High-resolution 3D renders',
      'Virtual walkthrough (on request)',
      'Material and lighting studies',
      'Revision rounds included',
    ],
    price: '₹35,000',
  },
  {
    icon: Briefcase,
    title: 'Project Management',
    tagline: 'From concept to keys',
    description:
      'A full-service engagement where we manage every contractor, vendor, and timeline — leaving you to arrive at a finished space without the stress.',
    includes: [
      'Contractor briefing and supervision',
      'Weekly progress reporting',
      'Budget tracking',
      'Quality control inspections',
      'Final handover styling',
    ],
    price: '₹1,20,000',
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'A 45-minute conversation to understand your vision, lifestyle, and timeline.' },
  { step: '02', title: 'Proposal & Scope', desc: 'We present a tailored service proposal with investment breakdown and timeline.' },
  { step: '03', title: 'Concept Development', desc: 'Mood boards, layouts, and material palettes take shape.' },
  { step: '04', title: 'Detailed Design', desc: 'Technical drawings, specifications, and procurement lists are finalized.' },
  { step: '05', title: 'Execution', desc: 'We manage the build and styling, keeping you informed at every milestone.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag mb-4">What We Do</p>
          <h1 className="font-serif text-6xl md:text-7xl text-charcoal leading-none">Services</h1>
        </div>
      </div>

      {/* Service cards */}
      <section className="section-pad pt-0 bg-cream">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, tagline, description, includes, price }) => (
            <div
              key={title}
              className="border border-charcoal/10 p-8 md:p-10 hover:border-gold transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <Icon size={26} className="text-gold" />
                <span className="font-sans text-xs tracking-widest uppercase text-charcoal/40 border border-charcoal/20 px-3 py-1">
                  From {price}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-gold transition-colors mb-1">
                {title}
              </h2>
              <p className="font-sans text-xs tracking-widest uppercase text-gold mb-5">{tagline}</p>
              <div className="divider-gold mb-6" />
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-6">{description}</p>
              <ul className="space-y-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-charcoal/60">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="max-w-[1400px] mx-auto mt-8 font-sans text-xs text-charcoal/40">
          * Pricing is indicative. Custom packages are available for full-home projects.
        </p>
      </section>

      {/* Process */}
      <section className="section-pad bg-charcoal">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag text-gold mb-4">How We Work</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-14">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="border-t border-white/20 pt-6">
                <p className="font-serif text-4xl text-gold/40 mb-4">{step}</p>
                <h3 className="font-serif text-lg text-cream mb-3">{title}</h3>
                <p className="font-sans text-xs text-cream/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-cream px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
          Not sure where to start?
        </h2>
        <p className="font-sans text-base text-charcoal/60 mb-10 max-w-md mx-auto">
          Book a free 30-minute discovery call and we'll help you identify the right service for
          your project.
        </p>
        <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
          Book Discovery Call
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  )
}
