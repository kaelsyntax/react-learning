# Reset UI by Restoring Initial State

## Goal

Reset an interface by restoring state variables to their initial values.

## Core Idea

In React, reset behavior is implemented through state updates, not manual DOM manipulation.

## Example

```jsx
function handleReset() {
  setSquares(Array(9).fill(null))
  setIsXTurn(true)
}
```

## Why This Works

- Keeps reset logic predictable and declarative.
- React re-renders the UI from new state values.
- Avoids direct DOM operations (`querySelector`, `innerHTML`, class toggles).

## Common Mistakes

- Trying to reset UI by editing DOM directly.
- Resetting only one related state and leaving others stale.

## Quick Rule

When the UI must restart, restore the initial state shape first.
