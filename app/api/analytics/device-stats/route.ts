import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    const visitors = db.collection('visitors')

    const deviceStats = await visitors.aggregate([
      {
        $addFields: {
          deviceType: {
            $cond: {
              if: { $regexMatch: { input: "$userAgent", regex: /Mobile|Android|iPhone|iPad/i } },
              then: "mobile",
              else: "desktop"
            }
          }
        }
      },
      {
        $group: {
          _id: "$deviceType",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]).toArray()

    const total = deviceStats.reduce((acc, curr) => acc + curr.count, 0)

    return NextResponse.json(deviceStats.map(stat => ({
      ...stat,
      percentage: Math.round((stat.count / total) * 100 * 10) / 10
    })))
  } catch (error) {
    console.error('Device stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch device statistics' },
      { status: 500 }
    )
  }
}
