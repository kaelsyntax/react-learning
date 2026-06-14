import { mapAnimeList } from '../adapters/anime-adapter'

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4/anime'
const JIKAN_SEASON_NOW_URL = 'https://api.jikan.moe/v4/seasons/now'

function toSafeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function hasPoster(raw) {
  return Boolean(
    raw?.images?.webp?.image_url
      || raw?.images?.webp?.large_image_url
      || raw?.images?.jpg?.image_url
      || raw?.images?.jpg?.large_image_url,
  )
}

function isUsefulDiscoveryAnime(raw) {
  const type = raw?.type ?? ''
  const hasInvalidEpisodeCount = raw?.episodes === 0

  return (
    ['TV', 'ONA'].includes(type)
    && raw?.rating !== 'Rx - Hentai'
    && !hasInvalidEpisodeCount
    && hasPoster(raw)
  )
}

async function fetchRawAnimeList(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Anime request failed')
  }

  const json = await response.json()

  return json?.data ?? []
}

async function fetchAnimeList(url) {
  return mapAnimeList(await fetchRawAnimeList(url))
}

export async function searchAnime(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) return []

  const params = new URLSearchParams({
    q: trimmedQuery,
    limit: '20',
    order_by: 'score',
    sort: 'desc',
  })

  return fetchAnimeList(`${JIKAN_BASE_URL}?${params.toString()}`)
}

export async function getTrendingAnime() {
  const params = new URLSearchParams({
    limit: '25',
  })

  const rawList = await fetchRawAnimeList(`${JIKAN_SEASON_NOW_URL}?${params.toString()}`)
  const curatedList = rawList
    .filter(isUsefulDiscoveryAnime)
    .sort((firstAnime, secondAnime) => {
      return toSafeNumber(secondAnime?.members) - toSafeNumber(firstAnime?.members)
    })
    .slice(0, 20)

  return mapAnimeList(curatedList)
}
