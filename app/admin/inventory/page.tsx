'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { InventoryItem } from '@/lib/types'

const CATEGORIES = ['Furniture', 'Lighting', 'Fabric', 'Decor'] as const
const LOW_STOCK_THRESHOLD = 5

const EMPTY: Partial<InventoryItem> = {
  item_name: '', category: 'Furniture', supplier: '',
  quantity: 0, unit_price: 0, status: 'In Stock', notes: '',
}

function autoStatus(qty: number): InventoryItem['status'] {
  if (qty === 0) return 'Out of Stock'
  if (qty <= LOW_STOCK_THRESHOLD) return 'Low Stock'
  return 'In Stock'
}

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState<Partial<InventoryItem>>(EMPTY)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/inventory')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function set(key: keyof InventoryItem) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.target.value
      const numVal = (key === 'quantity' || key === 'unit_price') ? Number(val) : val
      setForm((prev) => {
        const next = { ...prev, [key]: numVal }
        // auto-compute status from quantity
        if (key === 'quantity') next.status = autoStatus(Number(val))
        return next
      })
    }
  }

  async function handleSave() {
    setSaving(true)
    const method = modal === 'add' ? 'POST' : 'PUT'
    await fetch('/api/admin/inventory', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setModal(null)
    setForm(EMPTY)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch('/api/admin/inventory', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteId }),
    })
    setDeleteId(null)
    load()
  }

  const lowStockCount = items.filter((i) => i.status === 'Low Stock' || i.status === 'Out of Stock').length
  const inputClass = 'w-full border border-gray-200 px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-gold transition-colors'
  const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal/50 mb-1.5'

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Inventory</h1>
          <p className="font-sans text-sm text-charcoal/50 mt-1">{items.length} items tracked</p>
        </div>
        <Button variant="filled" onClick={() => { setForm(EMPTY); setModal('add') }} className="flex items-center gap-2">
          <Plus size={14} />
          Add Item
        </Button>
      </div>

      {/* Low stock alert */}
      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-5 py-3 mb-6">
          <AlertTriangle size={16} className="text-amber-500 shrink-0" />
          <p className="font-sans text-sm text-amber-700">
            {lowStockCount} item{lowStockCount > 1 ? 's' : ''} need attention (low stock or out of stock).
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Item', 'Category', 'Supplier', 'Qty', 'Unit Price', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-sans text-xs tracking-widest uppercase text-charcoal/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-16 text-center font-sans text-sm text-charcoal/40">No inventory items yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className={cn(
                    'border-b border-gray-50 hover:bg-gray-50 transition-colors',
                    item.status === 'Out of Stock' && 'bg-red-50/30'
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {(item.status === 'Low Stock' || item.status === 'Out of Stock') && (
                        <AlertTriangle size={13} className={item.status === 'Out of Stock' ? 'text-red-400' : 'text-amber-400'} />
                      )}
                      <p className="font-sans text-sm font-medium text-charcoal">{item.item_name}</p>
                    </div>
                    {item.notes && <p className="font-sans text-xs text-charcoal/40 mt-0.5">{item.notes}</p>}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-charcoal/60">{item.category}</td>
                  <td className="px-5 py-4 font-sans text-sm text-charcoal/60">{item.supplier || '—'}</td>
                  <td className="px-5 py-4 font-sans text-sm font-medium text-charcoal">{item.quantity}</td>
                  <td className="px-5 py-4 font-sans text-sm text-charcoal/60">{formatCurrency(item.unit_price)}</td>
                  <td className="px-5 py-4">
                    <span className={cn('font-sans text-xs px-3 py-1 rounded-full', getStatusColor(item.status))}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setForm(item); setModal('edit') }}
                        className="p-1.5 text-charcoal/40 hover:text-gold transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 text-charcoal/40 hover:text-red-500 transition-colors"
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

      {/* Add / Edit modal */}
      <Modal
        open={modal !== null}
        onClose={() => { setModal(null); setForm(EMPTY) }}
        title={modal === 'add' ? 'Add Inventory Item' : 'Edit Item'}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Item Name *</label>
            <input value={form.item_name ?? ''} onChange={set('item_name')} className={inputClass} placeholder="e.g. Chesterfield Sofa" />
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select value={form.category ?? 'Furniture'} onChange={set('category')} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Supplier</label>
            <input value={form.supplier ?? ''} onChange={set('supplier')} className={inputClass} placeholder="Supplier name" />
          </div>
          <div>
            <label className={labelClass}>Quantity</label>
            <input type="number" min={0} value={form.quantity ?? 0} onChange={set('quantity')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Unit Price (₹)</label>
            <input type="number" min={0} value={form.unit_price ?? 0} onChange={set('unit_price')} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Status (auto-computed from quantity)</label>
            <div className={cn('font-sans text-sm px-3 py-2.5 border border-gray-200', getStatusColor(form.status ?? 'In Stock'))}>
              {form.status ?? 'In Stock'}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Notes</label>
            <textarea value={form.notes ?? ''} onChange={set('notes')} rows={2} className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <Button variant="ghost" onClick={() => { setModal(null); setForm(EMPTY) }}>Cancel</Button>
          <Button variant="filled" loading={saving} onClick={handleSave}>
            {modal === 'add' ? 'Add Item' : 'Save Changes'}
          </Button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Item" size="md">
        <p className="font-sans text-sm text-charcoal/70 mb-6">This will permanently delete the inventory item.</p>
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
