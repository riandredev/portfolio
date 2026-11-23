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
    id: 'orion',
    title: 'Orion',
    subtitle: 'Electron, React 19, TypeScript, Vite',
    period: 'Dec 2024 - Nov 2026',
    href: 'https://github.com/riandredev/orion',
    summary:
      'Open-source church presentation software built for my church\'s 5-person IT team, used every week to project hymns, Bible passages and slides to 2 projectors. Multi-display projection, PowerPoint/Keynote/PDF/Bible importers, 37k lines TypeScript with 119 Vitest tests, cross-platform installers. GPL-3.0 license. Live at orion.riandre.com.',
    bullets: [
      'Built a cross-platform desktop app for my church\'s 5-person IT team, used every week in services to send the order of service, hymns, Bible passages and slides to 2 projectors; free under GPL-3.0.',
      'Engineered multi-display projection to any number of enabled outputs (sandboxed windows, video and web output, transitions), plus PowerPoint, Keynote, PDF and Bible importers.',
      'Prototyping a lighter experimental build with a native projector written in Rust (wgpu GPU rendering, WGSL transition shaders) aimed at lower memory use, switchable from the stable release in-app.',
      '37k lines of TypeScript with 119 passing Vitest unit tests; Windows, Linux and universal macOS installers built via electron-builder, with the macOS release automated in GitHub Actions.',
    ],
  },
  {
    id: 'genx-digital',
    title: 'GenX Digital',
    subtitle: 'Astro, TypeScript, Markdown, Git',
    period: 'Oct 2026 - Nov 2026',
    href: 'https://genxdigital.co.za/',
    summary:
      'Designed and shipped the agency\'s marketing site and brand system (wordmarks, OG art, 10+ layout variants), with information architecture that puts services and contact within 2 clicks of the homepage.',
    bullets: [
      'Designed and shipped the agency\'s marketing site and brand system (wordmarks, OG art, 10+ layout variants), with information architecture that puts services and contact within 2 clicks of the homepage.',
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
    id: 'kliio',
    company: 'Kliio',
    role: 'Founding Engineer',
    period: 'Oct 2025 - Present',
    location: 'Next.js, React, TypeScript',
    href: 'https://getkliio.com/',
    summary:
      'Own the product UI, marketing site and core app flows end to end for a pre-launch project-delivery CRM unifying briefs, tasks, client chat, approvals and billing. Designed the workspace to replace 5+ disconnected tools with one client-facing hub.',
    resumeBullets: [
      'Own the product UI, marketing site and core app flows end to end for a pre-launch project-delivery CRM unifying briefs, tasks, client chat, approvals and billing.',
      'Designed the workspace to replace 5+ disconnected tools (docs, chat, PM, invoicing) with one client-facing hub.',
    ],
  },
  {
    id: 'pixelmeta',
    company: 'PixelMeta (formerly PixelPerfect)',
    role: 'Front-end Engineer & UI/UX Designer',
    period: 'Jun 2025 - Present',
    location: 'Cape Town, South Africa',
    href: 'https://pixelmeta.co.za/',
    summary:
      'Designed and built 30+ client websites and web apps, from WordPress builds to Next.js applications on MERN and T3 stacks; designed 10+ sites from scratch in Figma, including hand-offs to other developers. Built Solara Psychics end to end: the Next.js website, a real-time live chat service and third-party integrations. Lifted average Lighthouse performance scores by 40% across 20+ migrated WordPress sites.',
    resumeBullets: [
      'Designed and built 30+ client websites and web apps, from WordPress builds to Next.js applications on MERN and T3 stacks; designed 10+ sites from scratch in Figma, including hand-offs to other developers.',
      'Built Solara Psychics end to end: the Next.js website, a real-time live chat service and third-party integrations.',
      'Lifted average Lighthouse performance scores by 40% across 20+ migrated client WordPress sites through caching, asset optimisation, responsive design and SEO-focused front-end work.',
      'Extended the AIMS public site (aims.ac.za) on Hugo: customised the theme, built reusable section partials and standardised 15+ section types in Markdown front matter so editors publish without copying HTML.',
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
      'Built a Microsoft Power Platform business app for a national insurance client as Konzult client work, using Power Apps, Power Automate, Power BI and Entra ID.',
    resumeBullets: [
      'Built a Microsoft Power Platform business app for a national insurance client as Konzult client work, using Power Apps, Power Automate, Power BI and Entra ID.',
    ],
  },
  {
    id: 'jb',
    company: 'JB Decorative Concrete',
    role: 'Front-end Web Engineer',
    period: 'Aug 2024 - Nov 2024',
    location: 'Roodepoort, South Africa',
    summary:
      'Built a user-friendly Next.js website with modern SEO best practices; ran UX research to refine usability.',
    resumeBullets: [
      'Built a user-friendly Next.js website with modern SEO best practices; ran UX research to refine usability.',
    ],
  },
]

export const education: ResumeEducation[] = [
  {
    id: 'ctu-nc',
    degree: 'National Certificate: IT (Systems Development) · 83% avg | FETC 88% avg · Web Programming 91%',
    school: 'CTU Training Solutions',
    period: '2023 - 2025',
    href: 'https://allqs.saqa.org.za/showQualification.php?id=48872',
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
