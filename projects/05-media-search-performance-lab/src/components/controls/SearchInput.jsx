function SearchInput({ query, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label className="search-form__label" htmlFor="search-input">
        Search title
      </label>

      <div className="search-form__row">
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
