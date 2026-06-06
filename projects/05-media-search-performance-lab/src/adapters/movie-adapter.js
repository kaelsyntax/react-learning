const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
const TMDB_MOVIE_BASE_URL = 'https://www.themoviedb.org/movie'

const MOVIE_GENRES_BY_ID = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Sci-Fi',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
}

function toNumberOrNull(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function getYear(releaseDate) {
  const parsedDate = Date.parse(releaseDate)
  if (!Number.isFinite(parsedDate)) return null

  return new Date(parsedDate).getFullYear()
}

function getFormattedDate(releaseDate) {
  const parsedDate = Date.parse(releaseDate)
  if (!Number.isFinite(parsedDate)) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(parsedDate))
}

function getPosterUrl(path, size = 'w500') {
  if (!path) return ''

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

function mapGenreIds(genreIds) {
  if (!Array.isArray(genreIds)) return []

  return genreIds
    .map((id) => MOVIE_GENRES_BY_ID[id])
    .filter(Boolean)
}

function removeDuplicateMovies(rawList) {
  const seenIds = new Set()

  return rawList.filter((movie) => {
    const id = movie?.id

    if (id === null || id === undefined) return true
    if (seenIds.has(id)) return false

    seenIds.add(id)
    return true
  })
}

export function mapMovieItem(raw) {
  const id = raw?.id ?? crypto.randomUUID()
  const score = toNumberOrNull(raw?.vote_average)
  const releaseDate = getFormattedDate(raw?.release_date)
  const language = raw?.original_language?.toUpperCase() ?? ''
  const popularity = toNumberOrNull(raw?.popularity)

  return {
    id,
    title: raw?.title ?? raw?.original_title ?? 'Untitled',
    titleEnglish: raw?.original_title ?? '',
    image: getPosterUrl(raw?.poster_path, 'w500'),
    imageSmall: getPosterUrl(raw?.poster_path, 'w342'),
    imageLarge: getPosterUrl(raw?.poster_path, 'w780'),
    year: getYear(raw?.release_date),
    releaseDate,
    score: score === null ? null : Number(score.toFixed(1)),
    popularity,
    episodes: null,
    format: 'Movie',
    status: '',
    rating: raw?.adult ? 'Adult content' : '',
    source: language ? `Original language: ${language}` : '',
    duration: '',
    synopsis: raw?.overview ?? '',
    genres: mapGenreIds(raw?.genre_ids),
    url: id ? `${TMDB_MOVIE_BASE_URL}/${id}` : '',
    mediaType: 'movie',
    facts: [
      { label: 'Format', value: 'Movie' },
      { label: 'Release', value: releaseDate },
      { label: 'Language', value: language },
      { label: 'Popularity', value: popularity === null ? '' : popularity.toFixed(1) },
    ],
  }
}

export function mapMovieList(rawList) {
  if (!Array.isArray(rawList)) return []

  return removeDuplicateMovies(rawList)
    .filter((movie) => movie?.adult !== true)
    .map(mapMovieItem)
}
