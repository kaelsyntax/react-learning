# Never Mutate React State Directly

## Goal

Update state safely when working with arrays and objects.

## Core Idea

React state must be treated as immutable. Create a new copy before changing data.

## Good Update Pattern

```jsx
function handleClick(index) {
  const nextSquares = [...squares]
  nextSquares[index] = 'X'
  setSquares(nextSquares)
}
```

## Bad Pattern (Avoid)

```jsx
squares[index] = 'X'
setSquares(squares)
```

## Why Mutation Is a Problem

- React may not detect the update reliably.
- React relies heavily on shallow comparison, so mutating the same reference can skip expected updates.
- Causes hard-to-track bugs.
- Breaks predictable state flow.

## Quick Rule

If state is an array or object, copy first, then update the copy.
