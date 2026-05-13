export interface Project {
  id: string
  title: string
  slug: string
  category: 'Residential' | 'Commercial' | 'Hospitality'
  description: string
  hero_image: string
  images: string[]
  year: number
  location: string
  area: number
  materials: string[]
  palette: string[]
  status: 'Draft' | 'Published'
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  project_type: string
  budget_range: string
  message: string
  status: 'New' | 'In Discussion' | 'Converted' | 'Closed'
  notes: string
  created_at: string
}

export interface InventoryItem {
  id: string
  item_name: string
  category: 'Furniture' | 'Lighting' | 'Fabric' | 'Decor'
  supplier: string
  quantity: number
  unit_price: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  notes: string
  created_at: string
}
