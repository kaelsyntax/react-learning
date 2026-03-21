# useEffect as a Synchronization Tool

## Goal

Understand why side effects exist and how `useEffect` connects React state with systems outside React.

## Core Idea

`useEffect` is used to synchronize React with external systems such as:

- `localStorage`
- browser APIs
- timers
- network requests

## Example

```jsx
useEffect(() => {
  localStorage.setItem('board', JSON.stringify(squares))
}, [squares])
```

## Why This Matters

- Keeps rendering pure.
- Runs synchronization after render.
- Centralizes side-effect logic.

## Common Mistake

Putting external synchronization logic directly inside render flow.

