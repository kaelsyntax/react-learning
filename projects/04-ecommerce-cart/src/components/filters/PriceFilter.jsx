import { useEffect, useId, useRef, useState } from 'react'
import { formatPrice } from '../../utils/format-price'

const RANGE_STEP_IN_CENTS = 1000
const RANGE_COMMIT_DEBOUNCE_MS = 180

function PriceFilter({
  minValue,
  maxValue,
  absoluteMaxPriceInCents,
  onMinChange,
  onMaxChange
}) {
  const minPriceId = useId()
  const maxPriceId = useId()
  const minCommitTimeoutRef = useRef(null)
  const maxCommitTimeoutRef = useRef(null)
  const sliderMaxInCents =
    Math.ceil(absoluteMaxPriceInCents / RANGE_STEP_IN_CENTS) * RANGE_STEP_IN_CENTS
  const normalizedMaxValue =
    maxValue >= absoluteMaxPriceInCents ? sliderMaxInCents : maxValue
  const normalizedMinValue = Math.min(minValue, normalizedMaxValue)
  const [draftMinValue, setDraftMinValue] = useState(normalizedMinValue)
  const [draftMaxValue, setDraftMaxValue] = useState(
    Math.max(normalizedMaxValue, normalizedMinValue)
  )
  const safeDraftMaxValue = Math.max(draftMaxValue, draftMinValue)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftMinValue(normalizedMinValue)
    setDraftMaxValue(Math.max(normalizedMaxValue, normalizedMinValue))
  }, [normalizedMinValue, normalizedMaxValue])

  useEffect(() => {
    return () => {
      if (minCommitTimeoutRef.current) {
        clearTimeout(minCommitTimeoutRef.current)
      }
      if (maxCommitTimeoutRef.current) {
        clearTimeout(maxCommitTimeoutRef.current)
      }
    }
  }, [])

  function scheduleMinCommit(nextMinValue) {
    if (minCommitTimeoutRef.current) {
      clearTimeout(minCommitTimeoutRef.current)
    }

    minCommitTimeoutRef.current = setTimeout(() => {
      onMinChange(nextMinValue)
      minCommitTimeoutRef.current = null
    }, RANGE_COMMIT_DEBOUNCE_MS)
  }

  function scheduleMaxCommit(nextMaxValue) {
    if (maxCommitTimeoutRef.current) {
      clearTimeout(maxCommitTimeoutRef.current)
    }

    maxCommitTimeoutRef.current = setTimeout(() => {
      onMaxChange(nextMaxValue)
      maxCommitTimeoutRef.current = null
    }, RANGE_COMMIT_DEBOUNCE_MS)
  }

  function flushMinCommit() {
    if (minCommitTimeoutRef.current) {
      clearTimeout(minCommitTimeoutRef.current)
      minCommitTimeoutRef.current = null
    }

    if (draftMinValue !== minValue) {
      onMinChange(draftMinValue)
    }
  }

  function flushMaxCommit() {
    if (maxCommitTimeoutRef.current) {
      clearTimeout(maxCommitTimeoutRef.current)
      maxCommitTimeoutRef.current = null
    }

    if (safeDraftMaxValue !== normalizedMaxValue) {
      onMaxChange(safeDraftMaxValue)
    }
  }

  function handleMinInputChange(event) {
    const nextMinValue = Number(event.target.value)
    setDraftMinValue(nextMinValue)
    setDraftMaxValue((previousMaxValue) => Math.max(previousMaxValue, nextMinValue))
    scheduleMinCommit(nextMinValue)
  }

  function handleMaxInputChange(event) {
    const nextMaxValue = Number(event.target.value)
    setDraftMaxValue(nextMaxValue)
    setDraftMinValue((previousMinValue) => Math.min(previousMinValue, nextMaxValue))
    scheduleMaxCommit(nextMaxValue)
  }

  return (
    <div className="price-filters">
      <label className="filter-field" htmlFor={minPriceId}>
        <span>
          Min Price
          <strong>{formatPrice(draftMinValue)}</strong>
        </span>
        <input
          id={minPriceId}
          type="range"
          min="0"
          max={sliderMaxInCents}
          step={RANGE_STEP_IN_CENTS}
          value={draftMinValue}
          onChange={handleMinInputChange}
          onMouseUp={flushMinCommit}
          onTouchEnd={flushMinCommit}
          onKeyUp={flushMinCommit}
        />
      </label>

      <label className="filter-field" htmlFor={maxPriceId}>
        <span>
          Max Price
          <strong>{formatPrice(safeDraftMaxValue)}</strong>
        </span>
        <input
          id={maxPriceId}
          type="range"
          min={draftMinValue}
          max={sliderMaxInCents}
          step={RANGE_STEP_IN_CENTS}
          value={safeDraftMaxValue}
          onChange={handleMaxInputChange}
          onMouseUp={flushMaxCommit}
          onTouchEnd={flushMaxCommit}
          onKeyUp={flushMaxCommit}
        />
      </label>
    </div>
  )
}

export default PriceFilter
