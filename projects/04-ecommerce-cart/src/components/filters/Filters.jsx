import { FilterIcon } from '../shared/icons'
import CategoryFilter from './CategoryFilter'
import SortFilter from './SortFilter'
import PriceFilter from './PriceFilter'
import './filters.css'
import { useFilters } from '../../hooks/useFilters'

const sortOptions = ['featured', 'price-asc', 'price-desc', 'name-asc']

function formatSortLabel(sortBy) {
  if (sortBy === 'price-asc') return 'Price: Low to high'
  if (sortBy === 'price-desc') return 'Price: High to low'
  if (sortBy === 'name-asc') return 'Name: A to Z'
  return 'Featured'
}

function Filters({
  categories,
  maxPriceInCents,
  filteredCount,
  totalCount,
  formatCategoryLabel
}) {
  const {
    filters,
    handleCategoryChange,
    handleSortChange,
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

        <SortFilter
          options={sortOptions}
          value={filters.sortBy}
          onChange={handleSortChange}
          formatSortLabel={formatSortLabel}
        />

        <PriceFilter
          minValue={filters.minPriceInCents}
          maxValue={filters.maxPriceInCents ?? maxPriceInCents}
          absoluteMaxPriceInCents={maxPriceInCents}
          onMinChange={handleMinPriceChange}
          onMaxChange={handleMaxPriceChange}
        />
      </div>

      <p className="filters-note">
        Showing {filteredCount} of {totalCount} products
      </p>
    </section>
  )
}

export default Filters
