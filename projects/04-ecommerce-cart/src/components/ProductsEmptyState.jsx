import { FilterIcon } from './icons'

function ProductsEmptyState({ isExiting, hasActiveFilters, onResetFilters }) {
  return (
    <div
      className={`products-empty-state ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="products-empty-icon" aria-hidden="true">
        <FilterIcon size={28} />
      </div>
      <p className="products-empty-title">No products match current filters</p>
      <p className="products-empty-text">
        Try widening your price range or choosing a different category.
      </p>
      {hasActiveFilters && (
        <button className="products-empty-reset" type="button" onClick={onResetFilters}>
          Reset filters
        </button>
      )}
    </div>
  )
}

export default ProductsEmptyState
