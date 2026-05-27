# useRef Fundamentals

## Goal

Understand what `useRef` is, when to use it, and how it differs from state.

## Core Idea

`useRef` stores a mutable value that persists across renders without triggering a re-render when updated.

It is commonly used for:

- accessing DOM elements directly
- storing timer IDs
- storing previous values
- keeping mutable values that should not affect UI rendering

## Key Difference vs State

- `useState`: updating value triggers re-render
- `useRef`: updating `.current` does not trigger re-render

Use state for data that drives UI.
Use ref for mutable values that should survive renders but should not redraw UI.

## Example

```jsx
import { useEffect, useRef, useState } from 'react'

function SearchInput() {
  const inputRef = useRef(null)
  const previousQueryRef = useRef('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    previousQueryRef.current = query
  }, [query])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <section>
      <input
        ref={inputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type..."
      />
      <button onClick={focusInput}>Focus input</button>
      <p>Current: {query}</p>
      <p>Previous: {previousQueryRef.current}</p>
    </section>
  )
}
```

## Data Flow

Component renders -> refs keep stable object identity -> `.current` can be read or updated without causing render -> UI updates only when state/props/context changes.

## Why This Pattern Is Useful

- Enables imperative DOM control when needed (focus, scroll, media).
- Avoids unnecessary re-renders for non-visual mutable data.
- Helps track previous values between renders.
- Useful for managing timers and external handles safely.

## Common Mistakes

- Using refs for values that should be rendered in UI.
- Expecting ref updates to trigger re-render.
- Overusing imperative logic instead of declarative state flow.
- Forgetting cleanup for timers or external resources stored in refs.

## Quick Self-Check

- Am I using ref only for non-rendering mutable values or DOM access?
- Should this value be state instead because it affects UI output?
- Do I understand that updating `.current` will not re-render?
- Is there any cleanup required for values stored in the ref?
