import { withAuth } from 'next-auth/middleware'

export default withAuth({ pages: { signIn: '/admin/login' } })

export const config = {
  // Protect /admin and all /admin/* routes except /admin/login
  matcher: ['/admin', '/admin/((?!login).*)'],
}
