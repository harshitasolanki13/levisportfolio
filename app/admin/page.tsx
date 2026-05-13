'use client'

import { useEffect, useState } from 'react'
import { FolderOpen, MessageSquare, Package, TrendingUp, Clock } from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'
import type { Inquiry } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Stats {
  projects: number
  inquiries: number
  inventory: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, inquiries: 0, inventory: 0 })
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [pRes, iRes, invRes] = await Promise.all([
          fetch('/api/admin/projects'),
          fetch('/api/admin/inquiries'),
          fetch('/api/admin/inventory'),
        ])
        const [projects, inquiries, inventory] = await Promise.all([
          pRes.ok ? pRes.json() : [],
          iRes.ok ? iRes.json() : [],
          invRes.ok ? invRes.json() : [],
        ])
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          inquiries: Array.isArray(inquiries) ? (inquiries as Inquiry[]).filter((i) => i.status === 'New').length : 0,
          inventory: Array.isArray(inventory) ? inventory.length : 0,
        })
        setRecentInquiries(Array.isArray(inquiries) ? (inquiries as Inquiry[]).slice(0, 5) : [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FolderOpen, color: 'text-blue-500' },
    { label: 'Open Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-amber-500' },
    { label: 'Inventory Items', value: stats.inventory, icon: Package, color: 'text-emerald-500' },
    { label: 'This Month', value: '—', icon: TrendingUp, color: 'text-gold' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal">Dashboard</h1>
        <p className="font-sans text-sm text-charcoal/50 mt-1">
          Welcome back. Here's what's happening in the studio.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40">{label}</p>
              <Icon size={18} className={color} />
            </div>
            <p className="font-serif text-4xl text-charcoal">
              {loading ? <span className="animate-pulse">—</span> : value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-serif text-lg text-charcoal">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="font-sans text-xs tracking-widest uppercase text-gold hover:text-charcoal transition-colors">
            View All
          </a>
        </div>

        {loading ? (
          <div className="p-8 text-center font-sans text-sm text-charcoal/40">Loading...</div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-8 text-center">
            <Clock size={32} className="mx-auto text-charcoal/20 mb-3" />
            <p className="font-sans text-sm text-charcoal/40">No inquiries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Client', 'Type', 'Budget', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-sans text-xs tracking-widest uppercase text-charcoal/40">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-sans text-sm font-medium text-charcoal">{inq.name}</p>
                      <p className="font-sans text-xs text-charcoal/40">{inq.email}</p>
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{inq.project_type || '—'}</td>
                    <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{inq.budget_range || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={cn('font-sans text-xs px-3 py-1 rounded-full', getStatusColor(inq.status))}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-charcoal/40">
                      {formatDate(inq.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
