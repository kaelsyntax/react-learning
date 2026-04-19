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
            <div className="catalog-header-copy">
              <p className="catalog-kicker">Curated tech catalog</p>
              <h1 className="catalog-title">Tech Essentials Store</h1>
              <p className="catalog-description">
                Curated tech accessories with fast filtering and a smooth cart flow.
              </p>
            </div>
          </div>
        </header>
        
        <CartPanel formatPrice={formatPrice} />

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
