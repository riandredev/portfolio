import { VisitorsTable } from '@/components/visitors-table'

export default function AnalyticsPage() {
  return (
    <div className="container px-4 mx-auto py-24 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-medium">Visitor Analytics</h1>
        </div>
        <div className="bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6">
          <VisitorsTable />
        </div>
      </div>
    </div>
  )
}
