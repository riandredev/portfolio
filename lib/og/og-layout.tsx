import React from 'react'
import { getLogoDataUrl } from './logo'
import { paperOg } from './paper-theme'

export type OgLayoutProps = {
  eyebrow: string
  title: string
  description: string
  footer?: string
  tag?: string
}

export function OgLayout({ eyebrow, title, description, footer, tag = 'Front-end engineer' }: OgLayoutProps) {
  const logo = getLogoDataUrl()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: paperOg.bg,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Manrope',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 24,
          borderRadius: 20,
          border: `1px solid ${paperOg.border}`,
          background: paperOg.surface,
          boxShadow: '0 18px 48px -28px rgba(44, 42, 40, 0.22)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 22, position: 'relative', zIndex: 1 }}>
        <img src={logo} width={96} height={44} alt="" style={{ objectFit: 'contain' }} />
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: paperOg.accent,
            fontFamily: 'Manrope',
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          maxWidth: 980,
          paddingLeft: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: paperOg.fg,
            fontFamily: 'Averia Serif Libre',
            marginBottom: 22,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.5,
            color: paperOg.muted,
            fontWeight: 400,
            fontFamily: 'Manrope',
            maxWidth: 920,
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
          borderTop: `1px solid ${paperOg.border}`,
          paddingTop: 24,
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 20, color: paperOg.muted, fontFamily: 'Manrope' }}>
          {footer ?? 'riandre.com'}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: paperOg.fg,
            fontFamily: 'Manrope',
            padding: '10px 18px',
            borderRadius: 999,
            border: `1px solid ${paperOg.border}`,
            background: paperOg.bg,
          }}
        >
          {tag}
        </div>
      </div>
    </div>
  )
}
