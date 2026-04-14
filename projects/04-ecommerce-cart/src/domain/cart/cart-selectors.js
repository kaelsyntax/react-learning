function getTotalItems(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}

function getTotalPriceInCents(cartItems) {
  return cartItems.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  )
}

export { getTotalItems, getTotalPriceInCents }
