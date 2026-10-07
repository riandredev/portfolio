import { ImageResponse } from 'next/og'
import { fetchPostForOg } from '@/lib/og/fetch-post-for-og'
import { getOgImageFonts } from '@/lib/og/fonts'
import { getLogoDataUrl } from '@/lib/og/logo'
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
            fontFamily: 'Manrope',
          }}
        >
          Project not found
        </div>
      ),
      { ...ogSize, fonts }
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
            <div
              style={{
                fontSize: 18,
                color: '#a1a1aa',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'Manrope',
              }}
            >
              {categoryLabel}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 620 }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.08,
                color: '#fafafa',
                fontFamily: 'Manrope',
                marginBottom: 20,
              }}
            >
              {post.title}
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.45, color: '#d4d4d8', fontFamily: 'Manrope' }}>
              {post.description}
            </div>
          </div>
          <div style={{ fontSize: 20, color: '#71717a', fontFamily: 'Manrope' }}>riandre.com/posts/{post.slug}</div>
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
      fonts,
    }
  )
}
