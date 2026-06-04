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

function getAnimeImages(raw) {
  const webp = raw?.images?.webp
  const jpg = raw?.images?.jpg

  return {
    small: webp?.image_url ?? jpg?.image_url ?? webp?.large_image_url ?? jpg?.large_image_url ?? '',
    large: webp?.large_image_url ?? jpg?.large_image_url ?? webp?.image_url ?? jpg?.image_url ?? '',
  }
}

export function mapAnimeItem(raw) {
  const images = getAnimeImages(raw)

  return {
    id: raw?.mal_id ?? crypto.randomUUID(),
    title: raw?.title ?? 'Untitled',
    titleEnglish: raw?.title_english ?? '',
    image: images.large,
    imageSmall: images.small,
    imageLarge: images.large,
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
