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

  const value = {
    filters,
    handleCategoryChange,
    handleMinPriceChange
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersProvider }
