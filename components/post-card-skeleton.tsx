import { Skeleton } from './ui/skeleton'

export default function PostCardSkeleton() {
  return (
    <article className="group flex flex-col gap-6">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-2 shrink-0">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    </article>
  )
}
