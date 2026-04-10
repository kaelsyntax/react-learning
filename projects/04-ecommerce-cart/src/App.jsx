import { useState } from 'react'
import './App.css'
import products from './mocks/products.json'
import Products from './components/products'
import Filters from './components/Filters'

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
    minPriceInCents: 0
  })

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category
    const matchesMinPrice = product.priceInCents >= filters.minPriceInCents

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
      minPriceInCents: Number(event.target.value)
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

        <Filters
          categories={categories}
          filters={filters}
          maxPriceInCents={maxPriceInCents}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          onCategoryChange={handleCategoryChange}
          onMinPriceChange={handleMinPriceChange}
          formatCategoryLabel={formatCategoryLabel}
          formatPrice={formatPrice}
        />

        <Products products={filteredProducts} />
      </section>
    </main>
  )
}

export default App
