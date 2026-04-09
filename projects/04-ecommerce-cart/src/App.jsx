import { useState } from 'react'
import './App.css'
import products from './mocks/products.json'
import Products from './components/products'
import { FilterIcon } from './components/icons'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const categories = ['all', ...new Set(products.map((product) => product.category))]
const maxPriceInCents = Math.max(...products.map((product) => product.priceInCents))

function formatCategoryLabel(value) {
  if (value === 'all') return 'All'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatPrice(priceInCents) {
  return priceFormatter.format(priceInCents / 100)
}

function App() {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinPrice = product.priceInCents >= filters.minPrice

    return matchesCategory && matchesMinPrice
  })

  function handleCategoryChange(event) {
    setFilters((previous) => ({
      ...previous,
      category: event.target.value
    }))
  }

  function handleMinPriceChange(event) {
    setFilters((previous) => ({
      ...previous,
      minPrice: Number(event.target.value)
    }))
  }

  return (
    <main className="app">
      <section className="catalog">
        <header className="catalog-header">
          <p className="eyebrow">Section 04</p>
          <h1>Ecommerce Cart</h1>
          <p className="catalog-description">
            Product listing from local mock data. We will add filters, cart
            state, context, and reducer step by step.
          </p>
        </header>

        <section className="filters" aria-label="Filters">
          <div className="filters-head">
            <FilterIcon size={18} aria-hidden="true" />
            <h2>Filters</h2>
          </div>

          <div className="filters-grid">
            <label className="filter-field" htmlFor="category-filter">
              <span>Category</span>
              <select
                id="category-filter"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter-field" htmlFor="price-filter">
              <span>Min Price: {formatPrice(filters.minPrice)}</span>
              <input
                id="price-filter"
                type="range"
                min="0"
                max={maxPriceInCents}
                step="500"
                value={filters.minPrice}
                onChange={handleMinPriceChange}
              />
            </label>
          </div>

          <p className="filters-note">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </section>

        <Products products={filteredProducts} />
      </section>
    </main>
  )
}

export default App
