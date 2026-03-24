import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameOverModal from './components/GameOverModal'
import { STORAGE_KEYS } from './constants/game'
import { calculateWinner } from './logic/board'

const INITIAL_BOARD = Array(9).fill(null)

function readStoredBoard() {
  if (typeof window === 'undefined') return INITIAL_BOARD

  try {
    const savedBoard = window.localStorage.getItem(STORAGE_KEYS.board)
    if (!savedBoard) return INITIAL_BOARD

    const parsedBoard = JSON.parse(savedBoard)
    const isValidBoard =
      Array.isArray(parsedBoard) &&
      parsedBoard.length === 9 &&
      parsedBoard.every((cell) => cell === null || cell === 'X' || cell === 'O')

    return isValidBoard ? parsedBoard : INITIAL_BOARD
  } catch {
    return INITIAL_BOARD
  }
}

function readStoredTurn() {
  if (typeof window === 'undefined') return true

  try {
    const savedTurn = window.localStorage.getItem(STORAGE_KEYS.turn)
    if (!savedTurn) return true

    const parsedTurn = JSON.parse(savedTurn)
    return typeof parsedTurn === 'boolean' ? parsedTurn : true
  } catch {
    return true
  }
}

function App() {
  const [squares, setSquares] = useState(readStoredBoard)
  const [isXTurn, setIsXTurn] = useState(readStoredTurn)

  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [isBoardResetting, setIsBoardResetting] = useState(false)

  const winnerData = calculateWinner(squares)
  const winner = winnerData?.winner ?? null
  const winningLine = winnerData?.line ?? []
  const isDraw = !winner && squares.every(square => square !== null)
  const isGameOver = winner !== null || isDraw

  const indicatorColorClass = winner
    ? winner === 'X'
      ? 'player-x'
      : 'player-o'
    : isXTurn
      ? 'player-x'
      : 'player-o'

  const turnIndicatorClassName = [
    'turn-indicator',
    indicatorColorClass,
    winner ? 'has-winner' : '',
    isDraw ? 'is-draw' : '',
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (!isGameOver) return

    const timeoutId = setTimeout(() => {
      setShowGameOverModal(true)
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [isGameOver])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(STORAGE_KEYS.board, JSON.stringify(squares))
    } catch {
      // Ignore write errors (private mode/quota/blocked storage)
    }
  }, [squares])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(STORAGE_KEYS.turn, JSON.stringify(isXTurn))
    } catch {
      // Ignore write errors (private mode/quota/blocked storage)
    }
  }, [isXTurn])

  function handleClick(index) {
    if (squares[index] || winner || isDraw) return

    const nextSquares = [...squares]
    nextSquares[index] = isXTurn ? 'X' : 'O'

    setSquares(nextSquares)
    setIsXTurn((prev) => !prev)
  }

  function handleReset() {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
  }

  function handleModalReset() {
    setIsModalClosing(true)
    setIsBoardResetting(true)

    setTimeout(() => {
      setShowGameOverModal(false)
      handleReset()
      setIsModalClosing(false)
      setIsBoardResetting(false)
    }, 260)
  }

  return (
    <main className="app">
      <section className="game">
        <header className="heading">
          <p className="eyebrow">React mini game</p>
          <h1 className="title">Tic Tac Toe</h1>
        </header>

        <div className={turnIndicatorClassName} aria-live="polite">
          {winner ? (
            <span className="turn-option active winner-pill">{winner}</span>
          ) : isDraw ? (
            <span className="status-message draw-message">Draw</span>
          ) : (
            <>
              <span className={`turn-option ${isXTurn ? 'active' : ''}`}>X</span>
              <span className={`turn-option ${!isXTurn ? 'active' : ''}`}>O</span>
            </>
          )}
        </div>

        {showGameOverModal && (
          <GameOverModal
            winner={winner}
            onReset={handleModalReset}
            isClosing={isModalClosing}
          />
        )}

        <Board
          squares={squares}
          onSquareClick={handleClick}
          isBoardResetting={isBoardResetting}
          winningLine={winningLine}
          winner={winner}
          isGameOver={isGameOver}
        />

        <button type="button" className="reset-button" onClick={handleModalReset}>
          Reset game
        </button>
      </section>
    </main>
  )
}

export default App
