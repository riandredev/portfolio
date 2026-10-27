import { SIGNATURE_WIDE_PATH, SIGNATURE_WIDE_VIEWBOX } from '@/lib/signature-wide'
import { cn } from '@/lib/utils'

type SignatureWideProps = {
  className?: string
  /** Header: solid fill. Footer: outline-only watermark. */
  variant?: 'fill' | 'stroke'
}

export default function SignatureWide({ className, variant = 'fill' }: SignatureWideProps) {
  const isStroke = variant === 'stroke'

  return (
    <svg
      viewBox={SIGNATURE_WIDE_VIEWBOX}
      fill="none"
      className={cn('block h-auto w-full', className)}
      aria-hidden
      focusable="false"
    >
      <path
        d={SIGNATURE_WIDE_PATH}
        fill={isStroke ? 'none' : 'currentColor'}
        stroke={isStroke ? 'currentColor' : 'none'}
        strokeWidth={isStroke ? 1.15 : undefined}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
