function toNumberOrNull(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function mapNamedList(rawList) {
  if (!Array.isArray(rawList)) return []

  return rawList
    .map((item) => item?.name)
    .filter(Boolean)
}

export function mapAnimeItem(raw) {
  return {
    id: raw?.mal_id ?? crypto.randomUUID(),
    title: raw?.title ?? 'Untitled',
    titleEnglish: raw?.title_english ?? '',
    image: raw?.images?.jpg?.image_url ?? '',
    year: raw?.year ?? null,
    score: toNumberOrNull(raw?.score),
    episodes: toNumberOrNull(raw?.episodes),
    status: raw?.status ?? '',
    rating: raw?.rating ?? '',
    source: raw?.source ?? '',
    duration: raw?.duration ?? '',
    synopsis: raw?.synopsis ?? '',
    genres: mapNamedList(raw?.genres),
    url: raw?.url ?? '',
    mediaType: 'anime',
  }
}

export function mapAnimeList(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(mapAnimeItem)
}
