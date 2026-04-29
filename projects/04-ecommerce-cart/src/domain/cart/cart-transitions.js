function addItemTransition(cartItems, product) {
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (!existingItem) {
    return [...cartItems, { ...product, quantity: 1 }]
  }

  if (existingItem.quantity >= existingItem.stock) {
    return cartItems
  }

  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  )
}

function decreaseItemTransition(cartItems, productId) {
  return cartItems
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0)
}

function removeItemTransition(cartItems, productId) {
  return cartItems.filter((item) => item.id !== productId)
}

export { addItemTransition, decreaseItemTransition, removeItemTransition }
