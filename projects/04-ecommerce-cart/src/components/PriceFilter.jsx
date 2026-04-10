import { useId } from 'react'

function PriceFilter({ value, maxPriceInCents, onChange, formatPrice }) {
  const priceId = useId()

  return (
    <label className="filter-field" htmlFor={priceId}>
      <span>Min Price: {formatPrice(value)}</span>
      <input
        id={priceId}
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
