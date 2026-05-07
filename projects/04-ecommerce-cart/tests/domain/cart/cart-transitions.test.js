import { describe, expect, it } from 'vitest'
import { addItemTransition } from '../../../src/domain/cart/cart-transitions.js'

describe('addItemTransition', () => {
  it('adds a new product with quantity 1', () => {
    const cartItems = []

    const product = {
      id: 1,
      title: 'Keyboard',
      stock: 5,
    }

    const result = addItemTransition(cartItems, product)

    expect(result).toEqual([
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 1,
      },
    ])
  })
})
