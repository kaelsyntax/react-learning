# One Event Can Update Multiple State Slices

## Goal

Coordinate related state updates from a single user event.

## Core Idea

A single handler can update multiple state slices when they are part of the same flow.

## Example

```jsx
function handleReset() {
  setSquares(Array(9).fill(null))
  setIsXTurn(true)
}
```

## Why This Is Useful

- Keeps related updates synchronized.
- Makes handlers easier to reason about.
- Prevents partial resets or inconsistent UI.

## Where It Also Appears

The same pattern can happen in click handlers (for example, update board + update turn).

## Common Mistakes

- Splitting related updates across disconnected handlers.
- Updating one state slice and forgetting the others required by the same event.
