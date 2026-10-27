# Resume LaTeX — ATS paste blocks

Copy into your Jake’s Resume `.tex` file. Source of truth for site timelines: `lib/resume-content.ts`.

**Date format (everywhere):** `Mon YYYY -- Mon YYYY` or `Mon YYYY -- Present` (double hyphen in LaTeX).  
**Locations:** `City, South Africa` on the company line or right column — same pattern for every role.

---

## Headline & contact (parser-friendly)

```latex
{\Large Frontend Engineer}

\small
\href{https://riandre.com}{riandre.com} \textbar{}
\href{https://github.com/riandredev}{github.com/riandredev} \textbar{}
\href{mailto:hello@riandre.com}{hello@riandre.com} \textbar{}
\href{https://linkedin.com/in/riandre}{linkedin.com/in/riandre} \textbar{}
+27 76 830 5530 \\
Krugersdorp, South Africa
```

Use **Frontend Engineer** (one word) in the headline — not the long subtitle with em dashes.

---

## Summary

```text
Frontend Engineer focused on UI/UX and web application development. Build responsive, accessible products with React.js, Next.js, and TypeScript — wireframing and prototyping in Figma, API integration, authentication, and performance optimization (SEO, Core Web Vitals, Lighthouse). Apply cross-browser compatibility and web accessibility (WCAG-aware patterns) in production work. Comfortable in remote, cross-functional teams.
```

---

## Technical Skills (with Frontend Frameworks subsection)

```latex
\section{Technical Skills}
  \textbf{Frontend Frameworks:} React.js, Next.js (React, SSR/App Router), Vue.js, Astro \\
  \textbf{Languages:} TypeScript, JavaScript, HTML, CSS, SQL (PostgreSQL) \\
  \textbf{Libraries:} Tailwind CSS, Material UI, Framer Motion, GSAP, Three.js \\
  \textbf{Practices:} Responsive design, mobile-first UI, cross-browser compatibility, web accessibility (WCAG), performance optimization, SEO, RESTful API integration \\
  \textbf{Tools:} Git, Figma, Vercel, VS Code, Google Cloud Platform, Webpack \\
  \textbf{UI/UX:} Figma, Webflow, Excalidraw, Adobe Creative Suite
```

Drop **Angular.js** unless you want to interview on it.

---

## Experience (titles, dates, metrics)

### PixelMeta — Cape Town, South Africa

- **Title:** UI/UX Designer and Software Developer  
- **Dates:** Jun 2025 -- Present  

**Replace `[N]` (site count) and `[X]` (Lighthouse or load-time gain) with figures you can cite** — e.g. PageSpeed before/after, or median mobile performance score.

```latex
\resumeItem{Designed and developed client websites and web applications using WordPress, React.js, Next.js, and modern JavaScript stacks (MERN, T3).}
\resumeItem{Migrated [N] WordPress client sites to updated themes and performance-tuned setups, improving average Lighthouse performance scores by [X]\% through caching, asset optimization, responsive design, and SEO-focused front-end work.}
\resumeItem{Integrated Supabase, authentication, RESTful APIs, and third-party services into full-stack delivery workflows.}
```

### Konzult — Krugersdorp, South Africa

- **Title:** Software Developer  
- **Dates:** Apr 2025 -- Jun 2025  

```latex
\resumeItem{Built custom Microsoft Power Apps on Power Platform (Power Apps, Power Automate, Power BI, Entra ID) for business analytics clients.}
\resumeItem{Delivered 3+ internal apps that improved team collaboration and reporting turnaround time.}
```

### JB Decorative Concrete — Roodepoort, South Africa

- **Title:** Frontend Engineer  
- **Dates:** Aug 2024 -- Nov 2024  
- **Portfolio:** \href{https://riandre.com}{riandre.com} (case study) or live client URL if public  

**Replace `[X]` and `[Y]` with real Google Analytics / Search Console numbers before applying.**

```latex
\resumeItem{Launched a Next.js marketing site with responsive design, technical SEO, and performance optimization; increased organic traffic by [X]\% within 4 months post-launch.}
\resumeItem{Improved contact-page conversion rate by [Y]\% through UX research, clearer service IA, and WCAG-aware layout refinements.}
```

---

## Work (projects + links)

Order on resume: GenX → AIMS → Kliio. Each heading should include **live URL** in a bullet or subline.

See `resume-work-section.tex` and `lib/resume-content.ts` (`work[].bullets`).

**GenX stack line:** `Next.js, TypeScript, React, Tailwind CSS` — not Astro unless you used Astro on that site.

**GenX dates:** `Oct 2026 -- Nov 2026` is a short contract window (not “future” if you are in late 2026). If still active, use `Oct 2026 -- Present`.

---

## Education (match site)

```text
CTU Training Solutions — Roodepoort, South Africa
Further Education and Training Certificate: Information Technology | GPA 3.74/4.0 | 2023 -- 2024
```

---

## Certifications (dedicated section)

Use `\section{Certifications}` — not mixed into Education. One line per cert: **Name** — **Issuer** — **Mon YYYY**.

```latex
\section{Certifications}
  \resumeSubHeadingListStart
    \resumeSubheading{Meta Certified Digital Marketing Associate}{Nov 2024}{Meta}{}
    \resumeSubheading{IT Specialist -- HTML and CSS}{Nov 2023}{Certiport}{}
    \resumeSubheading{Adobe Certified Professional in Visual Design}{Oct 2023}{Adobe}{}
    \resumeSubheading{Adobe Certified Professional in Illustrator}{Oct 2023}{Adobe}{}
    \resumeSubheading{Adobe Certified Professional in Photoshop}{Jun 2023}{Adobe}{}
  \resumeSubHeadingListEnd
```

Credly URLs optional as `\href{...}{Verify}` if space allows.

---

## Priority checklist (from ATS tools)

| Item | Action |
|------|--------|
| React.js | Frontend Frameworks line + Summary |
| Metrics | JB `[X]`/`[Y]`%; count clients (5+), tools (4+), sections (6+) elsewhere |
| Dates | Mon YYYY everywhere; education Jan 2023--May 2025 per site |
| Keywords | Practices line: responsive design, cross-browser, WCAG, performance optimization |
| Title | Frontend Engineer headline; Frontend Engineer at JB |
| GitHub | Header + optional Work bullet linking shipped repos |
| Verb variety | Limit **Built** to once; use Designed, Shipped, Implemented, Architected |

After compile: replace `public/riandre-resume.pdf` if the site download should match.
