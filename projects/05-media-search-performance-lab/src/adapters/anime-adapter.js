function toNumberOrNull(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function getYear(raw) {
  const directYear = toNumberOrNull(raw?.year)
  if (directYear) return directYear

  const airedYear = toNumberOrNull(raw?.aired?.prop?.from?.year)
  if (airedYear) return airedYear

  const parsedDate = Date.parse(raw?.aired?.from)
  if (!Number.isFinite(parsedDate)) return null

  return new Date(parsedDate).getFullYear()
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
    year: getYear(raw),
    score: toNumberOrNull(raw?.score),
    episodes: toNumberOrNull(raw?.episodes),
    format: raw?.type ?? '',
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

  return rawList
    .filter((anime) => anime?.rating !== 'Rx - Hentai')
    .map(mapAnimeItem)
}
