import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { getOgFonts } from '@/lib/og/fonts'
import { ogContentType, ogSize } from '@/lib/og/render-og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const contentType = ogContentType
export const size = ogSize

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  return {
    alt: post?.title ?? 'Project',
  }
}

async function getLogoDataUrl() {
  const svg = await readFile(join(process.cwd(), 'app/icon.svg'), 'utf8')
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  const { geistSans, manrope } = await getOgFonts()
  const logo = await getLogoDataUrl()

  if (!post || post.published === false) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#09090b',
            color: '#fafafa',
            fontSize: 48,
            fontFamily: 'Geist',
          }}
        >
          Project not found
        </div>
      ),
      { ...ogSize, fonts: [{ name: 'Geist', data: geistSans, style: 'normal', weight: 400 }] }
    )
  }

  const categoryLabel = post.category?.includes('design') ? 'Design & development' : 'Development'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(145deg, #09090b 0%, #18181b 42%, #0c1222 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Manrope',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -60,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.32) 0%, rgba(37, 99, 235, 0) 70%)',
          }}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img src={logo} width={72} height={46} alt="" />
            <div style={{ fontSize: 18, color: '#a1a1aa', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {categoryLabel}
            </div>
          </div>
          <div style={{ maxWidth: 620 }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.08,
                color: '#fafafa',
                fontFamily: 'Geist',
                marginBottom: 20,
              }}
            >
              {post.title}
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.45, color: '#d4d4d8' }}>{post.description}</div>
          </div>
          <div style={{ fontSize: 20, color: '#71717a', fontFamily: 'Geist' }}>riandre.com/posts/{post.slug}</div>
        </div>
        {post.image ? (
          <div
            style={{
              width: 420,
              margin: 48,
              marginLeft: 0,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(63, 63, 70, 0.75)',
              display: 'flex',
              alignItems: 'stretch',
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <img
              src={post.image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: geistSans, style: 'normal', weight: 300 },
        { name: 'Geist', data: geistSans, style: 'normal', weight: 400 },
        { name: 'Manrope', data: manrope, style: 'normal', weight: 400 },
      ],
    }
  )
}
