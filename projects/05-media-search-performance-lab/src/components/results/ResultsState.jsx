function ResultsState({ isLoading, error, info, hasSearched, hasResults }) {
  if (isLoading) {
    return <p className="results-message">Loading results...</p>
  }

  if (error) {
    return <p className="results-message is-error">{error}</p>
  }

  if (info) {
    return <p className="results-message is-info">{info}</p>
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
