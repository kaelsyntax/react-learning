import { memo } from 'react'
import ResultCard from './ResultCard'

const ResultsGrid = memo(function ResultsGrid({ items }) {
  return (
    <ul className="results-grid">
      {items.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </ul>
  )
})

export default ResultsGrid
