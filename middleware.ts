import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect write operations
  const protectedMethods = ['POST', 'PUT', 'DELETE', 'PATCH']

  // Check if this is a protected operation
  const isProtectedOperation =
    request.nextUrl.pathname.startsWith('/api/posts') &&
    protectedMethods.includes(request.method)

  // Protect dashboard access
  const isDashboardAccess = request.nextUrl.pathname.startsWith('/dashboard')

  if (isProtectedOperation || isDashboardAccess) {
    const authToken = request.cookies.get('auth_token')

    if (!authToken || authToken.value !== process.env.AUTH_TOKEN) {
      // If accessing API, return 401
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      // Otherwise redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/posts/:path*'
  ]
}
