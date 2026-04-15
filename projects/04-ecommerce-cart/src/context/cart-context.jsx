import { createContext, useEffect, useReducer } from 'react'
import { CART_ACTIONS } from '../domain/cart/cart-actions'
import { cartReducer, initialCartItems } from '../domain/cart/cart-reducer'
import {
  getTotalItems,
  getTotalPriceInCents
} from '../domain/cart/cart-selectors'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'ecommerce-cart-items-v1'

function loadCartItemsFromStorage() {
  if (typeof window === 'undefined') {
    return initialCartItems
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!rawCart) return initialCartItems

    const parsedCart = JSON.parse(rawCart)
    if (!Array.isArray(parsedCart)) return initialCartItems

    return parsedCart
      .filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          typeof item.id === 'number' &&
          typeof item.quantity === 'number' &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0 &&
          typeof item.stock === 'number' &&
          Number.isFinite(item.stock) &&
          item.stock > 0 &&
          typeof item.priceInCents === 'number' &&
          Number.isFinite(item.priceInCents)
      )
      .map((item) => ({
        ...item,
        quantity: Math.min(Math.floor(item.quantity), item.stock)
      }))
      .filter((item) => item.quantity > 0)
  } catch {
    return initialCartItems
  }
}

function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    initialCartItems,
    loadCartItemsFromStorage
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // ignore storage write failures (private mode/quota)
    }
  }, [cartItems])

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
