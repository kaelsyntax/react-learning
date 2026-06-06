import { useCallback, useEffect, useRef, useState } from 'react'
import { getTrendingAnime, searchAnime } from '../services/anime-api'
import { getTrendingMovies, searchMovies } from '../services/movie-api'

const DEFAULT_DEBOUNCE_DELAY_MS = 400
const DISCOVERY_CACHE_SUFFIX = '__discover__'

function useMediaSearch({ mode, debounceDelayMs = DEFAULT_DEBOUNCE_DELAY_MS }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const lastSearchKeyRef = useRef('')
  const resultsCacheRef = useRef(new Map())
  const activeRequestIdRef = useRef(0)

  const runSearch = useCallback(async (rawQuery) => {
    setError('')
    setInfo('')

    const trimmedQuery = rawQuery.trim()
    if (!trimmedQuery) {
      setResults([])
      setHasSearched(false)
      setInfo('')
      lastSearchKeyRef.current = ''
      return
    }

    const searchKey = `${mode}::${trimmedQuery.toLowerCase()}`
    const cachedResults = resultsCacheRef.current.get(searchKey)

    if (cachedResults) {
      setHasSearched(true)
      setInfo('')
      setResults(cachedResults)
      lastSearchKeyRef.current = searchKey
      return
    }

    if (searchKey === lastSearchKeyRef.current) {
      return
    }

    lastSearchKeyRef.current = searchKey
    setHasSearched(true)

    const requestId = activeRequestIdRef.current + 1
    activeRequestIdRef.current = requestId

    try {
      setIsLoading(true)
      const nextResults = mode === 'movies'
        ? await searchMovies(trimmedQuery)
        : await searchAnime(trimmedQuery)

      if (requestId !== activeRequestIdRef.current) {
        return
      }

      resultsCacheRef.current.set(searchKey, nextResults)
      setResults(nextResults)
    } catch {
      if (requestId !== activeRequestIdRef.current) {
        return
      }

      setResults([])
      setError(`Could not fetch ${mode} results. Please try again.`)
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setIsLoading(false)
      }
    }
  }, [mode])

  const updateQuery = useCallback((nextQuery) => {
    setQuery(nextQuery)

    if (!nextQuery.trim()) {
      setResults([])
      setError('')
      setInfo('')
      setHasSearched(false)
      lastSearchKeyRef.current = ''
    }
  }, [])

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    const timerId = setTimeout(() => {
      void runSearch(query)
    }, debounceDelayMs)

    return () => clearTimeout(timerId)
  }, [query, runSearch, debounceDelayMs])

  useEffect(() => {
    const trimmedQuery = query.trim()
    if (trimmedQuery) {
      return
    }

    const discoveryKey = `${mode}::${DISCOVERY_CACHE_SUFFIX}`
    const cachedDiscover = resultsCacheRef.current.get(discoveryKey)
    if (cachedDiscover) {
      setError('')
      setInfo('')
      setResults(cachedDiscover)
      return
    }

    let isCancelled = false
    const requestId = activeRequestIdRef.current + 1
    activeRequestIdRef.current = requestId

    const runDiscover = async () => {
      try {
        setIsLoading(true)
        const discoverResults = mode === 'movies'
          ? await getTrendingMovies()
          : await getTrendingAnime()

        if (isCancelled || requestId !== activeRequestIdRef.current) {
          return
        }

        resultsCacheRef.current.set(discoveryKey, discoverResults)
        setError('')
        setInfo('')
        setResults(discoverResults)
      } catch {
        if (isCancelled || requestId !== activeRequestIdRef.current) {
          return
        }

        setResults([])
        setError(`Could not load trending ${mode} right now.`)
      } finally {
        if (!isCancelled && requestId === activeRequestIdRef.current) {
          setIsLoading(false)
        }
      }
    }

    void runDiscover()

    return () => {
      isCancelled = true
    }
  }, [mode, query])

  return {
    query,
    results,
    isLoading,
    error,
    info,
    hasSearched,
    runSearch,
    updateQuery,
  }
}

export default useMediaSearch
