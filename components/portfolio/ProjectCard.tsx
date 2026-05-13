'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[4/5] bg-charcoal/5">
          <Image
            src={project.hero_image || `https://picsum.photos/seed/${project.slug}/800/1000`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <p className="font-sans text-xs tracking-widest uppercase text-cream/90 border-b border-gold pb-1">
              View Project
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-1">
                {project.category}
              </p>
              <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug">
                {project.title}
              </h3>
            </div>
            <span className="font-sans text-sm text-charcoal/40 mt-1 shrink-0">{project.year}</span>
          </div>
          {project.location && (
            <p className="font-sans text-xs text-charcoal/40 mt-2">{project.location}</p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
