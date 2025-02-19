// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  validateEnvVariables()

  return (
    <html lang="en" className="overflow-y-scroll">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-100 dark:bg-black`}
      >
        <GraphicsProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 relative">
                {children}
              </main>
              <Footer className="relative z-50" />
            </div>
          </ThemeProvider>
        </GraphicsProvider>
      </body>
    </html>
  );
}
