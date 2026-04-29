import CustomSelect from './CustomSelect'

function SortFilter({ options, value, onChange, formatSortLabel }) {
  return (
    <CustomSelect
      label="Sort"
      options={options}
      value={value}
      onChange={onChange}
      formatOptionLabel={formatSortLabel}
    />
  )
}

export default SortFilter
