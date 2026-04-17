import { useId, useState } from 'react'

function CategoryFilter({ categories, value, onChange, formatCategoryLabel }) {
  const categoryId = useId()
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  function handleMouseDown() {
    setIsSelectOpen((previous) => !previous)
  }

  function handleBlur() {
    setIsSelectOpen(false)
  }

  function handleKeyDown(event) {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      setIsSelectOpen(true)
      return
    }

    if (['Escape', 'Tab'].includes(event.key)) {
      setIsSelectOpen(false)
    }
  }

  function handleChange(event) {
    onChange(event)
    setIsSelectOpen(false)
  }

  return (
    <label
      className={`filter-field filter-field--select ${isSelectOpen ? 'filter-field--open' : ''}`}
      htmlFor={categoryId}
    >
      <span>Category</span>
      <div className="select-wrap">
        <select
          id={categoryId}
          className="filter-select"
          value={value}
          onMouseDown={handleMouseDown}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

export default CategoryFilter
