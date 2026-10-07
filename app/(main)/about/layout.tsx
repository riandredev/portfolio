import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/me.jpg" as="image" type="image/jpeg" fetchPriority="high" />
      {children}
    </>
  )
}
