# ATS keywords & checklist

**Full LaTeX paste blocks:** see [`resume-latex-ats.md`](./resume-latex-ats.md) (headline, skills subsections, experience metrics, certifications, dates).

**Site + bullet source:** `lib/resume-content.ts` (`experiences[].resumeBullets`, `work[].bullets`).

Paste each **job description** into the checker when you can; tune keywords to that posting.

---

## Checker themes → what to do

| Recommendation | Where |
|----------------|--------|
| **React.js** in skills | `Frontend Frameworks:` line in LaTeX (not only “Next.js (React)”) |
| **Responsive design**, **cross-browser compatibility**, **WCAG**, **performance optimization** | Skills `Practices:` line + PixelMeta / Work bullets |
| **Frontend Engineer** title | Resume headline; JB role; PixelMeta can stay “Frontend Engineer & UI/UX Designer” |
| **Metrics** | JB: replace `[X]`/`[Y]` in `resumeBullets` with real Analytics %; use 5+, 6+, 10+, 4+ elsewhere |
| **Dates** | Match downloadable PDF / `lib/resume-content.ts` |
| **PixelMeta** | **Jun 2025 -- Present** (UI/UX Designer and Software Developer) |
| **GenX Oct 2026 -- Nov 2026** | Short contract window; use **Present** if still active |
| **GitHub + portfolio** | Header: `github.com/riandredev` + `riandre.com` |
| **Certifications** | Separate `\section{Certifications}` with issuer + month/year |
| **Project links** | Work bullets name `genxdigital.co.za`, `aims.ac.za`, `getkliio.com` |

---

## Align with riandre.com

| Item | Site | Resume |
|------|------|--------|
| Kliio | Oct 2025 – Present | Match |
| Education | 2023–2024 (FET, on PDF) | Site matches PDF |
| GenX stack | Next.js on portfolio | Not Astro on PDF |
| Experience titles | Frontend Engineer framing | Match LaTeX |

After LaTeX edits, re-export PDF and update `public/riandre-resume.pdf` if needed.
