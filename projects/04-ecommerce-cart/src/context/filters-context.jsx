import { createContext, useState } from 'react'

const FiltersContext = createContext(null)

const initialFilters = {
  category: 'all',
  minPriceInCents: 0
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
    setFilters((previous) => ({
      ...previous,
      minPriceInCents: Number(event.target.value)
    }))
  }

  function resetFilters() {
    setFilters(initialFilters)
  }

  const hasActiveFilters =
    filters.category !== initialFilters.category ||
    filters.minPriceInCents !== initialFilters.minPriceInCents

  const value = {
    filters,
    handleCategoryChange,
    handleMinPriceChange,
    resetFilters,
    hasActiveFilters
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
