# Derived State vs Stored State

## Goal

Decide when a value should be calculated from existing state instead of stored in a separate `useState`.

## Core Idea

If a value can be derived from current state and props, prefer calculating it during render.

## Example

```jsx
const [squares, setSquares] = useState(Array(9).fill(null))

const winner = calculateWinner(squares) // derived value
```

## Why Prefer Derived State

- Reduces duplicated sources of truth.
- Avoids sync bugs between related values.
- Keeps state shape smaller and easier to reason about.

## When to Store Instead

Store a value only if it cannot be reliably recomputed from current inputs, or if persistence of independent user intent is required.

## Common Mistake

Creating extra `useState` for values that are fully computable from existing state.
