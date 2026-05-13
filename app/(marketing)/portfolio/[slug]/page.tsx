import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, Maximize2 } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase'
import type { Project } from '@/lib/types'

interface Props {
  params: { slug: string }
}

// Placeholder data for development before DB is connected
const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1', title: 'The Arjun Residence', slug: 'arjun-residence', category: 'Residential',
    description: 'A serene family home blending Mughal arches with contemporary living. The brief was simple: create a home that feels like an embrace — warm, generous, and endlessly welcoming. We responded with double-height ceilings, a palette of ivory and warm terracotta, and furniture sourced from Jaipur\'s finest workshops.',
    hero_image: 'https://picsum.photos/seed/lm-p1-hero/1920/1080',
    images: [
      'https://picsum.photos/seed/lm-g1/1200/800',
      'https://picsum.photos/seed/lm-g2/800/1200',
      'https://picsum.photos/seed/lm-g3/1200/900',
      'https://picsum.photos/seed/lm-g4/800/1200',
      'https://picsum.photos/seed/lm-g5/1200/800',
    ],
    year: 2024, location: 'New Delhi', area: 4200,
    materials: ['Makrana Marble', 'Teak Wood', 'Brass Fixtures', 'Handloom Linen', 'Sandstone'],
    palette: ['#F5F0E8', '#C9A96E', '#8B5E3C', '#1C1C1C', '#E8D5B7'],
    status: 'Published', created_at: '',
  },
]

async function getProject(slug: string): Promise<Project | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'Published')
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = (await getProject(params.slug)) ??
    PLACEHOLDER_PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: project.title, description: project.description }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project = await getProject(params.slug)
  if (!project) {
    project = PLACEHOLDER_PROJECTS.find((p) => p.slug === params.slug) ?? null
  }
  if (!project) notFound()

  const galleryImages = project.images?.length
    ? project.images
    : Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${project!.slug}-g${i}/1200/900`)

  return (
    <>
      {/* Full-bleed Hero */}
      <div className="relative h-screen">
        <Image
          src={project.hero_image || `https://picsum.photos/seed/${project.slug}/1920/1080`}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/40" />

        {/* Back button */}
        <Link
          href="/portfolio"
          className="absolute top-24 left-8 md:left-16 flex items-center gap-2 text-white/80 hover:text-white font-sans text-xs tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          Portfolio
        </Link>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12 pt-24 bg-gradient-to-t from-charcoal/80 to-transparent">
          <span className="label-tag text-gold block mb-2">{project.category}</span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-none">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Calendar, label: 'Year', value: String(project.year) },
            { icon: MapPin, label: 'Location', value: project.location },
            { icon: Maximize2, label: 'Area', value: `${project.area?.toLocaleString()} sqft` },
            { icon: null, label: 'Scope', value: project.category },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <p className="font-sans text-xs tracking-widest uppercase text-gold mb-1">{label}</p>
              <div className="flex items-center gap-2">
                {Icon && <Icon size={14} className="text-cream/40" />}
                <p className="font-sans text-sm text-cream">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Gallery — takes 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <p className="font-sans text-base text-charcoal/70 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <div className="pt-6 space-y-6">
            {/* Alternating editorial layout */}
            {galleryImages.map((src, i) => {
              const isFullWidth = i === 0 || i === 3
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden ${
                    isFullWidth ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project!.title} — image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )
            })}

            {/* Two-column gallery pair */}
            {galleryImages.length > 2 && (
              <div className="grid grid-cols-2 gap-6">
                {[galleryImages[1], galleryImages[2]].map((src, i) => (
                  <div key={i} className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${project!.title} detail ${i}`}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
          {/* Materials */}
          {project.materials?.length > 0 && (
            <div>
              <p className="label-tag mb-5">Materials Used</p>
              <ul className="space-y-3">
                {project.materials.map((mat) => (
                  <li key={mat} className="flex items-center gap-3 font-sans text-sm text-charcoal/70">
                    <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                    {mat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Colour palette */}
          {project.palette?.length > 0 && (
            <div>
              <p className="label-tag mb-5">Colour Palette</p>
              <div className="flex flex-wrap gap-3">
                {project.palette.map((hex) => (
                  <div key={hex} className="group flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 border border-charcoal/10"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                    <span className="font-sans text-xs text-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border border-charcoal/10 p-6">
            <p className="font-serif text-lg text-charcoal mb-3">Love this project?</p>
            <p className="font-sans text-xs text-charcoal/60 mb-5 leading-relaxed">
              Let's create something equally remarkable for your space.
            </p>
            <Link href="/contact" className="btn-outline text-xs py-2 px-5">
              Start a Project
            </Link>
          </div>
        </aside>
      </div>

      {/* Prev / Next nav */}
      <div className="border-t border-charcoal/10 bg-cream">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-10 flex justify-between items-center">
          <Link href="/portfolio" className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors">
            <ArrowLeft size={14} />
            All Projects
          </Link>
        </div>
      </div>
    </>
  )
}
