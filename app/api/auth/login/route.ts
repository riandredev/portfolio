import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getIpInfo } from '@/lib/ip'

const VALID_EMAIL = process.env.AUTH_EMAIL
const VALID_PASSWORD = process.env.AUTH_PASSWORD
const TOKEN_SECRET = process.env.AUTH_TOKEN

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Debug logs
    console.log('Attempting login with:', {
      providedEmail: email,
      validEmail: process.env.AUTH_EMAIL,
      emailMatch: email === process.env.AUTH_EMAIL,
      providedPassword: password,
      validPassword: process.env.AUTH_PASSWORD,
      passwordMatch: password === process.env.AUTH_PASSWORD
    })

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const ipInfo = await getIpInfo(ip)

    // Simple direct comparison
    if (email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD) {
      // Set auth cookie
      cookies().set('auth_token', process.env.AUTH_TOKEN!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })

      return NextResponse.json({
        success: true,
        ip,
        location: ipInfo.location
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid credentials',
      ip,
      location: ipInfo.location
    }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: 'Server error'
    }, { status: 500 })
  }
}
