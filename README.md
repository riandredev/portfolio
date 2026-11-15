# Riandre van der Voorden — Portfolio

Personal portfolio and resume site for Riandre van der Voorden, a front-end engineer specializing in Next.js, React, and TypeScript.

**Live site:** [riandre.com](https://riandre.com)

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS Modules
- **UI Components:** Radix UI primitives, Framer Motion
- **3D:** Three.js, React Three Fiber
- **Database:** MongoDB (Mongoose)
- **File Uploads:** UploadThing
- **State Management:** Zustand, TanStack Query
- **Fonts:** Geist, Manrope, Averia Serif Libre

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (main)/             # Public pages (home, about, design)
│   ├── api/                # API routes (Spotify, posts, analytics)
│   ├── dashboard/          # Admin dashboard (posts, settings, analytics)
│   └── login/              # Auth
├── components/             # React components
│   ├── home/               # Homepage sections (intro, resume, work)
│   ├── about/              # About page (life journal, memories)
│   ├── design/             # Design gallery
│   ├── ui/                 # Shared UI primitives
│   └── ...
├── lib/                    # Utilities, data fetching, SEO helpers
├── public/                 # Static assets, resume PDF, images
├── styles/                 # Global CSS
└── types/                  # TypeScript type definitions
```

## Pages

| Route     | Description                                       |
| --------- | ------------------------------------------------- |
| `/`       | Homepage — intro, experience, work, education     |
| `/about`  | Life journal with photos and Spotify integrations |
| `/design` | Design work gallery                               |

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=<your-mongodb-uri>
API_KEY=<api-key>
AUTH_EMAIL=<admin-email>
AUTH_PASSWORD=<admin-password>
AUTH_TOKEN=<auth-token>
AUTH_SALT=<auth-salt>
```

Optional (for Spotify integration):
```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

### Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Resume PDF

The downloadable resume is located at:

```
public/riandre-resume-frontend-v3.pdf
```

This file is served from the homepage via the "Download my resume" button.

## Deployment

The site is configured for deployment on:

- **Vercel** (standalone output mode)
- **Railway** (`railway.json`)
- **Render** (`render.yaml`)

Production builds use standalone output (`output: 'standalone'` in `next.config.js`).

## License

Private repository. All rights reserved.
