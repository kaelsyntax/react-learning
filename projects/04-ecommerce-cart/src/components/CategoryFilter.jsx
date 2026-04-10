function CategoryFilter({ categories, value, onChange, formatCategoryLabel }) {
  return (
    <label className="filter-field" htmlFor="category-filter">
      <span>Category</span>
      <select id="category-filter" value={value} onChange={onChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategoryLabel(category)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
