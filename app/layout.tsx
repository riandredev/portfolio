import '@/app/globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar";
import Footer from '@/components/footer';
import { GraphicsProvider } from '@/context/graphics-context'
import "./globals.css";
import { Viewport } from "next/types"
import ErrorBoundary from '@/components/error-boundary'
import { Suspense } from 'react'

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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://riandre.com'),
  title: {
    default: "Riandre van der Voorden | Software Engineer Portfolio",
    template: "%s | Riandre van der Voorden"
  },
  description: "Official portfolio of Riandre van der Voorden - Full Stack Software Engineer specializing in React, Next.js, and modern web development. Explore my projects and professional experience.",
  keywords: [
    "Riandre",
    "Riandre van der Voorden",
    "van der Voorden",
    "Software Engineer",
    "Web Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "JavaScript Developer",
    "Portfolio",
    "Frontend Development",
    "Backend Development",
    "South African Developer",
    "Software Development"
  ],
  authors: [
    {
      name: "Riandre van der Voorden",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    }
  ],
  creator: "Riandre van der Voorden",
  publisher: "Riandre van der Voorden",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Riandre van der Voorden - Software Engineer",
    description: "Full Stack Software Engineer specializing in modern web development. View my portfolio, projects, and professional experience.",
    siteName: "Riandre van der Voorden",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Riandre Portoflio Logo - Full Stack Software Engineer"
      }
    ]
  },
  other: {
    mastodon: ["@riandre@mastodon.social"]
  },
  verification: {
    google: "google-site-verification=uMpOp0miclTOg-JvzSF7Iu8hRS3w_GWObcxbLsNeNTo",
    other: {
      "me": ["https://mastodon.social/@riandre"]
    }
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
      <body className={`min-h-screen bg-background ${geistSans.variable} ${geistMono.variable} ${manrope.variable}`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GraphicsProvider>
              <Suspense fallback={null}>
                {children}
              </Suspense>
            </GraphicsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
