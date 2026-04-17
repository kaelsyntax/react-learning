import { createContext, useState } from 'react'

const FiltersContext = createContext(null)

const initialFilters = {
  category: 'all',
  minPriceInCents: 0,
  maxPriceInCents: null
}

function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters)

  function handleCategoryChange(event) {
    setFilters((previous) => ({
      ...previous,
      category: event.target.value
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

  function resetFilters() {
    setFilters(initialFilters)
  }

  const hasActiveFilters =
    filters.category !== initialFilters.category ||
    filters.minPriceInCents !== initialFilters.minPriceInCents ||
    filters.maxPriceInCents !== initialFilters.maxPriceInCents

  const value = {
    filters,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    resetFilters,
    hasActiveFilters
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
