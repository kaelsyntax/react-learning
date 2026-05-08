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

  it('decreases item quantity when action type is DECREASE_ITEM', () => {
    const currentState = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 2,
      },
    ]

    const action = {
      type: CART_ACTIONS.DECREASE_ITEM,
      payload: 1,
    }

    const result = cartReducer(currentState, action)

    expect(result).toEqual([
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 1,
      },
    ])
  })

  it('removes item when action type is REMOVE_ITEM', () => {
    const currentState = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Mouse',
        stock: 8,
        quantity: 2,
      },
    ]

    const action = {
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: 1,
    }

    const result = cartReducer(currentState, action)

    expect(result).toEqual([
      {
        id: 2,
        title: 'Mouse',
        stock: 8,
        quantity: 2,
      },
    ])
  })

  it('clears cart when action type is CLEAR_CART', () => {
    const currentState = [
      {
        id: 1,
        title: 'Keyboard',
        stock: 5,
        quantity: 1,
      },
      {
        id: 2,
        title: 'Mouse',
        stock: 8,
        quantity: 2,
      },
    ]

    const action = {
      type: CART_ACTIONS.CLEAR_CART,
    }

    const result = cartReducer(currentState, action)

    expect(result).toEqual(initialCartItems)
  })
})
