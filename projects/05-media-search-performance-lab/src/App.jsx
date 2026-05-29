import { useMemo, useState } from 'react'
import ModeSwitch from './components/controls/ModeSwitch'
import SearchInput from './components/controls/SearchInput'
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
        <h1>Media Search Lab</h1>
        <p>Fast anime and movie discovery with scalable React patterns.</p>

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
        <ResultsState
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
          hasResults={visibleResults.length > 0}
        />

        {!isLoading && !error && visibleResults.length > 0 ? <ResultsGrid items={visibleResults} /> : null}
      </section>
    </main>
  )
}

export default App
