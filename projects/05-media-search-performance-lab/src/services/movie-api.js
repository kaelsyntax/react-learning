import { mapMovieList } from '../adapters/movie-adapter'

const TMDB_SEARCH_MOVIES_URL = 'https://api.themoviedb.org/3/search/movie'

export async function searchMovies(query) {
  const trimmedQuery = query.trim()
  const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN

  if (!trimmedQuery) return []

  if (!token) {
    throw new Error('Missing TMDB read access token')
  }

  const params = new URLSearchParams({
    query: trimmedQuery,
    include_adult: 'false',
    language: 'en-US',
    page: '1',
  })

  const response = await fetch(`${TMDB_SEARCH_MOVIES_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Movie request failed')
  }

  const json = await response.json()
  const rawList = json?.results ?? []

  return mapMovieList(rawList)
}
