import { FilterIcon } from './icons'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import './filters.css'
import { useFilters } from '../hooks/useFilters'

function Filters({
  categories,
  maxPriceInCents,
  filteredCount,
  totalCount,
  formatCategoryLabel,
  formatPrice
}) {
  const {
    filters,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    resetFilters,
    hasActiveFilters
  } = useFilters()

  return (
    <section className="filters" aria-label="Filters">
      <div className="filters-head">
        <div className="filters-title">
          <FilterIcon size={18} aria-hidden="true" />
          <h2>Filters</h2>
        </div>

        <button
          className="filters-reset"
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          Reset filters
        </button>
      </div>

      <div className="filters-grid">
        <CategoryFilter
          categories={categories}
          value={filters.category}
          onChange={handleCategoryChange}
          formatCategoryLabel={formatCategoryLabel}
        />

        <PriceFilter
          minValue={filters.minPriceInCents}
          maxValue={filters.maxPriceInCents ?? maxPriceInCents}
          absoluteMaxPriceInCents={maxPriceInCents}
          onMinChange={handleMinPriceChange}
          onMaxChange={handleMaxPriceChange}
          formatPrice={formatPrice}
        />
      </div>

      {filteredCount ? (
        <p className="filters-note">
          Showing {filteredCount} of {totalCount} products
        </p>
      ) : (
        <p className="filters-note filters-note--empty">
          No products match current filters. Reset to see all products.
        </p>
      )}
    </section>
  )
}

export default Filters
