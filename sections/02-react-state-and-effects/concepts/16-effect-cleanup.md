# Effect Cleanup

## Goal

Prevent leaks and unexpected behavior by cleaning up persistent effect resources.

## Core Idea

If an effect creates something that remains active (listener, timer, subscription), return a cleanup function.

## Example

```jsx
useEffect(() => {
  const id = setInterval(() => {
    // polling or periodic task
  }, 1000)

  return () => {
    clearInterval(id)
  }
}, [])
```

## Why Cleanup Matters

- Avoids duplicate listeners/timers.
- Prevents memory leaks.
- Keeps behavior stable across re-renders and unmounts.

## Common Mistakes

- Forgetting to return cleanup.
- Cleaning with the wrong reference.
- Assuming cleanup is optional for persistent resources.
