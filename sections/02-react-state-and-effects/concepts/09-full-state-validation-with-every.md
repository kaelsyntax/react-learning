# Full-State Validation with `every()`

## Goal

Validate whether all items in an array satisfy a condition.

## Core Idea

The `every()` method returns `true` only when all elements pass the condition callback.

## Why It Is Useful in UI State

For board-style UIs, `every()` is a clean way to detect "full state" conditions (for example, all cells occupied).

## Example

```jsx
const isBoardFull = squares.every((square) => square !== null)
```

## Typical Use Case

```jsx
const winner = calculateWinner(squares)
const isDraw = !winner && squares.every((square) => square !== null)
```

## Common Mistakes

- Forgetting to combine `every()` with other conditions (like winner checks).
- Using `every()` when the real intention is to check if at least one item matches (`some()`).

## Quick Comparison

- `every()` -> all items match
- `some()` -> at least one item matches
