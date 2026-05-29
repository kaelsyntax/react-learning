function SearchInput({ query, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label className="search-form__label" htmlFor="search-input">
        Search title
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

        <input
          className="search-form__input"
          id="search-input"
          type="search"
          value={query}
          onChange={onQueryChange}
          placeholder="Try: Naruto, Cyberpunk, Interstellar..."
        />

        <button className="search-form__submit" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchInput
