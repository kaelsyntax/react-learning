function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="mode-switch" role="group" aria-label="Media type">
      <button
        type="button"
        className={mode === 'anime' ? 'is-active' : ''}
        onClick={() => onModeChange('anime')}
      >
        Anime
      </button>
      <button
        type="button"
        className={mode === 'movies' ? 'is-active' : ''}
        onClick={() => onModeChange('movies')}
      >
        Movies
      </button>
    </div>
  )
}

export default ModeSwitch
