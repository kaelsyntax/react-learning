import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredProducts } from '../../src/hooks/useFilteredProducts.js'

describe('useFilteredProducts', () => {
  it('returns only products matching selected category', () => {
    const products = [
      { id: 1, title: 'K68 Keyboard', category: 'keyboards', priceInCents: 9000 },
      { id: 2, title: 'Pro Mouse', category: 'mice', priceInCents: 3000 },
      { id: 3, title: 'K87 Keyboard', category: 'keyboards', priceInCents: 12000 },
    ]

    const filters = {
      category: 'keyboards',
      minPriceInCents: 0,
      maxPriceInCents: null,
      sortBy: 'default',
    }

    const { result } = renderHook(() => useFilteredProducts(products, filters))

    expect(result.current).toEqual([
      { id: 1, title: 'K68 Keyboard', category: 'keyboards', priceInCents: 9000 },
      { id: 3, title: 'K87 Keyboard', category: 'keyboards', priceInCents: 12000 },
    ])
  })
})

