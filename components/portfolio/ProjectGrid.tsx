'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectFilter, { type FilterCategory } from './ProjectFilter'
import type { Project } from '@/lib/types'

interface ProjectGridProps {
  projects: Project[]
  showFilter?: boolean
}

export default function ProjectGrid({ projects, showFilter = true }: ProjectGridProps) {
  const [active, setActive] = useState<FilterCategory>('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      {showFilter && (
        <div className="mb-12">
          <ProjectFilter active={active} onChange={setActive} />
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center font-sans text-sm text-charcoal/40 py-20">
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
