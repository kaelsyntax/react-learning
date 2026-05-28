import { mapAnimeList } from '../adapters/anime-adapter'

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4/anime'

export async function searchAnime(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) return []

  const params = new URLSearchParams({
    q: trimmedQuery,
    limit: '20',
    order_by: 'score',
    sort: 'desc',
  })

  const response = await fetch(`${JIKAN_BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Anime request failed')
  }

  const json = await response.json()
  const rawList = json?.data ?? []

  return mapAnimeList(rawList)
}
