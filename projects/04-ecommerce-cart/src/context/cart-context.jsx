import { createContext, useReducer } from 'react'

const CartContext = createContext(null)

const initialCartItems = []

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload
      const existingItem = state.find((item) => item.id === product.id)

      if (!existingItem) {
        return [...state, { ...product, quantity: 1 }]
      }

      if (existingItem.quantity >= existingItem.stock) {
        return state
      }

      return state.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    }

    case 'DECREASE_ITEM':
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload)

    case 'CLEAR_CART':
      return initialCartItems

    default:
      return state
  }
}

function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems)

  function addToCart(product) {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  function decreaseQuantity(productId) {
    dispatch({ type: 'DECREASE_ITEM', payload: productId })
  }

  function removeFromCart(productId) {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPriceInCents = cartItems.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  )

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
