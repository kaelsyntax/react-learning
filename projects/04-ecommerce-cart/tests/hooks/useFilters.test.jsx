import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { FiltersProvider } from '../../src/context/filters-context.jsx'
import { useFilters } from '../../src/hooks/useFilters.js'

function Wrapper({ children }) {
  return <FiltersProvider>{children}</FiltersProvider>
}

describe('useFilters', () => {
  it('throws an error when used outside FiltersProvider', () => {
    expect(() => renderHook(() => useFilters())).toThrow(
      'useFilters must be used within FiltersProvider'
    )
  })

  it('returns initial filters state inside provider', () => {
    const { result } = renderHook(() => useFilters(), { wrapper: Wrapper })

    expect(result.current.filters).toEqual({
      category: 'all',
      minPriceInCents: 0,
      maxPriceInCents: null,
      sortBy: 'featured',
    })
    expect(result.current.hasActiveFilters).toBe(false)
  })

  it('updates filters through handlers and can reset to initial state', () => {
    const { result } = renderHook(() => useFilters(), { wrapper: Wrapper })

    act(() => {
      result.current.handleCategoryChange('keyboards')
      result.current.handleMinPriceChange(5000)
      result.current.handleSortChange('price-asc')
    })

    expect(result.current.filters).toEqual({
      category: 'keyboards',
      minPriceInCents: 5000,
      maxPriceInCents: null,
      sortBy: 'price-asc',
    })
    expect(result.current.hasActiveFilters).toBe(true)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters).toEqual({
      category: 'all',
      minPriceInCents: 0,
      maxPriceInCents: null,
      sortBy: 'featured',
    })
    expect(result.current.hasActiveFilters).toBe(false)
  })
})
