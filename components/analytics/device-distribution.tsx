'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Monitor } from "lucide-react"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface DeviceStat {
  type: string
  count: number
  percentage: number
}

export default function DeviceDistribution() {
  const [stats, setStats] = useState<DeviceStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics/device-stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="animate-pulse h-[240px] bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Device Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map(stat => (
          <div key={stat.type} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {stat.type === 'desktop' ? (
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm capitalize">{stat.type}</span>
              </div>
              <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
            </div>
            <Progress value={stat.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
