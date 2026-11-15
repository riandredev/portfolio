import '@/app/globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Averia_Serif_Libre } from 'next/font/google';
import "./globals.css";
import { Viewport } from "next/types"
import ErrorBoundary from '@/components/error-boundary'
import QueryProvider from '@/providers/query-provider'
import { defaultTwitter, getSiteUrl, siteDescription, siteName, defaultTitle } from '@/lib/seo'
import { Suspense } from 'react'
import ViewTransitionsRoot from '@/components/view-transitions-root'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: true,
  display: 'swap',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: true,
  display: 'swap',
});

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  weight: "100 900",
  preload: true,
  display: 'swap',
});

const averiaSerifLibre = Averia_Serif_Libre({
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'Riandre van der Voorden',
    'Front-end engineer',
    'UI engineer',
    'React developer',
    'Next.js developer',
    'TypeScript',
    'Electron',
    'Tailwind CSS',
    'Figma',
    'WCAG accessibility',
    'Core Web Vitals',
    'Web developer',
    'South Africa',
    'Remote',
    'UTC+2',
    'Portfolio',
  ],
  authors: [
    {
      name: "Riandre van der Voorden",
      url: getSiteUrl(),
    }
  ],
  creator: "Riandre van der Voorden",
  publisher: "Riandre van der Voorden",
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: getSiteUrl(),
    title: defaultTitle,
    description: siteDescription,
    siteName,
  },
  other: {
    mastodon: ["@riandre@mastodon.social"]
  },
  twitter: defaultTwitter,
  verification: {
    google: "uMpOp0miclTOg-JvzSF7Iu8hRS3w_GWObcxbLsNeNTo",
    other: {
      "me": ["https://mastodon.social/@riandre"]
    }
  },
  icons: {
    icon: [
      { url: '/favi-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/favi-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
    ],
    shortcut: [
      { url: '/favi-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/favi-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
    ],
    apple: [
      { url: '/favi-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/favi-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

function validateEnvVariables() {
  const requiredEnvVars = [
    'MONGODB_URI',
    'API_KEY',
    'AUTH_EMAIL',
    'AUTH_PASSWORD',
    'AUTH_TOKEN',
    'AUTH_SALT'
  ]

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  validateEnvVariables();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favi-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favi-light.svg"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body
        className={`min-h-screen bg-background font-sans ${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${averiaSerifLibre.variable}`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <QueryProvider>
              <ViewTransitionsRoot>
                <Suspense fallback={null}>{children}</Suspense>
              </ViewTransitionsRoot>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
