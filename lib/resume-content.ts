export type ResumeExperience = {
  id: string
  company: string
  role: string
  period: string
  location?: string
  href?: string
  /** Home / portfolio blurb */
  summary?: string
  /** ATS resume bullets (PDF/LaTeX); not shown on home yet */
  resumeBullets?: string[]
}

export type ResumeEducation = {
  id: string
  degree: string
  school: string
  period: string
  href?: string
}

export type ResumeCertification = {
  id: string
  name: string
  issuer: string
  date: string
  href?: string
}

export type ResumeWork = {
  id: string
  title: string
  subtitle?: string
  period: string
  href?: string
  /** Home / portfolio blurb */
  summary?: string
  /** ATS resume bullets (metrics, stack, outcomes) */
  bullets?: string[]
}

export const work: ResumeWork[] = [
  {
    id: 'genx-digital',
    title: 'GenX Digital',
    subtitle: 'Next.js, TypeScript, React',
    period: 'Oct 2026 - Nov 2026',
    href: 'https://genxdigital.co.za/',
    summary:
      'Designed and built the public site for GenX Digital, a web development, design, and digital marketing agency: responsive design, performance optimization, and a fast path from homepage to contact.',
    bullets: [
      'Designed and shipped the GenX Digital marketing site (genxdigital.co.za): responsive design, service positioning, and a contact funnel for a web, design, and digital marketing agency.',
      'Delivered brand collateral in production: dual product wordmarks (Digital + Secure), OG/social preview art, and a cohesive visual system across 10+ layout variants.',
      'Architected performance-optimized Next.js pages with clear IA so visitors reach services and contact in 2 clicks or fewer from the homepage.',
    ],
  },
  {
    id: 'aims',
    title: 'AIMS',
    subtitle: 'African Institute for Mathematical Sciences',
    period: 'Feb 2026',
    href: 'https://aims.ac.za/',
    summary:
      'Evolved the AIMS public site on Hugo: refreshed the theme, then built on top of it with a Markdown templating system so the team can add content and section layouts without repeating the same structure by hand.',
    bullets: [
      'Extended the AIMS public site (aims.ac.za) on Hugo: customized the theme and shipped reusable section partials for institute-wide pages.',
      'Implemented a Markdown templating workflow so editors can publish new pages and compose section layouts without copying HTML or duplicating front-end files.',
      'Reduced reliance on developer-only deploys for content updates by standardizing 15+ repeatable section types (hero, stats, CTAs, cards, etc.) in Markdown front matter.',
    ],
  },
  {
    id: 'kliio',
    title: 'Kliio',
    subtitle: 'Project delivery CRM for agencies and freelancers',
    period: 'Oct 2025 - Present',
    href: 'https://getkliio.com/',
    summary:
      'Building Kliio end to end: a workspace that ties briefs, projects, client conversations, approvals, and billing together so freelancers and agencies can deliver without juggling a stack of tools. Ongoing product, UI, and marketing site work.',
    bullets: [
      'Founding engineer on Kliio (getkliio.com): React.js / Next.js SaaS with REST API integration, authentication, and billing for agencies and freelancers.',
      'Own product UI, marketing site, and core app flows end to end (TypeScript, responsive design, web accessibility (WCAG-aware patterns)).',
      'Designed the workspace to replace 5+ disconnected tools (docs, chat, PM, invoicing) with one client-facing delivery hub.',
    ],
  },
]

/** Newest first — use for PDF / ATS “Work” section (replaces legacy Projects block). */
export function formatWorkForResumePdf(): string {
  return work
    .map((item) => {
      const stackLine = item.subtitle ? ` — ${item.subtitle}` : ''
      const header = `${item.title}${stackLine} | ${item.period}`
      const url = item.href ? `\n${item.href}` : ''
      const bullets = (item.bullets ?? []).map((b) => `• ${b}`).join('\n')
      return `${header}${url}\n${bullets}`
    })
    .join('\n\n')
}

export function formatExperienceForResumePdf(): string {
  return experiences
    .map((item) => {
      const loc = item.location ? ` — ${item.location}` : ''
      const header = `${item.role} | ${item.period}\n${item.company}${loc}`
      const url = item.href ? `\n${item.href}` : ''
      const bullets = (item.resumeBullets ?? []).map((b) => `• ${b}`).join('\n')
      return `${header}${url}${bullets ? `\n${bullets}` : ''}`
    })
    .join('\n\n')
}

