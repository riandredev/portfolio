import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { startOfDay, subDays, startOfWeek, startOfMonth } from 'date-fns'

export async function GET() {
  try {
    const db = await getDb()
    const visitors = db.collection('visitors')

    // Get today's stats
    const today = startOfDay(new Date())
    const yesterday = startOfDay(subDays(new Date(), 1))

    const [
      totalCount,
      todayCount,
      yesterdayCount,
      weekCount,
      monthCount
    ] = await Promise.all([
      visitors.countDocuments({}),
      visitors.countDocuments({ timestamp: { $gte: today } }),
      visitors.countDocuments({
        timestamp: {
          $gte: yesterday,
          $lt: today
        }
      }),
      visitors.countDocuments({
        timestamp: { $gte: startOfWeek(new Date()) }
      }),
      visitors.countDocuments({
        timestamp: { $gte: startOfMonth(new Date()) }
      })
    ])

    const percentageChange = yesterdayCount === 0
      ? 100
      : ((todayCount - yesterdayCount) / yesterdayCount) * 100

    return NextResponse.json({
      total: totalCount,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount,
      percentageChange: Math.round(percentageChange * 10) / 10
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
