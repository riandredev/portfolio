export type ItunesMatch = {
  previewUrl: string
  artworkUrl: string | null
}

/** 30s preview when Spotify Web API has no preview_url. */
export async function findItunesMatch(artist: string, title: string): Promise<ItunesMatch | null> {
  const primaryArtist = artist.split(',')[0]?.trim() || artist
  const term = encodeURIComponent(`${title} ${primaryArtist}`)
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&entity=song&limit=12&country=US`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null

    const data = (await res.json()) as {
      results?: {
        previewUrl?: string
        artworkUrl100?: string
        artistName?: string
        trackName?: string
      }[]
    }

    const normalizedTitle = title.toLowerCase()
    const titleStem = normalizedTitle.slice(0, 12)
    const primaryLower = primaryArtist.toLowerCase()

    const candidates = data.results?.filter((r) => r.previewUrl) ?? []
    if (candidates.length === 0) return null

    const score = (r: { artistName?: string; trackName?: string }) => {
      const tn = r.trackName?.toLowerCase() ?? ''
      const an = r.artistName?.toLowerCase() ?? ''
      let s = 0
      if (tn === normalizedTitle || tn.startsWith(`${normalizedTitle} (`)) s += 12
      else if (tn.includes(titleStem)) s += 6
      if (an.includes(primaryLower)) s += 8
      if (an.includes('samuel e. wright')) s += 14
      if (an.includes('soundtrack version')) s += 4
      if (an.includes('kimura')) s -= 25
      return s
    }

    const hit = [...candidates].sort((a, b) => score(b) - score(a))[0]

    if (!hit?.previewUrl) return null

    const artworkUrl = hit.artworkUrl100?.replace('100x100bb', '200x200bb') ?? hit.artworkUrl100 ?? null

    return { previewUrl: hit.previewUrl, artworkUrl }
  } catch {
    return null
  }
}
