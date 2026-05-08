import { describe, expect, it } from 'vitest'
import { getTotalItems } from '../../../src/domain/cart/cart-selectors.js'

describe('getTotalItems', () => {
  it('returns the sum of all item quantities in the cart', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Keyboard',
        quantity: 2,
      },
      {
        id: 2,
        title: 'Mouse',
        quantity: 3,
      },
    ]

    const result = getTotalItems(cartItems)

    expect(result).toBe(5)
  })
})

