import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ModeSwitch from './components/controls/ModeSwitch'
import SearchInput from './components/controls/SearchInput'
import SearchShortcut from './components/controls/SearchShortcut'
import SortSelect from './components/controls/SortSelect'
import ResultsContext from './components/results/ResultsContext'
import ResultsGrid from './components/results/ResultsGrid'
import ResultsState from './components/results/ResultsState'
import useMediaSearch from './hooks/useMediaSearch'
import './App.css'

const DETAILS_EXIT_ANIMATION_MS = 180
const ResultDetails = lazy(() => import('./components/results/ResultDetails'))

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
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailsClosing, setIsDetailsClosing] = useState(false)
  const [showSearchShortcut, setShowSearchShortcut] = useState(false)
  const searchInputRef = useRef(null)
  const detailsCloseTimeoutRef = useRef(null)
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

  const handleSelectItem = useCallback((item) => {
    window.clearTimeout(detailsCloseTimeoutRef.current)
    setIsDetailsClosing(false)
    setSelectedItem(item)
  }, [])

  const handleCloseDetails = useCallback(() => {
    if (!selectedItem || isDetailsClosing) {
      return
    }

    setIsDetailsClosing(true)

    detailsCloseTimeoutRef.current = window.setTimeout(() => {
      setSelectedItem(null)
      setIsDetailsClosing(false)
    }, DETAILS_EXIT_ANIMATION_MS)
  }, [isDetailsClosing, selectedItem])

  const handleDetailsExited = useCallback(() => {
    window.clearTimeout(detailsCloseTimeoutRef.current)
    setSelectedItem(null)
    setIsDetailsClosing(false)
  }, [])

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

  useEffect(() => {
    return () => window.clearTimeout(detailsCloseTimeoutRef.current)
  }, [])

  useEffect(() => {
    if (!selectedItem) {
      return undefined
    }

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [selectedItem])

  useEffect(() => {
    if (!selectedItem) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseDetails()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleCloseDetails, selectedItem])

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
          <ResultsContext
            eyebrow={resultsContext.eyebrow}
            title={resultsContext.title}
          />
        ) : null}

        <ResultsState
          isLoading={isLoading}
          error={error}
          info={info}
          hasSearched={hasSearched}
          hasResults={visibleResults.length > 0}
        />

        {hasVisibleResults ? (
          <ResultsGrid items={visibleResults} onSelectItem={handleSelectItem} />
        ) : null}
      </section>

      {selectedItem ? (
        <Suspense fallback={null}>
          <ResultDetails
            item={selectedItem}
            isClosing={isDetailsClosing}
            onClose={handleCloseDetails}
            onExited={handleDetailsExited}
          />
        </Suspense>
      ) : null}

      <SearchShortcut
        isVisible={showSearchShortcut}
        onClick={handleSearchShortcutClick}
      />
    </main>
  )
}

export default App
