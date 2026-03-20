# Turn Modeling with Boolean State

## Goal

Model alternating turns with minimal and clear state.

## Core Idea

A boolean can represent turns efficiently:

- `true` -> `X`
- `false` -> `O`

## Example

```jsx
const [isXTurn, setIsXTurn] = useState(true)

const currentPlayer = isXTurn ? 'X' : 'O'

function handleClick() {
  // ...update board state first
  setIsXTurn((prev) => !prev)
}
```

## Why This Works

- Keeps state small and explicit.
- Makes turn switching straightforward.
- Avoids storing duplicated derived values.

## Common Mistake

Using multiple states for the same concept (for example, both `turn` and `isXTurn`) and causing inconsistencies.

## Note

Recap concept from Section 01, applied here to game turn logic.
