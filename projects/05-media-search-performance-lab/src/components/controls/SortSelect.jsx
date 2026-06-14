import { useEffect, useRef, useState } from 'react'

const SORT_OPTIONS = [
  { value: 'score_desc', label: 'Score (high to low)' },
  { value: 'score_asc', label: 'Score (low to high)' },
  { value: 'year_desc', label: 'Year (newest)' },
  { value: 'year_asc', label: 'Year (oldest)' },
]

function SortSelect({ sort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)

  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === sort) ?? SORT_OPTIONS[0]

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const handleOptionSelect = (value) => {
    onSortChange(value)
    setIsOpen(false)
  }

  return (
    <div className="sort-select" ref={rootRef}>
      <button
        type="button"
        className={`sort-select__trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prevState) => !prevState)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort results"
      >
        <span className="sort-select__label">Sort: {selectedOption.label}</span>
        <span className="sort-select__chevron" aria-hidden="true">
          <svg
            className="sort-select__chevron-icon"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <ul className="sort-select__menu" role="listbox" aria-label="Sort results options">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`sort-select__option ${option.value === sort ? 'is-active' : ''}`}
                onClick={() => handleOptionSelect(option.value)}
                role="option"
                aria-selected={option.value === sort}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default SortSelect
