import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'category' | 'status'
  className?: string
}

export default function Badge({ children, variant = 'category', className }: BadgeProps) {
  const base = 'inline-block font-sans text-xs tracking-widest uppercase px-3 py-1'

  const variants = {
    category: 'border border-gold text-gold',
    status: 'bg-gold/10 text-gold',
  }

  return <span className={cn(base, variants[variant], className)}>{children}</span>
}
