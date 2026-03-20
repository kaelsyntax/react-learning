# localStorage JSON Serialization and Lazy State Initialization

## Goal

Persist complex state correctly and initialize it efficiently.

## Core Ideas

- `localStorage` stores strings only.
- Use `JSON.stringify` to save non-string data.
- Use `JSON.parse` to recover original structures.
- Use lazy `useState` initialization to avoid repeated work on every render.

## Save and Read Example

```jsx
localStorage.setItem('board', JSON.stringify(squares))

const savedBoard = JSON.parse(localStorage.getItem('board'))
```

## Lazy Initialization Example

```jsx
const [squares, setSquares] = useState(() => {
  const saved = localStorage.getItem('board')
  return saved ? JSON.parse(saved) : Array(9).fill(null)
})
```

## Why This Helps

- Correctly persists arrays/objects/booleans.
- Avoids parsing and fallback logic on every render.
- Improves startup performance and keeps initialization explicit.

## Common Mistakes

- Saving objects directly without serialization.
- Calling `JSON.parse` without null checks.
- Doing expensive initialization inline instead of lazy init.
