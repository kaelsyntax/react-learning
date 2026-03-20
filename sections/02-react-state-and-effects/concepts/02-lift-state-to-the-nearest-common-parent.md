# Lift State to the Nearest Common Parent

## Goal

Understand where state should live when multiple components must coordinate the same data.

## Core Idea

If two or more components need shared data, place that state in their nearest common parent.

Example context:

- `App` owns `squares` state.
- `Board` and `Square` receive data through props.

## Data Flow

State flows down through props, and updates flow up through function calls (callbacks).

## Example

```jsx
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(index) {
    const nextSquares = [...squares]
    nextSquares[index] = 'X'
    setSquares(nextSquares)
  }

  return <Board squares={squares} onSquareClick={handleClick} />
}
```

## Why This Is Correct

- Single source of truth for shared state.
- Easier synchronization between squares.
- Predictable updates.

## Common Mistake

Putting local `useState` in each `Square`, which makes the board inconsistent.
