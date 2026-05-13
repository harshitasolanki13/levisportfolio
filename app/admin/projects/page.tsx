'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink, ImagePlus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { formatDate, getStatusColor, slugify } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/types'

const EMPTY: Partial<Project> = {
  title: '', slug: '', category: 'Residential', description: '',
  hero_image: '', year: new Date().getFullYear(), location: '', area: 0,
  materials: [], palette: [], status: 'Draft',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState<Partial<Project>>(EMPTY)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    if (res.ok) setProjects(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function set(key: keyof Project) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.target.value
      setForm((prev) => ({
        ...prev,
        [key]: key === 'year' || key === 'area' ? Number(val) : val,
      }))
    }
  }

  function setArray(key: 'materials' | 'palette') {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value.split(',').map((s) => s.trim()) }))
    }
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...form, slug: form.slug || slugify(form.title ?? '') }
    const method = modal === 'add' ? 'POST' : 'PUT'
    await fetch('/api/admin/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setModal(null)
    setForm(EMPTY)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch('/api/admin/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteId }),
    })
    setDeleteId(null)
    load()
  }

  const inputClass = 'w-full border border-gray-200 px-3 py-2.5 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors'
  const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-1.5'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Projects</h1>
          <p className="font-sans text-sm text-charcoal/50 mt-1">{projects.length} total projects</p>
        </div>
        <Button
          variant="filled"
          onClick={() => { setForm(EMPTY); setModal('add') }}
          className="flex items-center gap-2"
        >
          <Plus size={14} />
          Add Project
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Project', 'Category', 'Year', 'Status', 'Created', 'Actions'].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-sans text-xs tracking-widest uppercase text-charcoal/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">No projects yet. Add your first one.</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-sans text-sm font-medium text-charcoal">{p.title}</p>
                    <p className="font-sans text-xs text-charcoal/40">{p.location}</p>
                  </td>
                  <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{p.category}</td>
                  <td className="px-6 py-4 font-sans text-sm text-charcoal/60">{p.year}</td>
                  <td className="px-6 py-4">
                    <span className={cn('font-sans text-xs px-3 py-1 rounded-full', getStatusColor(p.status))}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-sans text-xs text-charcoal/40">{formatDate(p.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/portfolio/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-charcoal/40 hover:text-charcoal transition-colors"
                        title="View live"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => { setForm(p); setModal('edit') }}
                        className="p-1.5 text-charcoal/40 hover:text-gold transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-charcoal/40 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modal !== null}
        onClose={() => { setModal(null); setForm(EMPTY) }}
        title={modal === 'add' ? 'Add Project' : 'Edit Project'}
        size="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Title *</label>
            <input value={form.title ?? ''} onChange={set('title')} className={inputClass} placeholder="Project title" />
          </div>
          <div>
            <label className={labelClass}>Slug (auto-generated if blank)</label>
            <input value={form.slug ?? ''} onChange={set('slug')} className={inputClass} placeholder="project-slug" />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select value={form.category ?? 'Residential'} onChange={set('category')} className={inputClass}>
              {['Residential', 'Commercial', 'Hospitality'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input type="number" value={form.year ?? ''} onChange={set('year')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input value={form.location ?? ''} onChange={set('location')} className={inputClass} placeholder="City" />
          </div>
          <div>
            <label className={labelClass}>Area (sqft)</label>
            <input type="number" value={form.area ?? ''} onChange={set('area')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status ?? 'Draft'} onChange={set('status')} className={inputClass}>
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Hero Image URL</label>
            <div className="flex gap-2">
              <input value={form.hero_image ?? ''} onChange={set('hero_image')} className={inputClass} placeholder="https://..." />
              <button className="p-2.5 border border-gray-200 text-charcoal/40 hover:text-gold transition-colors shrink-0">
                <ImagePlus size={16} />
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea value={form.description ?? ''} onChange={set('description')} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>Materials (comma-separated)</label>
            <input value={(form.materials ?? []).join(', ')} onChange={setArray('materials')} className={inputClass} placeholder="Marble, Teak, Brass" />
          </div>
          <div>
            <label className={labelClass}>Palette Hex Codes (comma-separated)</label>
            <input value={(form.palette ?? []).join(', ')} onChange={setArray('palette')} className={inputClass} placeholder="#F5F0E8, #C9A96E" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <Button variant="ghost" onClick={() => { setModal(null); setForm(EMPTY) }}>Cancel</Button>
          <Button variant="filled" loading={saving} onClick={handleSave}>
            {modal === 'add' ? 'Create Project' : 'Save Changes'}
          </Button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Project" size="md">
        <p className="font-sans text-sm text-charcoal/70 mb-6">
          Are you sure? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            variant="filled"
            className="bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
