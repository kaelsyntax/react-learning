function sortProducts(products, sortBy) {
  if (sortBy === 'price-asc') {
    return [...products].sort((a, b) => a.priceInCents - b.priceInCents)
  }

  if (sortBy === 'price-desc') {
    return [...products].sort((a, b) => b.priceInCents - a.priceInCents)
  }

  if (sortBy === 'name-asc') {
    return [...products].sort((a, b) => a.title.localeCompare(b.title))
  }

  return products
}

function useFilteredProducts(products, filters) {
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinPrice = product.priceInCents >= filters.minPriceInCents
    const matchesMaxPrice =
      filters.maxPriceInCents === null ||
      product.priceInCents <= filters.maxPriceInCents

    return matchesCategory && matchesMinPrice && matchesMaxPrice
  })

  return sortProducts(filteredProducts, filters.sortBy)
}

export { useFilteredProducts }
