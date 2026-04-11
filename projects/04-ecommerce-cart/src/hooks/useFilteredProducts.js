function useFilteredProducts(products, filters) {
  return products.filter((product) => {
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinPrice = product.priceInCents >= filters.minPriceInCents

    return matchesCategory && matchesMinPrice
  })
}

export { useFilteredProducts }
