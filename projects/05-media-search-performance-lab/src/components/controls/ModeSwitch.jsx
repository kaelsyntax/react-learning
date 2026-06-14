function ModeSwitch({ mode, onModeChange }) {
  return (
    <div
      className={`mode-switch ${mode === 'movies' ? 'is-movies' : 'is-anime'}`}
      role="group"
      aria-label="Media type"
    >
      <span className="mode-switch__thumb" aria-hidden="true" />
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
