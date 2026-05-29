import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SearchInput from './components/controls/SearchInput'
import ResultsGrid from './components/results/ResultsGrid'
import { searchAnime } from './services/anime-api'
import './App.css'

const DEBOUNCE_DELAY_MS = 400

function sortMediaItems(items, sort) {
  const sorted = [...items]

  if (sort === 'score_desc') {
    return sorted.sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity))
  }

  if (sort === 'score_asc') {
    return sorted.sort((a, b) => (a.score ?? Infinity) - (b.score ?? Infinity))
  }

  if (sort === 'year_desc') {
    return sorted.sort((a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity))
  }

  if (sort === 'year_asc') {
    return sorted.sort((a, b) => (a.year ?? Infinity) - (b.year ?? Infinity))
  }

  return sorted
}

function App() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('anime')
  const [sort, setSort] = useState('score_desc')
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
      setError('')
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

  const handleSubmit = (event) => {
    event.preventDefault()
    void runSearch(query)
  }

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value
    setQuery(nextQuery)

    if (!nextQuery.trim()) {
      setResults([])
      setError('')
      setHasSearched(false)
      lastSearchKeyRef.current = ''
    }
  }

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    const timerId = setTimeout(() => {
      void runSearch(query)
    }, DEBOUNCE_DELAY_MS)

    return () => clearTimeout(timerId)
  }, [query, runSearch])

  const visibleResults = useMemo(() => {
    return sortMediaItems(results, sort)
  }, [results, sort])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Media Search Performance Lab</h1>
        <p>Search anime and movies with performance-focused patterns.</p>

        <section className="controls" aria-label="Search controls">
          <SearchInput
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={handleSubmit}
          />

          <div className="mode-switch" role="group" aria-label="Media type">
            <button
              type="button"
              className={mode === 'anime' ? 'is-active' : ''}
              onClick={() => setMode('anime')}
            >
              Anime
            </button>
            <button
              type="button"
              className={mode === 'movies' ? 'is-active' : ''}
              onClick={() => setMode('movies')}
            >
              Movies
            </button>
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort results"
          >
            <option value="score_desc">Score (high to low)</option>
            <option value="score_asc">Score (low to high)</option>
            <option value="year_desc">Year (newest)</option>
            <option value="year_asc">Year (oldest)</option>
          </select>
        </section>
      </header>

      <section className="results" aria-label="Search results">
        {isLoading ? <p className="results-message">Loading results...</p> : null}

        {!isLoading && error ? (
          <p className="results-message is-error">{error}</p>
        ) : null}

        {!isLoading && !error && !hasSearched ? (
          <p className="results-message">No results yet. Run a search above.</p>
        ) : null}

        {!isLoading && !error && hasSearched && visibleResults.length === 0 ? (
          <p className="results-message">No matches found for this query.</p>
        ) : null}

        {!isLoading && !error && visibleResults.length > 0 ? (
          <ResultsGrid items={visibleResults} />
        ) : null}
      </section>
    </main>
  )
}

export default App
