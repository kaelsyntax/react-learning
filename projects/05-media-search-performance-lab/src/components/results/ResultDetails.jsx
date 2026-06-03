const FALLBACK_POSTER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720"><rect width="480" height="720" fill="%2311111a"/><text x="50%25" y="48%25" text-anchor="middle" fill="%23f4f7ff" font-family="Arial, sans-serif" font-size="28">No Image</text><text x="50%25" y="55%25" text-anchor="middle" fill="%23a8b0c7" font-family="Arial, sans-serif" font-size="16">Media Search Lab</text></svg>'

function ResultDetails({ item, isClosing = false, onClose, onExited }) {
  if (!item) return null

  const title = item.title?.trim() || 'Untitled'
  const image = item.image?.trim() || FALLBACK_POSTER
  const year = item.year ?? 'Unknown'
  const score = item.score ?? 'N/A'
  const episodes = item.episodes ?? 'Unknown'
  const status = item.status?.trim() || 'Unknown'
  const rating = item.rating?.trim() || 'Unrated'
  const source = item.source?.trim() || 'Unknown'
  const duration = item.duration?.trim() || 'Unknown'
  const synopsis = item.synopsis?.trim() || 'No synopsis available for this title yet.'
  const genres = Array.isArray(item.genres) ? item.genres.slice(0, 4) : []
  const mediaType = item.mediaType ?? 'media'

  return (
    <div
      className={`details-overlay ${isClosing ? 'is-closing' : ''}`}
      role="presentation"
      onClick={onClose}
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) {
          onExited?.()
        }
      }}
    >
      <section
        className="details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="details-panel__close"
          type="button"
          onClick={onClose}
          aria-label="Close details"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 7L17 17M17 7L7 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <img
          className="details-panel__image"
          src={image}
          alt={`${title} poster`}
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = FALLBACK_POSTER
          }}
        />

        <div className="details-panel__content">
          <p className="details-panel__eyebrow">{mediaType}</p>
          <h2 className="details-panel__title" id="details-title">
            {title}
          </h2>

          {item.titleEnglish ? (
            <p className="details-panel__subtitle">{item.titleEnglish}</p>
          ) : null}

          <div className="details-panel__stats" aria-label="Media details">
            <span>Year: {year}</span>
            <span>Score: {score}</span>
            <span>Episodes: {episodes}</span>
            <span>{status}</span>
          </div>

          {genres.length > 0 ? (
            <div className="details-panel__genres" aria-label="Genres">
              {genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          ) : null}

          <p className="details-panel__synopsis">{synopsis}</p>

          <dl className="details-panel__facts">
            <div>
              <dt>Source</dt>
              <dd>{source}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{duration}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{rating}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}

export default ResultDetails
