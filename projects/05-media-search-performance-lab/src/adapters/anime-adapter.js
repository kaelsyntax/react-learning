function toNumberOrNull(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function mapAnimeItem(raw) {
  return {
    id: raw?.mal_id ?? crypto.randomUUID(),
    title: raw?.title ?? 'Untitled',
    image: raw?.images?.jpg?.image_url ?? '',
    year: raw?.year ?? null,
    score: toNumberOrNull(raw?.score),
    mediaType: 'anime',
  }
}

export function mapAnimeList(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(mapAnimeItem)
}
