'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Package,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-charcoal flex flex-col fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <p className="font-serif text-xl text-white">Levisha Malviya</p>
        <p className="font-sans text-xs tracking-widest uppercase text-gold mt-1">Studio Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded font-sans text-sm transition-all duration-200',
                active
                  ? 'bg-gold/15 text-gold border-l-2 border-gold'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-6 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white font-sans text-sm transition-colors"
        >
          <ExternalLink size={17} />
          View Site
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 font-sans text-sm transition-colors"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
