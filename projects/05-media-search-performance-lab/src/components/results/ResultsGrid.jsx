import { memo } from 'react'

const ResultsGrid = memo(function ResultsGrid({ items }) {
  return (
    <ul className="results-grid">
      {items.map((item) => (
        <li className="media-card" key={item.id}>
          <img
            className="media-card__image"
            src={item.image}
            alt={item.title}
            loading="lazy"
          />
          <h3 className="media-card__title">{item.title}</h3>
          <p className="media-card__meta">
            Year: {item.year ?? 'Unknown'} | Score: {item.score ?? 'N/A'}
          </p>
        </li>
      ))}
    </ul>
  )
})

export default ResultsGrid
