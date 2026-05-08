import { describe, expect, it } from 'vitest'
import {
  getTotalItems,
  getTotalPriceInCents,
} from '../../../src/domain/cart/cart-selectors.js'

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

describe('getTotalPriceInCents', () => {
  it('returns total price in cents using item price and quantity', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Keyboard',
        priceInCents: 10000,
        quantity: 2,
      },
      {
        id: 2,
        title: 'Mouse',
        priceInCents: 2500,
        quantity: 3,
      },
    ]

    const result = getTotalPriceInCents(cartItems)

    expect(result).toBe(27500)
  })
})
