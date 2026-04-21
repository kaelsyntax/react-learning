const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

function formatPrice(priceInCents) {
  return priceFormatter.format(priceInCents / 100)
}

export { formatPrice }
