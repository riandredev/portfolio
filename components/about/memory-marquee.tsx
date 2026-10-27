import { cn } from '@/lib/utils'

type MemoryMarqueeProps = {
  text: string
  className?: string
}

export default function MemoryMarquee({ text, className }: MemoryMarqueeProps) {
  return (
    <div className={cn('memory-marquee', className)} title={text}>
      <div className="memory-marquee__track">
        <span className="memory-marquee__segment">{text}</span>
        <span className="memory-marquee__segment" aria-hidden>{text}</span>
      </div>
    </div>
  )
}
