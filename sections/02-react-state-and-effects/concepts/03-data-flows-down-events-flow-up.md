# Data Flows Down, Events Flow Up

## Goal

Understand React communication direction between parent and child components.

## Core Idea

- Data goes down through props.
- User interactions go up through callback props.

Example context:

- `App` passes `squares` down to `Board`.
- `Board` passes `value` down to each `Square`.
- `Square` triggers `onSquareClick`, and that event travels back up to `App`.

## Example

```jsx
function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onSquareClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  )
}
```

This also shows a useful naming pattern: use domain-specific callback names like `onSquareClick`.

## Why This Pattern Matters

- Keeps components decoupled.
- Makes data flow predictable.
- Simplifies debugging.

## Common Mistake

Trying to update parent state directly inside a child without callbacks.
