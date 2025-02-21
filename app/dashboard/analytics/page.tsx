import VisitorsOverview from "@/components/analytics/visitors-overview"
import GeoDistribution from "@/components/analytics/geo-distribution"
import DeviceDistribution from "@/components/analytics/device-distribution"
import TimeChart from "@/components/analytics/time-chart"
import { VisitorsTable } from "@/components/visitors-table"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-24 space-y-8">
      <div>
        <h2 className="text-2xl font-medium">Analytics</h2>
        <p className="text-muted-foreground">Detailed visitor analytics and insights.</p>
      </div>

      <VisitorsOverview />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <GeoDistribution />
        <DeviceDistribution />
        <div className="md:col-span-2">
          <TimeChart />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Recent Visitors</h3>
          <VisitorsTable />
        </div>
      </div>
    </div>
  )
}
