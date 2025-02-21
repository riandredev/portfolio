import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    const visitors = db.collection('visitors')

    const geoStats = await visitors.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          country: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]).toArray()

    const total = geoStats.reduce((acc, curr) => acc + curr.count, 0)

    const result = geoStats.map(stat => ({
      country: stat.country || 'Unknown',
      count: stat.count,
      percentage: Math.round((stat.count / total) * 100 * 10) / 10
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Geo stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch geographic distribution' },
      { status: 500 }
    )
  }
}
