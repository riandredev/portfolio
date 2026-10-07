import React from 'react'
import { readFile } from 'fs/promises'
import { join } from 'path'

export type OgLayoutProps = {
  eyebrow: string
  title: string
  description: string
  footer?: string
}

let logoDataUrl: string | null = null

async function getLogoDataUrl() {
  if (!logoDataUrl) {
    const svg = await readFile(join(process.cwd(), 'app/icon.svg'), 'utf8')
    logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  }
  return logoDataUrl
}

export async function OgLayout({ eyebrow, title, description, footer }: OgLayoutProps) {
  const logo = await getLogoDataUrl()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: 'linear-gradient(145deg, #09090b 0%, #18181b 42%, #0c1222 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Manrope',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(37, 99, 235, 0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -160,
          left: -100,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63, 209, 255, 0.22) 0%, rgba(63, 209, 255, 0) 72%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 420,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, rgba(96, 165, 250, 0) 70%)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
        <img src={logo} width={88} height={56} alt="" />
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#a1a1aa',
            fontFamily: 'Geist',
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 980 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#fafafa',
            fontFamily: 'Geist',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 55%, #3fd1ff 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.45,
            color: '#d4d4d8',
            fontWeight: 400,
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(63, 63, 70, 0.65)',
          paddingTop: 28,
        }}
      >
        <div style={{ fontSize: 22, color: '#71717a', fontFamily: 'Geist' }}>
          {footer ?? 'riandre.com'}
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#52525b',
            padding: '10px 18px',
            borderRadius: 999,
            border: '1px solid rgba(63, 63, 70, 0.8)',
            background: 'rgba(24, 24, 27, 0.65)',
          }}
        >
          Software Engineer
        </div>
      </div>
    </div>
  )
}
