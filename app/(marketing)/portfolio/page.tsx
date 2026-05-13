import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase'
import type { Project } from '@/lib/types'
import ProjectGrid from '@/components/portfolio/ProjectGrid'

export const metadata: Metadata = { title: 'Portfolio' }

async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'Published')
      .order('year', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

const PLACEHOLDER: Project[] = [
  { id: '1', title: 'The Arjun Residence', slug: 'arjun-residence', category: 'Residential', description: 'A serene family home blending Mughal arches with contemporary living.', hero_image: 'https://picsum.photos/seed/lm-p1/800/1000', images: [], year: 2024, location: 'New Delhi', area: 4200, materials: ['Marble', 'Teak', 'Brass'], palette: [], status: 'Published', created_at: '' },
  { id: '2', title: 'Bloom Wellness Spa', slug: 'bloom-wellness', category: 'Commercial', description: 'A sanctuary of calm designed around natural materials and diffused light.', hero_image: 'https://picsum.photos/seed/lm-p2/800/1000', images: [], year: 2023, location: 'Mumbai', area: 2800, materials: [], palette: [], status: 'Published', created_at: '' },
  { id: '3', title: 'The Oberoi Suite', slug: 'oberoi-suite', category: 'Hospitality', description: 'Reimagining heritage luxury for the discerning modern traveller.', hero_image: 'https://picsum.photos/seed/lm-p3/800/1000', images: [], year: 2023, location: 'Jaipur', area: 1600, materials: [], palette: [], status: 'Published', created_at: '' },
  { id: '4', title: 'Mehta Penthouse', slug: 'mehta-penthouse', category: 'Residential', description: 'An urban penthouse with panoramic views, styled in warm neutrals and black steel.', hero_image: 'https://picsum.photos/seed/lm-p4/800/1000', images: [], year: 2022, location: 'Bangalore', area: 5500, materials: [], palette: [], status: 'Published', created_at: '' },
  { id: '5', title: 'Atrium Co-Working', slug: 'atrium-coworking', category: 'Commercial', description: 'A dynamic workspace that balances focus zones with vibrant collaboration areas.', hero_image: 'https://picsum.photos/seed/lm-p5/800/1000', images: [], year: 2022, location: 'Hyderabad', area: 8000, materials: [], palette: [], status: 'Published', created_at: '' },
  { id: '6', title: 'Haveli Boutique Hotel', slug: 'haveli-boutique', category: 'Hospitality', description: 'A 19th-century haveli transformed into a 12-room luxury retreat.', hero_image: 'https://picsum.photos/seed/lm-p6/800/1000', images: [], year: 2021, location: 'Udaipur', area: 12000, materials: [], palette: [], status: 'Published', created_at: '' },
]

export default async function PortfolioPage() {
  const dbProjects = await getAllProjects()
  const projects = dbProjects.length > 0 ? dbProjects : PLACEHOLDER

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <p className="label-tag mb-4">Our Work</p>
          <h1 className="font-serif text-6xl md:text-7xl text-charcoal leading-none">Portfolio</h1>
        </div>
      </div>

      {/* Grid */}
      <section className="section-pad pt-0 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <ProjectGrid projects={projects} showFilter />
        </div>
      </section>
    </>
  )
}
