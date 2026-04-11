import { FilterIcon } from './icons'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import './filters.css'
import { useFilters } from '../context/filters-context'

function Filters({
  categories,
  maxPriceInCents,
  filteredCount,
  totalCount,
  formatCategoryLabel,
  formatPrice
}) {
  const { filters, handleCategoryChange, handleMinPriceChange } = useFilters()

  return (
    <section className="filters" aria-label="Filters">
      <div className="filters-head">
        <FilterIcon size={18} aria-hidden="true" />
        <h2>Filters</h2>
      </div>

      <div className="filters-grid">
        <CategoryFilter
          categories={categories}
          value={filters.category}
          onChange={handleCategoryChange}
          formatCategoryLabel={formatCategoryLabel}
        />

        <PriceFilter
          value={filters.minPriceInCents}
          maxPriceInCents={maxPriceInCents}
          onChange={handleMinPriceChange}
          formatPrice={formatPrice}
        />
      </div>

      <p className="filters-note">
        Showing {filteredCount} of {totalCount} products
      </p>
    </section>
  )
}

export default Filters
