'use client'

import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality'] as const
export type FilterCategory = (typeof CATEGORIES)[number]

interface ProjectFilterProps {
  active: FilterCategory
  onChange: (cat: FilterCategory) => void
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'font-sans text-xs tracking-widest uppercase pb-2 border-b-2 transition-all duration-300',
            active === cat
              ? 'border-gold text-charcoal'
              : 'border-transparent text-charcoal/40 hover:text-charcoal'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
