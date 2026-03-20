# Event Handler Pattern: Validation and Guard Clauses

## Goal

Write cleaner handlers by validating early and updating state only when interaction is valid.

## Core Idea

A robust event handler often follows this order:

1. Event trigger
2. Validation / guard clauses
3. Next-state calculation
4. State update

## Example Pattern

```jsx
function handleSquareClick(index) {
  if (squares[index] !== null) return

  const nextSquares = [...squares]
  nextSquares[index] = isXTurn ? 'X' : 'O'

  setSquares(nextSquares)
  setIsXTurn((prev) => !prev)
}
```

## Why It Helps

- Prevents invalid updates.
- Reduces nested `if` blocks.
- Keeps handler flow predictable and readable.

## Early Exit When Game Is Over

Guard clauses can also block interaction once the game reaches a terminal state:

```jsx
if (winner) return
```

This keeps the board locked after a valid winner is already decided.

## Common Mistakes

- Validating too late (after creating or mutating state).
- Mixing multiple responsibilities in one long handler.
- Forgetting early returns for invalid interactions.

## Note

This is an applied React pattern: event -> validation -> state update.
