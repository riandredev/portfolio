import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/api/posts'
  ]

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
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
