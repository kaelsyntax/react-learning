import Square from './Square'

function getWinningLineClass(winningLine) {
    if (!winningLine.length) return ''

    const map = {
        '0,1,2': 'line-row-top',
        '3,4,5': 'line-row-middle',
        '6,7,8': 'line-row-bottom',
        '0,3,6': 'line-col-left',
        '1,4,7': 'line-col-center',
        '2,5,8': 'line-col-right',
        '0,4,8': 'line-diagonal-main',
        '2,4,6': 'line-diagonal-anti',
    }

    return map[winningLine.join(',')] || ''
}

function Board({
    squares,
    onSquareClick,
    isBoardResetting,
    winningLine,
    winner,
    isGameOver,
    }) {
    const winningLineClass = getWinningLineClass(winningLine)
    const winningLineClasses = [
        'board-winning-line',
        winningLineClass,
        winner === 'X' ? 'winner-x' : 'winner-o',
        isBoardResetting ? 'exiting' : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <section className="board-wrapper">
        <section className="board">
            {squares.map((square, index) => (
            <Square
                key={index}
                value={square}
                onClick={() => onSquareClick(index)}
                isResetting={isBoardResetting}
                isWinningSquare={winningLine.includes(index)}
                winner={winner}
                disabled={Boolean(square) || isGameOver}
            />
            ))}

            {winningLine.length > 0 && (
            <span className={winningLineClasses} aria-hidden="true" />
            )}
        </section>
        </section>
    )
}

export default Board
