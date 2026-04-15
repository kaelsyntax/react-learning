import './App.css'
import products from './mocks/products.json'
import Products from './components/products'
import Filters from './components/Filters'
import CartPanel from './components/CartPanel'
import { useFilters } from './hooks/useFilters'
import { useFilteredProducts } from './hooks/useFilteredProducts'
import { useCart } from './hooks/useCart'

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
  const { filters } = useFilters()
  const { addToCart, cartItems } = useCart()
  const filteredProducts = useFilteredProducts(products, filters)

  return (
    <main className="app">
      <section className="catalog">
        <header className="catalog-header">
          <div className="catalog-header-top">
            <p className="eyebrow">Section 04</p>
            <CartPanel formatPrice={formatPrice} />
          </div>
          <h1>Ecommerce Cart</h1>
          <p className="catalog-description">
            Product listing from local mock data. We will add filters, cart
            state, context, and reducer step by step.
          </p>
        </header>

        <Filters
          categories={categories}
          maxPriceInCents={maxPriceInCents}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          formatCategoryLabel={formatCategoryLabel}
          formatPrice={formatPrice}
        />

        <Products
          products={filteredProducts}
          cartItems={cartItems}
          onAddToCart={addToCart}
        />
      </section>
    </main>
  )
}

export default App
