function ResultsState({ isLoading, error, hasSearched, hasResults }) {
  if (isLoading) {
    return <p className="results-message">Loading results...</p>
  }

  if (error) {
    return <p className="results-message is-error">{error}</p>
  }

  if (hasResults) {
    return null
  }

  if (!hasSearched) {
    return <p className="results-message">Try searching a title to refine these picks.</p>
  }

  return <p className="results-message">No matches found for this query.</p>
}

export default ResultsState
