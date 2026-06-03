import { useEffect, useMemo, useRef, useState } from 'react'
import ModeSwitch from './components/controls/ModeSwitch'
import SearchInput from './components/controls/SearchInput'
import SearchShortcut from './components/controls/SearchShortcut'
import SortSelect from './components/controls/SortSelect'
import ResultsGrid from './components/results/ResultsGrid'
import ResultsState from './components/results/ResultsState'
import useMediaSearch from './hooks/useMediaSearch'
import './App.css'

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
  const [mode, setMode] = useState('anime')
  const [sort, setSort] = useState('score_desc')
  const [showSearchShortcut, setShowSearchShortcut] = useState(false)
  const searchInputRef = useRef(null)
  const {
    query,
    results,
    isLoading,
    error,
    info,
    hasSearched,
    runSearch,
    updateQuery,
  } = useMediaSearch({ mode })

  const handleSubmit = (event) => {
    event.preventDefault()
    void runSearch(query)
  }

  const handleQueryChange = (event) => {
    updateQuery(event.target.value)
  }

  const handleClearQuery = () => {
    updateQuery('')
    searchInputRef.current?.focus()
  }

  const handleSearchShortcutClick = () => {
    searchInputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    window.setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true })
    }, 260)
  }

  const visibleResults = useMemo(() => {
    return sortMediaItems(results, sort)
  }, [results, sort])

  const hasVisibleResults = !isLoading && !error && visibleResults.length > 0
  const isShowingDiscoveryResults = !hasSearched
  const resultsContext = isShowingDiscoveryResults
    ? {
        eyebrow: 'Trending now',
        title: 'Popular anime picks',
      }
    : {
        eyebrow: 'Search results',
        title: `Showing matches for "${query.trim()}"`,
      }

  useEffect(() => {
    const handleScroll = () => {
      setShowSearchShortcut(window.scrollY > 360)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Media Search Lab</h1>
        <p>Fast anime and movie discovery with scalable React patterns.</p>

        <section className="controls" aria-label="Search controls">
          <SearchInput
            query={query}
            inputRef={searchInputRef}
            onQueryChange={handleQueryChange}
            onClearQuery={handleClearQuery}
            onSubmit={handleSubmit}
          />
          <div className="controls-meta">
            <ModeSwitch mode={mode} onModeChange={setMode} />
            <SortSelect sort={sort} onSortChange={setSort} />
          </div>
        </section>
      </header>

      <section
        className={`results ${hasVisibleResults ? 'has-results' : 'is-message-only'}`}
        aria-label="Search results"
      >
        {hasVisibleResults ? (
          <div className="results-context" role="status" aria-live="polite">
            <p className="results-context__eyebrow">{resultsContext.eyebrow}</p>
            <h2 className="results-context__title">{resultsContext.title}</h2>
          </div>
        ) : null}

        <ResultsState
          isLoading={isLoading}
          error={error}
          info={info}
          hasSearched={hasSearched}
          hasResults={visibleResults.length > 0}
        />

        {hasVisibleResults ? <ResultsGrid items={visibleResults} /> : null}
      </section>

      <SearchShortcut
        isVisible={showSearchShortcut}
        onClick={handleSearchShortcutClick}
      />
    </main>
  )
}

export default App
