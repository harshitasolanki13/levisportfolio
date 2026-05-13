'use client'

import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Inquiry } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

const STATUSES = ['All', 'New', 'In Discussion', 'Converted', 'Closed'] as const
type StatusFilter = (typeof STATUSES)[number]

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<Inquiry['status']>('New')
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/inquiries')
    if (res.ok) setInquiries(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openDetail(inq: Inquiry) {
    setSelected(inq)
    setNotes(inq.notes ?? '')
    setStatus(inq.status)
  }

  async function saveChanges() {
    if (!selected) return
    setSaving(true)
    await fetch('/api/admin/inquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, status, notes }),
    })
    setSaving(false)
    setSelected(null)
    load()
  }

  const filtered = statusFilter === 'All'
    ? inquiries
    : inquiries.filter((i) => i.status === statusFilter)

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Inquiries</h1>
          <p className="font-sans text-sm text-charcoal/50 mt-1">{inquiries.length} total inquiries</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter size={14} className="text-charcoal/40" />
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              'font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-colors duration-200',
              statusFilter === s
                ? 'bg-charcoal text-cream border-charcoal'
                : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/60'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Client', 'Project Type', 'Budget', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-sans text-xs tracking-widest uppercase text-charcoal/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">No inquiries found.</td></tr>
            ) : (
              filtered.map((inq) => (
                <tr key={inq.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-sans text-sm font-medium text-charcoal">{inq.name}</p>
                    <p className="font-sans text-xs text-charcoal/40">{inq.email}</p>
                    {inq.phone && <p className="font-sans text-xs text-charcoal/40">{inq.phone}</p>}
                  </td>
                  <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{inq.project_type || '—'}</td>
                  <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{inq.budget_range || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={cn('font-sans text-xs px-3 py-1 rounded-full', getStatusColor(inq.status))}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-sans text-xs text-charcoal/40">{formatDate(inq.created_at)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openDetail(inq)}
                      className="font-sans text-xs tracking-widest uppercase text-gold hover:text-charcoal transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? 'Inquiry Detail'}
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 text-sm font-sans">
              <div><p className="text-charcoal/40 text-xs mb-1">Email</p><p>{selected.email}</p></div>
              <div><p className="text-charcoal/40 text-xs mb-1">Phone</p><p>{selected.phone || '—'}</p></div>
              <div><p className="text-charcoal/40 text-xs mb-1">Project Type</p><p>{selected.project_type || '—'}</p></div>
              <div><p className="text-charcoal/40 text-xs mb-1">Budget</p><p>{selected.budget_range || '—'}</p></div>
            </div>

            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-2">Message</p>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed bg-gray-50 p-4">{selected.message}</p>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Inquiry['status'])}
                className="w-full border border-gray-200 px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              >
                {['New', 'In Discussion', 'Converted', 'Closed'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-1.5">
                Internal Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes for your reference..."
                className="w-full border border-gray-200 px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setSelected(null)}>Cancel</Button>
              <Button variant="filled" loading={saving} onClick={saveChanges}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
