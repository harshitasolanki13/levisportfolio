'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Invalid credentials. Please try again.')
    } else {
      router.push('/admin')
    }
  }

  const inputClass =
    'w-full bg-white/5 border border-white/20 px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors duration-300'

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-serif text-3xl text-white">Levisha Malviya</p>
          <p className="font-sans text-xs tracking-widest uppercase text-gold mt-1">
            Studio Admin
          </p>
        </div>

        {/* Card */}
        <div className="border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={16} className="text-gold" />
            <h1 className="font-sans text-sm tracking-widest uppercase text-white/80">
              Sign In
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@studio.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400">{error}</p>
            )}

            <Button
              type="submit"
              variant="gold"
              loading={loading}
              className="w-full justify-center mt-2"
            >
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-white/20 mt-6">
          Protected area — authorised access only.
        </p>
      </div>
    </div>
  )
}
