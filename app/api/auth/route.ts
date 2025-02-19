import { validateCredentials } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const isValid = await validateCredentials(email, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Set auth cookie
    cookies().set('auth_token', process.env.AUTH_TOKEN!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  cookies().delete('auth_token')
  return NextResponse.json({ success: true })
}
