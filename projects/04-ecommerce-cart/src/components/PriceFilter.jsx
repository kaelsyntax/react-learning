import { useId } from 'react'

function PriceFilter({
  minValue,
  maxValue,
  absoluteMaxPriceInCents,
  onMinChange,
  onMaxChange,
  formatPrice
}) {
  const minPriceId = useId()
  const maxPriceId = useId()

  return (
    <div className="price-filters">
      <label className="filter-field" htmlFor={minPriceId}>
        <span>Min Price: {formatPrice(minValue)}</span>
        <input
          id={minPriceId}
          type="range"
          min="0"
          max={absoluteMaxPriceInCents}
          step="500"
          value={minValue}
          onChange={onMinChange}
        />
      </label>

      <label className="filter-field" htmlFor={maxPriceId}>
        <span>Max Price: {formatPrice(maxValue)}</span>
        <input
          id={maxPriceId}
          type="range"
          min={minValue}
          max={absoluteMaxPriceInCents}
          step="500"
          value={maxValue}
          onChange={onMaxChange}
        />
      </label>
    </div>
  )
}

export default PriceFilter
