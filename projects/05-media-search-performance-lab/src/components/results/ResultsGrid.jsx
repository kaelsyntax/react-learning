import { memo } from 'react'
import ResultCard from './ResultCard'

const ResultsGrid = memo(function ResultsGrid({ items, onSelectItem }) {
  return (
    <ul className={`results-grid ${items.length === 1 ? 'is-single' : ''}`}>
      {items.map((item) => (
        <ResultCard key={item.id} item={item} onSelect={onSelectItem} />
      ))}
    </ul>
  )
})

export default ResultsGrid
