import { createContext, useReducer } from 'react'
import { CART_ACTIONS } from '../domain/cart/cart-actions'
import { cartReducer, initialCartItems } from '../domain/cart/cart-reducer'
import {
  getTotalItems,
  getTotalPriceInCents
} from '../domain/cart/cart-selectors'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems)

  function addToCart(product) {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
  }

  function decreaseQuantity(productId) {
    dispatch({ type: CART_ACTIONS.DECREASE_ITEM, payload: productId })
  }

  function removeFromCart(productId) {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const totalItems = getTotalItems(cartItems)
  const totalPriceInCents = getTotalPriceInCents(cartItems)

  const value = {
    cartItems,
    totalItems,
    totalPriceInCents,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartContext, CartProvider }
