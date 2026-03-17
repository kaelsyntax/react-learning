# Virtual DOM and Re-render Basics

React uses a Virtual DOM to decide how to update the real DOM efficiently.

## What Is the Virtual DOM?

The Virtual DOM is a lightweight JavaScript representation of the UI.

When state or props change, React creates a new virtual tree, compares it with the previous one (diff), and applies only the necessary changes to the real DOM.

## Why It Helps

- Less manual DOM work
- Predictable UI updates
- Better developer experience for complex interfaces

Important: Virtual DOM is not "always faster" in every case, but it usually makes UI updates simpler and more consistent.

## What Is a Re-render?

A re-render means React runs the component function again to compute updated UI output.

It does not always mean full real-DOM replacement. React updates only what changed.

## Common Reasons a Component Re-renders

1. State updates (`useState`, `useReducer`)
2. Parent component re-renders
3. Props change
4. Context value changes (if the component consumes that context)

## Simple Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Count: {count}
    </button>
  );
}
```

Clicking the button updates state, so the component re-renders with the new value.

## Notes for Beginners

- Re-rendering is normal in React.
- Focus first on correctness and clear code.
- Optimize performance only when you detect real bottlenecks.