export const experiences: ResumeExperience[] = [
  {
    id: 'pixelmeta',
    company: 'PixelMeta',
    role: 'Front-end Web Engineer & UI/UX Designer',
    period: 'Jun 2025 - Present',
    location: 'Cape Town, South Africa',
    href: 'https://pixelperfect.co.za',
    summary:
      'I design and build client sites and apps with WordPress, React, Next.js, and modern JS stacks (MERN, T3), including large-scale WordPress migrations and front-end performance work. I focus on responsive UI, SEO, and conversion-focused delivery.',
    resumeBullets: [
      'Designed and developed websites and web applications for clients using WordPress and modern JavaScript frameworks including MERN and T3 stacks.',
      'Migrated 20+ WordPress client sites to updated themes and performance-tuned setups, improving average Lighthouse performance scores by 40% through caching, asset optimization, responsive design, and SEO-focused front-end work.',
      'Delivered responsive UI/UX designs and optimized front-end performance to improve usability, SEO, and client conversion rates.',
    ],
  },
  {
    id: 'konzult',
    company: 'Konzult',
    role: 'Software Developer',
    period: 'Apr 2025 - Jun 2025',
    location: 'Krugersdorp, South Africa',
    href: 'https://konzult.co.za/',
    summary:
      'I built custom Microsoft Power Apps for business analytics clients on the Power Platform (Power Apps, Automate, Power BI, Entra ID)—internal tools teams actually use.',
    resumeBullets: [
      'Designed and built custom Microsoft Power Apps for businesses, improving collaboration and operational reporting.',
      'Used Power Platform (Power Apps, Power Automate, Power BI, Entra ID) to deliver 3+ responsive internal applications.',
    ],
  },
  {
    id: 'jb',
    company: 'JB Decorative Concrete',
    role: 'Front-end Web Engineer',
    period: 'Aug 2024 - Nov 2024',
    location: 'Roodepoort, South Africa',
    summary:
      'I shipped their Next.js marketing site with technical SEO, responsive design, and performance optimization, plus UX iterations that improved conversions on key service pages.',
    resumeBullets: [
      'Launched a Next.js marketing site with responsive design, technical SEO, and performance optimization (Core Web Vitals).',
      'Increased organic traffic by [X]% within 4 months post-launch — replace [X] with your Analytics figure before sending.',
      'Improved contact-page conversion rate by [Y]% through UX research and WCAG-aware layout refinements — replace [Y] with your figure.',
    ],
  },
]

export const education: ResumeEducation[] = [
  {
    id: 'ctu-fet',
    degree: 'Further Education and Training Certificate: Information Technology',
    school: 'CTU Training Solutions',
    period: '2023 - 2024',
    href: 'https://ctutraining.ac.za',
  },
]

export const certifications: ResumeCertification[] = [
  {
    id: 'meta-dm',
    name: 'Digital Marketing Associate',
    issuer: 'Meta',
    date: 'Nov 2024',
    href: 'https://www.credly.com/earner/earned/badge/2477fe4f-f774-4b34-8c77-2f08dbd4c72a',
  },
  {
    id: 'html-css',
    name: 'IT Specialist',
    issuer: 'Certiport',
    date: 'May 2023',
    href: 'https://www.credly.com/badges/9d425dc8-1ef2-4d1a-a09e-94cc5c469db3',
  },
  {
    id: 'adobe-vd',
    name: 'Adobe Certified Professional in Visual Design',
    issuer: 'Adobe',
    date: 'Oct 2023',
    href: 'https://www.credly.com/badges/7a625f15-48ed-49e7-aeeb-1aa619daa7e0',
  },
  {
    id: 'adobe-ai',
    name: 'Adobe Certified Professional in Graphic Design & Illustration Using Adobe Illustrator',
    issuer: 'Adobe',
    date: 'Oct 2023',
    href: 'https://www.credly.com/badges/688e8c77-6650-4172-b373-e8edde08dd86',
  },
  {
    id: 'adobe-ps',
    name: 'Adobe Certified Professional in Visual Design Using Adobe Photoshop',
    issuer: 'Adobe',
    date: 'Oct 2023',
    href: 'https://www.credly.com/badges/f4d87b4a-7c8d-4015-aa57-f5e1dc4ce485',
  },
]
