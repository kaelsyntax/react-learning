import { mapMovieList } from '../adapters/movie-adapter'

const TMDB_SEARCH_MOVIES_URL = 'https://api.themoviedb.org/3/search/movie'
const TMDB_TRENDING_MOVIES_URL = 'https://api.themoviedb.org/3/trending/movie/week'

function getMovieApiToken() {
  const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN

  if (!token) {
    throw new Error('Missing TMDB read access token')
  }

  return token
}

async function fetchMovieList(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getMovieApiToken()}`,
    },
  })

  if (!response.ok) {
    throw new Error('Movie request failed')
  }

  const json = await response.json()
  const rawList = json?.results ?? []

  return mapMovieList(rawList)
}

export async function searchMovies(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) return []

  const params = new URLSearchParams({
    query: trimmedQuery,
    include_adult: 'false',
    language: 'en-US',
    page: '1',
  })

  return fetchMovieList(`${TMDB_SEARCH_MOVIES_URL}?${params.toString()}`)
}

export async function getTrendingMovies() {
  const params = new URLSearchParams({
    language: 'en-US',
  })

  return fetchMovieList(`${TMDB_TRENDING_MOVIES_URL}?${params.toString()}`)
}
