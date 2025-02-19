'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { getFlagUrl } from '@/lib/flags'
import Image from 'next/image'

interface Visitor {
  _id: string;
  city: string;
  country: string;
  countryCode: string;
  timestamp: string;
  userAgent: string;
  count: number; // Add count field
}

export function VisitorsTable() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('/api/visitors/all')
        const data = await response.json()
        setVisitors(data)
      } catch (error) {
        console.error('Failed to fetch visitors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVisitors()
  }, [])

  const formatUserAgent = (userAgent: string) => {
    const browser = userAgent.match(/(chrome|safari|firefox|edge|opera(?=\/))\/?\s*(\d+)/i)
    const os = userAgent.match(/windows nt|mac os x|linux/i)

    return {
      browser: browser ? browser[1] : 'Unknown',
      version: browser ? browser[2] : '',
      os: os ? os[0] : 'Unknown'
    }
  }

  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        Loading visitor data...
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700/50">
          <tr>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Browser</th>
            <th className="px-6 py-3">OS</th>
            <th className="px-6 py-3">Visits</th>
            <th className="px-6 py-3">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => {
            const userAgentInfo = formatUserAgent(visitor.userAgent)

            return (
              <tr key={index} className="border-b border-zinc-200 dark:border-zinc-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {visitor.countryCode && (
                      <Image
                        src={getFlagUrl(visitor.countryCode, 24) || '/default-flag.png'}
                        alt={`Flag of ${visitor.country}`}
                        className="w-6 h-auto rounded"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                    )}
                    <span>
                      {visitor.city}, {visitor.country}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {`${userAgentInfo.browser} ${userAgentInfo.version}`}
                </td>
                <td className="px-6 py-4">
                  {userAgentInfo.os}
                </td>
                <td className="px-6 py-4">
                  {visitor.count}
                </td>
                <td className="px-6 py-4">
                  {formatDistanceToNow(new Date(visitor.timestamp), { addSuffix: true })}
                </td>
              </tr>
            )
          })}
          {visitors.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-zinc-500">
                No visitors yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
