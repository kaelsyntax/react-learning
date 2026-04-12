import { createContext, useState } from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(product) {
    setCartItems((previous) => {
      const existingItem = previous.find((item) => item.id === product.id)

      if (!existingItem) {
        return [...previous, { ...product, quantity: 1 }]
      }

      if (existingItem.quantity >= existingItem.stock) {
        return previous
      }

      return previous.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    })
  }

  function decreaseQuantity(productId) {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(productId) {
    setCartItems((previous) => previous.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCartItems([])
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
