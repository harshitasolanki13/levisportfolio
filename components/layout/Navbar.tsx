'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Pages with a hero image where navbar starts transparent
  const isHeroPage = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const transparent = isHeroPage && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        transparent
          ? 'bg-transparent'
          : 'bg-cream/95 backdrop-blur-sm border-b border-charcoal/10 shadow-sm'
      )}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span
            className={cn(
              'font-serif text-2xl tracking-wide transition-colors duration-300',
              transparent ? 'text-white' : 'text-charcoal'
            )}
          >
            Levisha Malviya
          </span>
          <span className="block h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'font-sans text-xs tracking-widest uppercase transition-colors duration-300 relative group',
                  transparent ? 'text-white/90 hover:text-white' : 'text-charcoal hover:text-gold',
                  pathname.startsWith(href) && !transparent && 'text-gold'
                )}
              >
                {label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-gold transition-transform duration-300 origin-left w-full',
                    pathname.startsWith(href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className={cn(
            'md:hidden transition-colors duration-300',
            transparent ? 'text-white' : 'text-charcoal'
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-cream border-t border-charcoal/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="px-6 py-6 flex flex-col gap-6">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm tracking-widest uppercase text-charcoal hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
