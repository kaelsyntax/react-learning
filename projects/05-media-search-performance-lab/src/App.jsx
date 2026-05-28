import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('anime')
  const [sort, setSort] = useState('score_desc')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Media Search Performance Lab</h1>
        <p>Search anime and movies with performance-focused patterns.</p>

        <section className="controls" aria-label="Search controls">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search-input">Search title</label>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title..."
            />
            <button type="submit">Search</button>
          </form>

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
        <ul className="results-grid">
          <li className="media-card">Result card placeholder</li>
          <li className="media-card">Result card placeholder</li>
          <li className="media-card">Result card placeholder</li>
        </ul>
      </section>
    </main>
  )
}

export default App
