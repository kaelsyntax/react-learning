import { useCallback, useEffect, useRef, useState } from 'react'
import { searchAnime } from '../services/anime-api'

const DEFAULT_DEBOUNCE_DELAY_MS = 400

function useMediaSearch({ mode, debounceDelayMs = DEFAULT_DEBOUNCE_DELAY_MS }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const lastSearchKeyRef = useRef('')
  const resultsCacheRef = useRef(new Map())

  const runSearch = useCallback(async (rawQuery) => {
    setError('')

    const trimmedQuery = rawQuery.trim()
    if (!trimmedQuery) {
      setResults([])
      setHasSearched(false)
      lastSearchKeyRef.current = ''
      return
    }

    const searchKey = `${mode}::${trimmedQuery.toLowerCase()}`
    const cachedResults = resultsCacheRef.current.get(searchKey)

    if (cachedResults) {
      setHasSearched(true)
      setResults(cachedResults)
      lastSearchKeyRef.current = searchKey
      return
    }

    if (searchKey === lastSearchKeyRef.current) {
      return
    }

    lastSearchKeyRef.current = searchKey
    setHasSearched(true)

    if (mode === 'movies') {
      setResults([])
      setError('Movies search will be connected in the next step.')
      return
    }

    try {
      setIsLoading(true)
      const animeResults = await searchAnime(trimmedQuery)
      resultsCacheRef.current.set(searchKey, animeResults)
      setResults(animeResults)
    } catch {
      setResults([])
      setError('Could not fetch anime results. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [mode])

  const updateQuery = useCallback((nextQuery) => {
    setQuery(nextQuery)

    if (!nextQuery.trim()) {
      setResults([])
      setError('')
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

  return {
    query,
    results,
    isLoading,
    error,
    hasSearched,
    runSearch,
    updateQuery,
  }
}

export default useMediaSearch
