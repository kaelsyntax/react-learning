function ResultsState({ isLoading, error, info, hasSearched, hasResults }) {
  if (isLoading) {
    return (
      <div className="results-message results-message--panel is-loading" role="status" aria-live="polite">
        <span className="results-message__icon results-message__loader" aria-hidden="true">
          <span />
        </span>
        <div>
          <p className="results-message__title">Loading results</p>
          <p className="results-message__body">Pulling in fresh picks for you.</p>
          <div className="results-message__skeleton" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="results-message results-message--panel is-error" role="alert">
        <span className="results-message__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8.2V12.4"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <path
              d="M12 16.2V16"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M10.2 4.8L3.8 16.2C3.1 17.5 4 19 5.5 19H18.5C20 19 20.9 17.5 20.2 16.2L13.8 4.8C13 3.5 11 3.5 10.2 4.8Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="results-message__title">Something went wrong</p>
          <p className="results-message__body">{error}</p>
          <p className="results-message__hint">Check the connection and try the search again.</p>
        </div>
      </div>
    )
  }

  if (info) {
    return (
      <div className="results-message results-message--panel is-info" role="status" aria-live="polite">
        <span className="results-message__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 17V11"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <path
              d="M12 7.2V7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <div>
          <p className="results-message__title">Ready when you are</p>
          <p className="results-message__body">{info}</p>
        </div>
      </div>
    )
  }

  if (hasResults) {
    return null
  }

  if (!hasSearched) {
    return (
      <div className="results-message results-message--panel is-empty" role="status" aria-live="polite">
        <span className="results-message__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div>
          <p className="results-message__title">Search something sharp</p>
          <p className="results-message__body">Search a series or movie to narrow these picks.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-message results-message--panel is-empty" role="status" aria-live="polite">
      <span className="results-message__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="5.8" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M15 15L19 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.8 10.5H12.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <div>
        <p className="results-message__title">No matches found</p>
        <p className="results-message__body">Try a different title or a broader query.</p>
      </div>
    </div>
  )
}

export default ResultsState
