function useFilteredProducts(products, filters) {
  return products.filter((product) => {
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinPrice = product.priceInCents >= filters.minPriceInCents
    const matchesMaxPrice =
      filters.maxPriceInCents === null ||
      product.priceInCents <= filters.maxPriceInCents

    return matchesCategory && matchesMinPrice && matchesMaxPrice
  })
}

export { useFilteredProducts }
