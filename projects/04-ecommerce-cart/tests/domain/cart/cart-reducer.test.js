import { describe, expect, it } from 'vitest'
import { CART_ACTIONS } from '../../../src/domain/cart/cart-actions.js'
import { cartReducer, initialCartItems } from '../../../src/domain/cart/cart-reducer.js'

describe('cartReducer', () => {
  it('adds a product when action type is ADD_ITEM', () => {
    const product = {
      id: 1,
      title: 'Keyboard',
      stock: 5,
    }

    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: product,
    }

    const result = cartReducer(initialCartItems, action)

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

