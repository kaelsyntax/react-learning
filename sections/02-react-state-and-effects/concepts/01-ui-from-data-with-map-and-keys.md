# UI from Data with `map()` and Keys

## Goal

Render repeated UI from data instead of hardcoding repeated JSX blocks.

## Why It Matters

In React, UI is usually described from data structures. For repetitive pieces, `map()` keeps code shorter, clearer, and easier to scale.

## Example Context (Board UI)

```jsx
function App() {
  const squares = Array(9).fill(null)

  return (
    <section className="board">
      {squares.map((square, index) => (
        <button key={index} className="square">
          {square}
        </button>
      ))}
    </section>
  )
}
```

## What Is Happening

- `Array(9).fill(null)` creates the data source for the 9 cells.
- `.map(...)` transforms each item into one `<button />`.
- `key={index}` gives React an identity for each square.

## Key Notes

- For static/fixed lists like a 3x3 board, index as key is acceptable.
- For dynamic lists (insert/delete/reorder), prefer stable IDs over index keys.
- Keep rendering declarative: data first, UI second.

## Immutability Note

`Array(9).fill(null)` is a valid way to initialize data.

The important rule in React is to avoid mutating state directly. When updating state later, create a new array copy before applying changes.

## Data -> UI Flow

Data (`squares`) -> `.map()` -> JSX elements (`<button />`) -> rendered UI in the DOM.

## Fragment Note

If each `map()` iteration needs to return multiple sibling elements, wrap them in a fragment with a key:

```jsx
<React.Fragment key={id}>
  <span>{label}</span>
  <button>Action</button>
</React.Fragment>
```

## Common Mistakes

- Manually writing 9 buttons instead of mapping from data.
- Forgetting the `key` prop in mapped elements.
- Using index keys in dynamic lists where order can change.

## Quick Practice

- Change board size from 9 to 16 and see how UI scales automatically.
- Replace `null` with demo values (`"X"`, `"O"`) to verify rendering.
