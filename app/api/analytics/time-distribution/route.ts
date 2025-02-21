import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { startOfDay, subDays } from 'date-fns'

export async function GET() {
  try {
    const db = await getDb()
    const visitors = db.collection('visitors')

    // Get last 7 days of traffic
    const timeStats = await visitors.aggregate([
      {
        $match: {
          timestamp: {
            $gte: subDays(startOfDay(new Date()), 7)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$timestamp"
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]).toArray()

    return NextResponse.json(timeStats.map(day => ({
      date: day._id,
      visits: day.count
    })))
  } catch (error) {
    console.error('Time distribution error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time distribution data' },
      { status: 500 }
    )
  }
}
