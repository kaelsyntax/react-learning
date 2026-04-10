import { useId } from 'react'

function CategoryFilter({ categories, value, onChange, formatCategoryLabel }) {
  const categoryId = useId()

  return (
    <label className="filter-field" htmlFor={categoryId}>
      <span>Category</span>
      <select id={categoryId} value={value} onChange={onChange}>
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
