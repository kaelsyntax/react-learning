function Square({ value, onClick, isResetting, isWinningSquare, winner, disabled }) {
    const className = [
        'square',
        value ? 'filled' : '',
        value && isResetting ? 'exiting' : '',
        isWinningSquare ? 'winning' : '',
        isWinningSquare && winner === 'X' ? 'winning-x' : '',
        isWinningSquare && winner === 'O' ? 'winning-o' : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
        type="button"
        className={className}
        data-value={value || ''}
        onClick={onClick}
        disabled={disabled}
        aria-label={value ? `Square ${value}` : 'Empty square'}
        >
        {value}
        </button>
    )
}

export default Square
