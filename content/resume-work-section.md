# Resume Work section — where bullets go

Your LaTeX resume uses **Jake’s Resume**-style macros. Each project is one `\resumeProjectHeading` block. **Bullet points only go inside** `\resumeItemListStart` … `\resumeItemListEnd`, as `\resumeItem{...}` lines.

## Structure (one project)

```latex
\resumeProjectHeading
    {\textbf{Project name} $|$ \emph{Short subtitle or stack}}{Start -- End}
    \resumeItemListStart
      \resumeItem{First bullet — paste or adapt from below.}
      \resumeItem{Second bullet.}
      \resumeItem{Third bullet.}
    \resumeItemListEnd
```

- **Title line:** `\textbf{Project name}` + `$|$` + `\emph{subtitle or tech stack}` + **dates** in `{}{}` on the same `\resumeProjectHeading` line.
- **Bullets:** Only the three (or more) `\resumeItem{...}` lines between `\resumeItemListStart` and `\resumeItemListEnd`. Do not put bullets in the heading line.

Replace your old **Work** section (Convertly + Orion) with three blocks below, in this order, still inside `\resumeSubHeadingListStart` … `%    \resumeSubHeadingListEnd`.

---

## GenX Digital

**Heading (dates):** Oct 2026 -- Nov 2026  
**Subtitle (after `$|$`):** Next.js, TypeScript, React  

**Bullets (→ `\resumeItem{...}` each):**

- Designed and shipped the GenX Digital marketing site (genxdigital.co.za): responsive design, service positioning, and a contact funnel for a web, design, and digital marketing agency.
- Delivered brand collateral in production: dual product wordmarks (Digital + Secure), OG/social preview art, and a cohesive visual system across 10+ layout variants.
- Architected performance-optimized Next.js pages with clear IA so visitors reach services and contact in 2 clicks or fewer from the homepage.

---

## AIMS

**Heading (dates):** Feb 2026  
**Subtitle (after `$|$`):** Hugo, Markdown, Git *(or: African Institute for Mathematical Sciences)*  

**Bullets:**

- Extended the AIMS public site (aims.ac.za) on Hugo: customized the theme and shipped reusable section partials for institute-wide pages.
- Implemented a Markdown templating workflow so editors can publish new pages and compose section layouts without copying HTML or duplicating front-end files.
- Reduced developer-only deploys for routine content by standardizing 6+ repeatable section types (hero, stats, CTAs, cards, etc.) in Markdown front matter.

---

## Kliio

**Heading (dates):** Oct 2025 -- Present  
**Subtitle (after `$|$`):** Next.js, TypeScript, React.js  

**Bullets:**

- Founding engineer on Kliio (getkliio.com): React.js / Next.js SaaS with REST API integration, authentication, and billing for agencies and freelancers.
- Own product UI, marketing site, and core app flows end to end (TypeScript, responsive design, web accessibility (WCAG-aware patterns)).
- Designed the workspace to replace 4+ disconnected tools (docs, chat, PM, invoicing) with one client-facing delivery hub.

---

## Checklist

1. Find `\section{Work}` in your `.tex` file.
2. Delete the old `\resumeProjectHeading` blocks (Convertly, Orion) and their `\resumeItem` lists.
3. Paste three new `\resumeProjectHeading` blocks (copy structure from `resume-work-section.tex` or build from the bullets above).
4. Leave `%    \resumeSubHeadingListEnd` commented if that matches the rest of your file.
5. Recompile PDF and replace `public/riandre-resume.pdf` if you use the site download button.

Source of truth for site copy: `lib/resume-content.ts` (`work[].bullets`).
