import { FilterIcon } from './icons'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import './filters.css'

function Filters({
  categories,
  filters,
  maxPriceInCents,
  filteredCount,
  totalCount,
  onCategoryChange,
  onMinPriceChange,
  formatCategoryLabel,
  formatPrice
}) {
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
          onChange={onCategoryChange}
          formatCategoryLabel={formatCategoryLabel}
        />

        <PriceFilter
          value={filters.minPriceInCents}
          maxPriceInCents={maxPriceInCents}
          onChange={onMinPriceChange}
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
