import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Levisha Malviya — Interior Design Studio',
    template: '%s | Levisha Malviya',
  },
  description:
    'Luxury interior design studio creating bespoke spaces that reflect your story. Residential, commercial, and hospitality projects across India.',
  keywords: ['interior design', 'luxury interiors', 'Levisha Malviya', 'home design', 'India'],
  openGraph: {
    type: 'website',
    siteName: 'Levisha Malviya Studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
