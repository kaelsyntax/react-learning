function ResultsState({ isLoading, error, hasSearched, hasResults }) {
  if (isLoading) {
    return <p className="results-message">Loading results...</p>
  }

  if (error) {
    return <p className="results-message is-error">{error}</p>
  }

  if (!hasSearched) {
    return <p className="results-message">No results yet. Run a search above.</p>
  }

  if (!hasResults) {
    return <p className="results-message">No matches found for this query.</p>
  }

  return null
}

export default ResultsState
