function SortSelect({ sort, onSortChange }) {
  return (
    <select
      value={sort}
      onChange={(event) => onSortChange(event.target.value)}
      aria-label="Sort results"
    >
      <option value="score_desc">Score (high to low)</option>
      <option value="score_asc">Score (low to high)</option>
      <option value="year_desc">Year (newest)</option>
      <option value="year_asc">Year (oldest)</option>
    </select>
  )
}

export default SortSelect
