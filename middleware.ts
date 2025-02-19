import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('auth_token')

    // If no auth token present, redirect to login
    if (!authToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}
