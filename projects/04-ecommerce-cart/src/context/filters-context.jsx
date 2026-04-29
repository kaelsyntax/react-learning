import { createContext, useState } from 'react'

const FiltersContext = createContext(null)

const initialFilters = {
  category: 'all',
  minPriceInCents: 0,
  maxPriceInCents: null,
  sortBy: 'featured'
}

function toPriceInCents(eventOrValue) {
  if (typeof eventOrValue === 'number') return eventOrValue
  if (typeof eventOrValue === 'string') return Number(eventOrValue)
  return Number(eventOrValue.target.value)
}

function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters)

  function handleCategoryChange(eventOrValue) {
    const category =
      typeof eventOrValue === 'string'
        ? eventOrValue
        : eventOrValue.target.value

    setFilters((previous) => {
      if (previous.category === category) return previous

      return {
        ...previous,
        category
      }
    })
  }

  function handleMinPriceChange(eventOrValue) {
    const nextMinPriceInCents = toPriceInCents(eventOrValue)

    setFilters((previous) => {
      const nextMaxPriceInCents =
        previous.maxPriceInCents !== null &&
        nextMinPriceInCents > previous.maxPriceInCents
          ? nextMinPriceInCents
          : previous.maxPriceInCents

      if (
        previous.minPriceInCents === nextMinPriceInCents &&
        previous.maxPriceInCents === nextMaxPriceInCents
      ) {
        return previous
      }

      return {
        ...previous,
        minPriceInCents: nextMinPriceInCents,
        maxPriceInCents: nextMaxPriceInCents
      }
    })
  }

  function handleMaxPriceChange(eventOrValue) {
    const nextMaxPriceInCents = toPriceInCents(eventOrValue)

    setFilters((previous) => {
      const nextMinPriceInCents =
        previous.minPriceInCents > nextMaxPriceInCents
          ? nextMaxPriceInCents
          : previous.minPriceInCents

      if (
        previous.minPriceInCents === nextMinPriceInCents &&
        previous.maxPriceInCents === nextMaxPriceInCents
      ) {
        return previous
      }

      return {
        ...previous,
        minPriceInCents: nextMinPriceInCents,
        maxPriceInCents: nextMaxPriceInCents
      }
    })
  }

  function handleSortChange(eventOrValue) {
    const sortBy =
      typeof eventOrValue === 'string'
        ? eventOrValue
        : eventOrValue.target.value

    setFilters((previous) => {
      if (previous.sortBy === sortBy) return previous

      return {
        ...previous,
        sortBy
      }
    })
  }

  function resetFilters() {
    setFilters(initialFilters)
  }

  const hasActiveFilters =
    filters.category !== initialFilters.category ||
    filters.minPriceInCents !== initialFilters.minPriceInCents ||
    filters.maxPriceInCents !== initialFilters.maxPriceInCents ||
    filters.sortBy !== initialFilters.sortBy

  const value = {
    filters,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortChange,
    resetFilters,
    hasActiveFilters
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
