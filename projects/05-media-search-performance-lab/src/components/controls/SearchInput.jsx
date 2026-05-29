function SearchInput({ query, onQueryChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search-input">Search title</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={onQueryChange}
        placeholder="Search title..."
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchInput
