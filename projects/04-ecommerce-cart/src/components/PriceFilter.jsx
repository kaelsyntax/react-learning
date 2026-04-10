function PriceFilter({ value, maxPriceInCents, onChange, formatPrice }) {
  return (
    <label className="filter-field" htmlFor="price-filter">
      <span>Min Price: {formatPrice(value)}</span>
      <input
        id="price-filter"
        type="range"
        min="0"
        max={maxPriceInCents}
        step="500"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default PriceFilter
