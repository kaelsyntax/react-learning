import { describe, expect, it } from 'vitest'
import {
  addItemTransition,
  decreaseItemTransition,
} from '../../../src/domain/cart/cart-transitions.js'

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

  it('does not increase quantity when item already reached stock limit', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 2,
        quantity: 2,
      },
    ]

    const product = {
      id: 1,
      title: 'Keyboard',
      stock: 2,
    }

    const result = addItemTransition(cartItems, product)

    expect(result).toEqual([
      {
        id: 1,
        title: 'Keyboard',
        stock: 2,
        quantity: 2,
      },
    ])
  })
})

describe('decreaseItemTransition', () => {
  it('decreases item quantity by 1 when quantity is greater than 1', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 3,
      },
    ]

    const result = decreaseItemTransition(cartItems, 1)

    expect(result).toEqual([
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 2,
      },
    ])
  })

  it('removes item when quantity reaches 0', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 1,
      },
    ]

    const result = decreaseItemTransition(cartItems, 1)

    expect(result).toEqual([])
  })
})
