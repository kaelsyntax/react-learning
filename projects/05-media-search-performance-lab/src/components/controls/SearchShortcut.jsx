function SearchShortcut({ isVisible, onClick }) {
    return (
        <button
        className={`search-shortcut ${isVisible ? 'is-visible' : ''}`}
        type="button"
        onClick={onClick}
        aria-label="Jump to search"
        >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="1.8"
            />
            <path
            d="M20 20L16.6 16.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            />
        </svg>
        </button>
    )
}

export default SearchShortcut
