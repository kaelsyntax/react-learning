function SearchInput({
  query,
  hasError = false,
  inputRef,
  onQueryChange,
  onClearQuery,
  onSubmit,
}) {
  return (
    <form className={`search-form ${hasError ? 'is-invalid' : ''}`} onSubmit={onSubmit}>
      <label className="search-form__label" htmlFor="search-input">
        {hasError ? 'Type a title first' : 'Search title'}
      </label>

      <div className="search-form__field">
        <span className="search-form__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M20 20L16.6 16.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <div className="search-form__input-wrap">
          <input
            className="search-form__input"
            id="search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={onQueryChange}
            aria-invalid={hasError}
            placeholder="Try: Naruto, Cyberpunk, Interstellar..."
          />

          {query ? (
            <button
              className="search-form__clear"
              type="button"
              onClick={onClearQuery}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 7L17 17M17 7L7 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <button className="search-form__submit" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchInput
