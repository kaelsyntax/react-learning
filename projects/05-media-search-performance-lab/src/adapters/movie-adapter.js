const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
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

function getPosterUrl(path) {
  if (!path) return ''

  return `${TMDB_IMAGE_BASE_URL}${path}`
}

function mapGenreIds(genreIds) {
  if (!Array.isArray(genreIds)) return []

  return genreIds
    .map((id) => MOVIE_GENRES_BY_ID[id])
    .filter(Boolean)
}

export function mapMovieItem(raw) {
  const id = raw?.id ?? crypto.randomUUID()
  const score = toNumberOrNull(raw?.vote_average)

  return {
    id,
    title: raw?.title ?? raw?.original_title ?? 'Untitled',
    titleEnglish: raw?.original_title ?? '',
    image: getPosterUrl(raw?.poster_path),
    year: getYear(raw?.release_date),
    releaseDate: getFormattedDate(raw?.release_date),
    score: score === null ? null : Number(score.toFixed(1)),
    popularity: toNumberOrNull(raw?.popularity),
    episodes: null,
    format: 'Movie',
    status: '',
    rating: raw?.adult ? 'Adult audience' : 'General audience',
    source: raw?.original_language
      ? `Original language: ${raw.original_language.toUpperCase()}`
      : '',
    duration: '',
    synopsis: raw?.overview ?? '',
    genres: mapGenreIds(raw?.genre_ids),
    url: id ? `${TMDB_MOVIE_BASE_URL}/${id}` : '',
    mediaType: 'movie',
  }
}

export function mapMovieList(rawList) {
  if (!Array.isArray(rawList)) return []
  return rawList.map(mapMovieItem)
}
