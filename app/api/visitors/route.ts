import { NextResponse } from 'next/server'
import { getDb, ensureCappedCollection, logVisitor } from '@/lib/mongodb'

// Initialize collection on server start
ensureCappedCollection().catch(console.error)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received visitor data:', data)

    // Validate required fields
    if (!data.city || !data.country || !data.countryCode) {
      console.log('Invalid visitor data:', data)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const visitor = {
      city: data.city,
      region: data.region || 'Unknown',
      country: data.country,
      countryCode: data.countryCode,
      timestamp: new Date(),
      userAgent: request.headers.get('user-agent') || 'Unknown'
    }

    const result = await logVisitor(visitor)
    console.log('Visitor logged with ID:', result.insertedId)

    return NextResponse.json(visitor)
  } catch (error) {
    console.error('POST /api/visitors error:', error)
    return NextResponse.json({ error: 'Failed to add visitor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const db = await getDb()
    const visitor = await db.collection('visitors')
      .find()
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray()

    if (!visitor[0]) return NextResponse.json(null)

    // Transform the data to match the expected format
    const transformed = {
      city: visitor[0].city,
      region: visitor[0].region,
      country: visitor[0].country,
      countryCode: visitor[0].countryCode,
      timestamp: visitor[0].timestamp
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error('Failed to get visitor:', error)
    return NextResponse.json({ error: 'Failed to get visitor' }, { status: 500 })
  }
}
