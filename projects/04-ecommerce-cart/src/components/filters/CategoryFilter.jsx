import CustomSelect from './CustomSelect'

function CategoryFilter({ categories, value, onChange, formatCategoryLabel }) {
  return (
    <CustomSelect
      label="Category"
      options={categories}
      value={value}
      onChange={onChange}
      formatOptionLabel={formatCategoryLabel}
    />
  )
}

export default CategoryFilter
