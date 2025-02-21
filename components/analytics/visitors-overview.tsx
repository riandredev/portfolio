'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, ArrowDownRight, ArrowUpRight, Users, Calendar, CalendarRange } from "lucide-react"
import { useEffect, useState } from "react"

interface VisitorsStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  percentageChange: number
}

export default function VisitorsOverview() {
  const [stats, setStats] = useState<VisitorsStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics/visitors-overview')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse h-[120px] bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Lifetime visitors</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.today}</div>
          <div className="flex items-center pt-1">
            {(stats?.percentageChange ?? 0) > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <p className={`text-xs ${(stats?.percentageChange ?? 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(stats?.percentageChange ?? 0)}% from yesterday
            </p>
          </div>
        </CardContent>
      </Card>

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">This Week</CardTitle>
      <Calendar className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats?.thisWeek}</div>
      <p className="text-xs text-muted-foreground">
        ~{Math.round((stats?.thisWeek || 0) / 7)} visitors/day
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">This Month</CardTitle>
      <CalendarRange className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats?.thisMonth}</div>
      <p className="text-xs text-muted-foreground">
        ~{Math.round((stats?.thisMonth || 0) / 30)} visitors/day
      </p>
    </CardContent>
  </Card>
</div>
  )
}
