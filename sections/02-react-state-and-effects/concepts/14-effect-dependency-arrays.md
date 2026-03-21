# Effect Dependency Arrays

## Goal

Control when an effect runs again.

## Core Idea

The dependency array tells React when to re-run an effect.

## Common Patterns

```jsx
useEffect(() => {
  // runs after every render
})

useEffect(() => {
  // runs once on mount
}, [])

useEffect(() => {
  // runs when squares changes
}, [squares])
```

## Why It Matters

- Prevents unnecessary effect runs.
- Avoids stale data issues.
- Makes effect behavior explicit.

## Common Mistakes

- Missing dependencies used inside the effect.
- Adding unstable values that cause repeated re-runs.
