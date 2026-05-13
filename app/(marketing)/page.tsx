import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase'
import type { Project } from '@/lib/types'
import ProjectCard from '@/components/portfolio/ProjectCard'
import HeroSection from './HeroSection'

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

// Fallback placeholder projects when DB isn't connected yet
const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1', title: 'The Arjun Residence', slug: 'arjun-residence',
    category: 'Residential', description: 'A serene family home blending Mughal arches with contemporary living.',
    hero_image: 'https://picsum.photos/seed/lm-p1/800/1000',
    images: [], year: 2024, location: 'New Delhi', area: 4200,
    materials: ['Marble', 'Teak', 'Brass'], palette: ['#F5F0E8', '#C9A96E', '#1C1C1C'],
    status: 'Published', created_at: new Date().toISOString(),
  },
  {
    id: '2', title: 'Bloom Wellness Spa', slug: 'bloom-wellness',
    category: 'Commercial', description: 'A sanctuary of calm designed around natural materials and diffused light.',
    hero_image: 'https://picsum.photos/seed/lm-p2/800/1000',
    images: [], year: 2023, location: 'Mumbai', area: 2800,
    materials: ['Travertine', 'Linen', 'Rattan'], palette: ['#E8DFD0', '#A8896A', '#3D3530'],
    status: 'Published', created_at: new Date().toISOString(),
  },
  {
    id: '3', title: 'The Oberoi Suite', slug: 'oberoi-suite',
    category: 'Hospitality', description: 'Reimagining heritage luxury for the discerning modern traveller.',
    hero_image: 'https://picsum.photos/seed/lm-p3/800/1000',
    images: [], year: 2023, location: 'Jaipur', area: 1600,
    materials: ['Sandstone', 'Velvet', 'Gilt'], palette: ['#2A1F0F', '#C9A96E', '#F5F0E8'],
    status: 'Published', created_at: new Date().toISOString(),
  },
]

export default async function HomePage() {
  const dbProjects = await getFeaturedProjects()
  const projects = dbProjects.length > 0 ? dbProjects : PLACEHOLDER_PROJECTS

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="section-pad bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="label-tag mb-3">Selected Works</p>
              <h2 className="font-serif text-5xl md:text-6xl text-charcoal leading-none">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-charcoal py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '120+', label: 'Projects Delivered' },
            { value: '8', label: 'Years of Excellence' },
            { value: '3', label: 'Design Awards' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-4xl text-gold mb-2">{value}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream/50">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="section-pad bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="label-tag mb-4">About the Studio</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Design rooted in
                <em className="italic text-gold"> intention</em>
              </h2>
              <div className="divider-gold mb-8" />
              <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-6">
                I'm Levisha Malviya — an interior designer with a deep belief that the spaces we
                inhabit shape the people we become. Every project begins with listening: to your
                stories, your rhythms, your aspirations.
              </p>
              <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
                The result is a home, an office, or a hotel suite that feels unmistakably yours —
                crafted with precision and executed with care.
              </p>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>

            {/* Image */}
            <div className="relative aspect-[3/4]">
              <Image
                src="https://picsum.photos/seed/lm-about/900/1200"
                alt="Levisha Malviya in her studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-center px-6">
        <p className="label-tag text-gold mb-4">Let's Create Together</p>
        <h2 className="font-serif text-5xl md:text-6xl text-cream mb-8 leading-tight">
          Ready to transform
          <br />
          <em className="italic text-gold">your space?</em>
        </h2>
        <Link href="/contact" className="btn-gold">
          Start a Conversation
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  )
}
