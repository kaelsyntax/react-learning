const FALLBACK_POSTER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720"><rect width="480" height="720" fill="%2311111a"/><text x="50%25" y="48%25" text-anchor="middle" fill="%23f4f7ff" font-family="Arial, sans-serif" font-size="28">No Image</text><text x="50%25" y="55%25" text-anchor="middle" fill="%23a8b0c7" font-family="Arial, sans-serif" font-size="16">Media Search Lab</text></svg>'

function ResultCard({ item = {}, onSelect }) {
  const title = item.title?.trim() || 'Untitled'
  const image = item.image?.trim() || FALLBACK_POSTER
  const year = item.year ?? 'Unknown'
  const score = item.score ?? 'N/A'

  return (
    <li className="media-card">
      <button
        className="media-card__button"
        type="button"
        onClick={() => onSelect?.(item)}
        aria-label={`View details for ${title}`}
      >
        <img
          className="media-card__image"
          src={image}
          alt={`${title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = FALLBACK_POSTER
          }}
        />
        <h3 className="media-card__title">{title}</h3>
        <div className="media-card__meta-row">
          <p className="media-card__meta">Year: {year}</p>
          <span className="media-card__score-badge">
            <svg
              className="media-card__score-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.8L14.6 8l5.7.8-4.1 4 1 5.7L12 15.8l-5.2 2.7 1-5.7-4.1-4 5.7-.8L12 2.8z" />
            </svg>
            <span>{score}</span>
          </span>
        </div>
      </button>
    </li>
  )
}

export default ResultCard
