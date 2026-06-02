function ResultsState({ isLoading, error, info, hasSearched, hasResults }) {
  if (hasResults) {
    return null
  }

  if (isLoading) {
    return (
      <div className="results-message results-message--panel" role="status" aria-live="polite">
        <span className="results-message__icon" aria-hidden="true">...</span>
        <div>
          <p className="results-message__title">Loading results</p>
          <p className="results-message__body">Pulling in fresh picks for you.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="results-message results-message--panel is-error" role="alert">
        <span className="results-message__icon" aria-hidden="true">!</span>
        <div>
          <p className="results-message__title">Something went wrong</p>
          <p className="results-message__body">{error}</p>
        </div>
      </div>
    )
  }

  if (info) {
    return (
      <div className="results-message results-message--panel is-info" role="status" aria-live="polite">
        <span className="results-message__icon" aria-hidden="true">i</span>
        <div>
          <p className="results-message__title">Movies mode</p>
          <p className="results-message__body">{info}</p>
        </div>
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="results-message results-message--panel" role="status" aria-live="polite">
        <span className="results-message__icon" aria-hidden="true">*</span>
        <div>
          <p className="results-message__title">Start with a title</p>
          <p className="results-message__body">Search a series or movie to narrow these picks.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-message results-message--panel" role="status" aria-live="polite">
      <span className="results-message__icon" aria-hidden="true">?</span>
      <div>
        <p className="results-message__title">No matches found</p>
        <p className="results-message__body">Try a different title or a broader query.</p>
      </div>
    </div>
  )
}

export default ResultsState
