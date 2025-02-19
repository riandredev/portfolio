import { NextResponse } from 'next/server'
import { getSettings, updateSettings } from '@/lib/mongodb'
import { headers } from 'next/headers'

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const headersList = headers()
    const token = headersList.get('authorization')

    if (token !== `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const settings = await updateSettings(data)
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
