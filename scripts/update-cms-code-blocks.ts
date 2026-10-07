import { connectToDatabase } from '../lib/mongodb'

const MIDDLEWARE_SNIPPET = `const protectedMethods = ['POST', 'PUT', 'DELETE', 'PATCH']

const isProtectedOperation =
  request.nextUrl.pathname.startsWith('/api/posts') &&
  protectedMethods.includes(request.method)

const isDashboardAccess = request.nextUrl.pathname.startsWith('/dashboard')

if (isProtectedOperation || isDashboardAccess) {
  const authToken = request.cookies.get('auth_token')

  if (!authToken || authToken.value !== process.env.AUTH_TOKEN) {
    if (request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }
}`

const SPOTIFY_SNIPPET = `const { showSpotifyChip } = useSiteSettings()

useEffect(() => {
  if (!showSpotifyChip) return

  let mounted = true
  const fetchNowPlaying = async () => {
    const res = await fetch('/api/spotify/now-playing', { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    if (!mounted) return
    setIsVisible(data.isPlaying)
    if (data.isPlaying) {
      setTrack({
        name: data.title,
        artist: data.artist,
        albumArt: data.albumImageUrl,
        previewUrl: data.previewUrl,
      })
    } else {
      setTrack(null)
    }
  }

  fetchNowPlaying()
  const interval = setInterval(fetchNowPlaying, 5000)
  return () => {
    mounted = false
    clearInterval(interval)
  }
}, [showSpotifyChip])

if (!showSpotifyChip || isMobile) return null`

async function main() {
  const { db } = await connectToDatabase()
  const post = await db.collection('posts').findOne({ slug: 'cms' })
  if (!post?.content?.blocks) {
    throw new Error('CMS post not found')
  }

  const blocks = post.content.blocks.map((block: { type: string; title?: string; content?: string }) => {
    if (block.type !== 'code') return block
    if (block.title === 'middleware.ts') {
      return { ...block, content: MIDDLEWARE_SNIPPET }
    }
    if (block.title === 'Preventing API Calls & Hiding the Widget') {
      return { ...block, content: SPOTIFY_SNIPPET }
    }
    return block
  })

  await db.collection('posts').updateOne(
    { slug: 'cms' },
    { $set: { content: { ...post.content, blocks }, updatedAt: new Date().toISOString() } }
  )

  console.log('Updated CMS code blocks: middleware.ts, Spotify widget')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
