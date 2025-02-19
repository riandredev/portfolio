import { NextResponse } from 'next/server'
import { getUniqueVisitors } from '@/lib/mongodb'

export async function GET() {
  try {
    const visitors = await getUniqueVisitors()
    return NextResponse.json(visitors)
  } catch (error) {
    console.error('Failed to get visitors:', error)
    return NextResponse.json({ error: 'Failed to get visitors' }, { status: 500 })
  }
}
