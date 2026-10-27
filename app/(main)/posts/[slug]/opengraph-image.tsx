import { ImageResponse } from 'next/og'
import { fetchPostForOg } from '@/lib/og/fetch-post-for-og'
import { getOgImageFonts } from '@/lib/og/fonts'
import { getLogoDataUrl } from '@/lib/og/logo'
import { paperOg } from '@/lib/og/paper-theme'
import { isPostsListOgSlug, postsListOgAlt, postsListOgProps } from '@/lib/og/posts-list'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og/render-og'

export const runtime = 'edge'

export const contentType = ogContentType
export const size = ogSize

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  if (isPostsListOgSlug(params.slug)) {
    return [{ alt: postsListOgAlt }]
  }

  const post = await fetchPostForOg(params.slug)
  return [{ alt: post?.title ?? 'Project' }]
}

export default async function Image({ params }: { params: { slug: string } }) {
  if (isPostsListOgSlug(params.slug)) {
    return renderOgImage(postsListOgProps)
  }

  const post = await fetchPostForOg(params.slug)
  const fonts = await getOgImageFonts()
  const logo = getLogoDataUrl()

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: paperOg.bg,
            color: paperOg.fg,
            fontSize: 44,
            fontFamily: 'Manrope',
          }}
        >
          Project not found
        </div>
      ),
      { ...ogSize, fonts },
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
            <img src={logo} width={88} height={40} alt="" style={{ objectFit: 'contain' }} />
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: paperOg.accent,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Manrope',
              }}
            >
              {categoryLabel}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 620, paddingLeft: 4 }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 400,
                lineHeight: 1.08,
                color: paperOg.fg,
                fontFamily: 'Averia Serif Libre',
                marginBottom: 18,
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                color: paperOg.muted,
                fontFamily: 'Manrope',
              }}
            >
              {post.description}
            </div>
          </div>
          <div style={{ fontSize: 18, color: paperOg.muted, fontFamily: 'Manrope' }}>
            riandre.com/posts/{post.slug}
          </div>
        </div>
        {post.image ? (
          <div
            style={{
              width: 400,
              margin: 48,
              marginLeft: 0,
              borderRadius: 20,
              overflow: 'hidden',
              border: `1px solid ${paperOg.border}`,
              display: 'flex',
              alignItems: 'stretch',
              boxShadow: '0 16px 40px -24px rgba(44, 42, 40, 0.35)',
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
      fonts,
    },
  )
}
