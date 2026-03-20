# Pure Helpers and Static Constants

## Goal

Keep component code clean by extracting deterministic logic and static data.

## Core Idea

- Pure helper function: same input -> same output, no side effects.
- Static constants: fixed data that does not depend on render state.

## Example

```jsx
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
```

## Why This Helps

- Components stay focused on rendering and state transitions.
- Logic becomes easier to test.
- Improves readability and maintenance.

## Common Mistakes

- Defining large static constants inside the component unnecessarily.
- Mixing side effects inside helper logic.
