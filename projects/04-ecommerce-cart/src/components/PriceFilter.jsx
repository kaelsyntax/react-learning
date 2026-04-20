import { useId } from 'react'

const RANGE_STEP_IN_CENTS = 1000

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
  const sliderMaxInCents =
    Math.ceil(absoluteMaxPriceInCents / RANGE_STEP_IN_CENTS) * RANGE_STEP_IN_CENTS
  const displayedMaxValue =
    maxValue >= absoluteMaxPriceInCents ? sliderMaxInCents : maxValue
  const safeMaxValue = Math.max(displayedMaxValue, minValue)

  return (
    <div className="price-filters">
      <label className="filter-field" htmlFor={minPriceId}>
        <span>
          Min Price
          <strong>{formatPrice(minValue)}</strong>
        </span>
        <input
          id={minPriceId}
          type="range"
          min="0"
          max={sliderMaxInCents}
          step={RANGE_STEP_IN_CENTS}
          value={minValue}
          onChange={onMinChange}
        />
      </label>

      <label className="filter-field" htmlFor={maxPriceId}>
        <span>
          Max Price
          <strong>{formatPrice(safeMaxValue)}</strong>
        </span>
        <input
          id={maxPriceId}
          type="range"
          min={minValue}
          max={sliderMaxInCents}
          step={RANGE_STEP_IN_CENTS}
          value={safeMaxValue}
          onChange={onMaxChange}
        />
      </label>
    </div>
  )
}

export default PriceFilter
