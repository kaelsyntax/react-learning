import { createContext, useState } from 'react'

const FiltersContext = createContext(null)

const initialFilters = {
  category: 'all',
  minPriceInCents: 0,
  maxPriceInCents: null,
  sortBy: 'featured'
}

function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters)

  function handleCategoryChange(eventOrValue) {
    const category =
      typeof eventOrValue === 'string'
        ? eventOrValue
        : eventOrValue.target.value

    setFilters((previous) => ({
      ...previous,
      category
    }))
  }

  function handleMinPriceChange(event) {
    const nextMinPriceInCents = Number(event.target.value)

    setFilters((previous) => ({
      ...previous,
      minPriceInCents: nextMinPriceInCents,
      maxPriceInCents:
        previous.maxPriceInCents !== null &&
        nextMinPriceInCents > previous.maxPriceInCents
          ? nextMinPriceInCents
          : previous.maxPriceInCents
    }))
  }

  function handleMaxPriceChange(event) {
    const nextMaxPriceInCents = Number(event.target.value)

    setFilters((previous) => ({
      ...previous,
      minPriceInCents:
        previous.minPriceInCents > nextMaxPriceInCents
          ? nextMaxPriceInCents
          : previous.minPriceInCents,
      maxPriceInCents: nextMaxPriceInCents
    }))
  }

  function handleSortChange(eventOrValue) {
    const sortBy =
      typeof eventOrValue === 'string'
        ? eventOrValue
        : eventOrValue.target.value

    setFilters((previous) => ({
      ...previous,
      sortBy
    }))
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
