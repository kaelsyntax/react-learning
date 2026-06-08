import { useEffect, useRef, useState } from 'react'

const FALLBACK_POSTER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720"><rect width="480" height="720" fill="%2311111a"/><text x="50%25" y="48%25" text-anchor="middle" fill="%23f4f7ff" font-family="Arial, sans-serif" font-size="28">No Image</text><text x="50%25" y="55%25" text-anchor="middle" fill="%23a8b0c7" font-family="Arial, sans-serif" font-size="16">Media Search Lab</text></svg>'
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function hasValue(value) {
  return value !== null && value !== undefined && value !== ''
}

function getDefaultFacts(item) {
  return [
    { label: 'Format', value: item.format },
    { label: 'Source', value: item.source },
    { label: 'Duration', value: item.duration },
    { label: 'Rating', value: item.rating },
  ]
}

function getItemFacts(item) {
  const facts = Array.isArray(item.facts) ? item.facts : getDefaultFacts(item)

  return facts.filter((fact) => fact?.label && hasValue(fact.value))
}

function getFocusableElements(container) {
  if (!container) return []

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    return element.offsetParent !== null || element === document.activeElement
  })
}

function getExternalLinkLabel(mediaType) {
  return mediaType === 'movie' ? 'View on TMDB' : 'View on MyAnimeList'
}

function normalizeComparableText(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function ResultDetails({ item, isClosing = false, onClose, onExited }) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!item) return undefined

    const previousActiveElement = document.activeElement
    const focusableElements = getFocusableElements(panelRef.current)

    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    } else {
      panelRef.current?.focus()
    }

    return () => {
      if (previousActiveElement instanceof HTMLElement && previousActiveElement.isConnected) {
        previousActiveElement.focus()
      }
    }
  }, [item])

  const handlePanelKeyDown = (event) => {
    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements(panelRef.current)

    if (focusableElements.length === 0) {
      event.preventDefault()
      panelRef.current?.focus()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  if (!item) return null

  const title = item.title?.trim() || 'Untitled'
  const subtitle = item.titleEnglish?.trim() ?? ''
  const hasUsefulSubtitle = Boolean(
    subtitle && normalizeComparableText(subtitle) !== normalizeComparableText(title),
  )
  const image = item.imageLarge?.trim() || item.image?.trim() || FALLBACK_POSTER
  const synopsis = item.synopsis?.trim() || 'No synopsis available for this title yet.'
  const genres = Array.isArray(item.genres) ? item.genres.slice(0, 4) : []
  const mediaType = item.mediaType ?? 'media'
  const externalUrl = item.url?.trim() ?? ''
  const externalLinkLabel = getExternalLinkLabel(mediaType)
  const stats = [
    hasValue(item.year) ? `Year: ${item.year}` : '',
    hasValue(item.score) ? `Score: ${item.score}` : '',
    hasValue(item.episodes) ? `Episodes: ${item.episodes}` : '',
    item.status?.trim() ?? '',
  ].filter(Boolean)
  const facts = getItemFacts(item)
  const hasSummaryBand = stats.length > 0 || genres.length > 0 || externalUrl

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
        ref={panelRef}
        className="details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handlePanelKeyDown}
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

        <div className="details-panel__media">
          <div className={`details-panel__image-wrap ${isImageLoading ? 'is-loading' : ''}`}>
            {isImageLoading ? (
              <div className="details-panel__image-loader" aria-hidden="true">
                <span />
              </div>
            ) : null}

            <img
              className="details-panel__image"
              src={image}
              alt={`${title} poster`}
              decoding="async"
              onLoad={() => setIsImageLoading(false)}
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = FALLBACK_POSTER
                setIsImageLoading(false)
              }}
            />
          </div>

          {facts.length > 0 ? (
            <dl className="details-panel__facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="details-panel__content">
          <p className="details-panel__eyebrow">{mediaType}</p>
          <h2 className="details-panel__title" id="details-title">
            {title}
          </h2>

          {hasUsefulSubtitle ? (
            <p className="details-panel__subtitle">{subtitle}</p>
          ) : null}

          {hasSummaryBand ? (
            <div className="details-panel__summary-band">
              {stats.length > 0 ? (
                <div className="details-panel__stats" aria-label="Media details">
                  {stats.map((stat) => (
                    <span key={stat}>{stat}</span>
                  ))}
                </div>
              ) : null}

              {genres.length > 0 ? (
                <div className="details-panel__genres" aria-label="Genres">
                  {genres.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
              ) : null}

              {externalUrl ? (
                <a
                  className="details-panel__external-link"
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${externalLinkLabel} for ${title}`}
                >
                  <span>{externalLinkLabel}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M8 7h9v9M17 7L7 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : null}
            </div>
          ) : null}

          <p className="details-panel__synopsis">{synopsis}</p>
        </div>
      </section>
    </div>
  )
}

export default ResultDetails
