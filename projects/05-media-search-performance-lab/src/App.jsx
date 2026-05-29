import { useMemo, useState } from 'react'
import ModeSwitch from './components/controls/ModeSwitch'
import SearchInput from './components/controls/SearchInput'
import SortSelect from './components/controls/SortSelect'
import ResultsGrid from './components/results/ResultsGrid'
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
  const {
    query,
    results,
    isLoading,
    error,
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

          <ModeSwitch mode={mode} onModeChange={setMode} />

          <SortSelect sort={sort} onSortChange={setSort} />
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
