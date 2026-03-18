# Hooks Basics

Hooks are React functions that let function components use state and lifecycle-related logic.

## What Is a Hook?

A Hook is a function provided by React, usually named with the `use` prefix.

Examples:

- `useState`
- `useEffect`
- `useMemo`
- `useRef`

## Why Hooks Matter

- Reuse logic across components
- Keep components as functions
- Organize stateful behavior in a cleaner way

## Rules of Hooks

1. Call Hooks only at the top level of a component (not inside loops/conditions).
2. Call Hooks only from React components or custom hooks.

## `useState` (Most Common First Hook)

```jsx
const [count, setCount] = useState(0);
```

- `count`: current state value
- `setCount`: state update function

## `useEffect` (Basic Idea)

`useEffect` runs side effects after render (for example: API calls, subscriptions, timers).

```jsx
useEffect(() => {
  console.log("Component rendered");
}, []);
```

The dependency array controls when the effect runs.

## Custom Hooks (Preview)

When logic is repeated, you can extract it into your own hook:

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((prev) => !prev);
  return { value, toggle };
}
```

## Common Mistakes

- Calling hooks inside `if` or `for`
- Forgetting dependency behavior in `useEffect`
- Confusing hook state updates with immediate synchronous changes
