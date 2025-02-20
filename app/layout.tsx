// app/layout.tsx
import '@/app/globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar";
import Footer from '@/components/footer';
import { GraphicsProvider } from '@/context/graphics-context'
import "./globals.css";
import { Viewport } from "next/types"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  weight: "100 900",
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
  title: {
    default: "Riandre van der Voorden - Software Engineer",
    template: "%s | Riandre"
  },
  description: "Software engineer with expertise in React, Next.js, and full-stack development. Creating engaging user experiences and scalable solutions.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Frontend Development",
    "Backend Development"
  ],
  authors: [{ name: "Riandre van der Voorden" }],
  creator: "Riandre van der Voorden",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Riandre - Software Engineer",
    description: "Software engineer specialized in modern web development",
    siteName: "Riandre van der Voorden Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riandre van der Voorden - Software Engineer",
    description: "Software engineer specialized in modern web development",
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
}) {
  validateEnvVariables()

  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GraphicsProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 relative">
                {children}
              </main>
              <Footer className="relative z-50" />
            </div>
          </GraphicsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
