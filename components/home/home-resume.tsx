import type { ReactNode } from 'react'
import Link from 'next/link'
import HomeDesignWorksCard from '@/components/home/home-design-works-card'
import ResumeEntry from '@/components/home/resume-entry'
import { getPostsList } from '@/lib/posts-server'
import { certifications, education, experiences, work } from '@/lib/resume-content'
import type { Post } from '@/types/post'

function HomeSection({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="home-section space-y-6 scroll-mt-28">
      <h2 className="font-heading text-[1.0625rem]">{title}</h2>
      <div className="space-y-8">{children}</div>
    </section>
  )
}

function formatProjectPeriod(post: Post) {
  const raw = post.publishedAt || post.createdAt
  if (!raw) return ''
  const year = new Date(raw).getFullYear()
  return String(year)
}

export default async function HomeResume() {
  const posts = (await getPostsList()) as unknown as Post[]
  const published = posts
    .filter((p) => p.published)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      const da = new Date(a.publishedAt || a.createdAt || 0).getTime()
      const db = new Date(b.publishedAt || b.createdAt || 0).getTime()
      return db - da
    })

  return (
    <div className="home-resume mt-6 space-y-16 pt-2">
      <HomeSection title="Experience">
        {experiences.map((item) => (
          <ResumeEntry
            key={item.id}
            title={item.company}
            subtitle={item.role}
            period={item.period}
            summary={item.summary}
            href={item.href}
          />
        ))}
      </HomeSection>

      <HomeSection title="Work" id="work">
        {work.length === 0 && published.length === 0 ? (
          <>
            <p className="font-geist text-[15px] text-[var(--paper-muted)]">Work samples coming soon.</p>
            <HomeDesignWorksCard />
          </>
        ) : (
          <>
            {work.map((item) => (
              <ResumeEntry
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                period={item.period}
                summary={item.summary}
                href={item.href}
              />
            ))}
            {published.map((post) => (
              <ResumeEntry
                key={post._id}
                title={post.title}
                period={formatProjectPeriod(post)}
                summary={post.description}
                href={`/posts/${post.slug}`}
              />
            ))}
            <HomeDesignWorksCard />
          </>
        )}
        {published.length > 0 ? (
          <p className="font-geist text-sm text-[var(--paper-muted)]">
            <Link href="/posts" className="intro-link">View all work</Link>
          </p>
        ) : null}
      </HomeSection>

      <HomeSection title="Education">
        {education.map((item) => (
          <ResumeEntry
            key={item.id}
            title={item.degree}
            subtitle={item.school}
            period={item.period}
            href={item.href}
          />
        ))}
      </HomeSection>

      <HomeSection title="Certifications">
        {certifications.map((item) => (
          <ResumeEntry
            key={item.id}
            title={item.name}
            subtitle={item.issuer}
            period={item.date}
            href={item.href}
          />
        ))}
      </HomeSection>
    </div>
  )
}
