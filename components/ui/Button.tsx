'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'gold' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'outline', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-sans tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream',
      gold: 'border border-gold text-gold hover:bg-gold hover:text-charcoal',
      filled: 'bg-charcoal text-cream border border-charcoal hover:bg-transparent hover:text-charcoal',
      ghost: 'text-charcoal hover:text-gold',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs',
      md: 'px-8 py-3 text-sm',
      lg: 'px-10 py-4 text-sm',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
