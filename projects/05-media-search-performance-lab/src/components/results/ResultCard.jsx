function ResultCard({ item }) {
  return (
    <li className="media-card">
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
  )
}

export default ResultCard
