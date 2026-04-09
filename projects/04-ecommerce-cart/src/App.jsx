import './App.css'
import products from './mocks/products.json'
import Products from './components/products'
import { FilterIcon } from './components/icons'

function App() {
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
          <p className="filters-note">
            Filter state and controlled inputs will be added in Concept 02.
          </p>
        </section>

        <Products products={products} />
      </section>
    </main>
  )
}

export default App
