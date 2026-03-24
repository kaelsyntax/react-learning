import { WINNING_COMBINATIONS } from '../constants/game'

export function calculateWinner(squares) {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination

        if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
        ) {
        return {
            winner: squares[a],
            line: combination,
        }
        }
    }

    return null
}