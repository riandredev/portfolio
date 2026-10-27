import type { ReactNode } from 'react'
import HomeDesignWorksCard from '@/components/home/home-design-works-card'
import ResumeEntry from '@/components/home/resume-entry'
import { certifications, education, experiences, work } from '@/lib/resume-content'

function HomeSection({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="home-section space-y-6 scroll-mt-28">
      <h2 className="font-heading text-[1.0625rem]">{title}</h2>
      <div className="space-y-8">{children}</div>
    </section>
  )
}

export default function HomeResume() {
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
        {work.length === 0 ? (
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
            <HomeDesignWorksCard />
          </>
        )}
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
