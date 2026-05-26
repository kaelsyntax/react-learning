# Input Performance: Debounce and Throttle

## Goal

Understand how debounce and throttle improve input-driven performance and reduce unnecessary updates in React apps.

## Core Idea

Input events can fire very frequently (typing, scrolling, resizing).

Without control, these events can trigger too many re-renders, calculations, or network requests.

Debounce and throttle are timing strategies that limit how often expensive logic runs.

## Key Principle

Control event frequency based on user intent and interaction type.

## Example

```jsx
import { useEffect, useState } from 'react'

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(query)
    }, 350)

    return () => clearTimeout(timerId)
  }, [query, onSearch])

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search products"
    />
  )
}
```

In this example, debounce waits until the user pauses typing before running search.

Throttle is more useful for continuous interactions like scroll, resize, or mouse movement where updates should happen at a controlled frequency.

## Data Flow

User types rapidly -> input state updates immediately -> debounce delays side effect -> previous timer clears if user keeps typing -> search runs only after inactivity window.

## Why This Pattern Is Useful

- Reduces unnecessary API requests during fast typing.
- Improves perceived responsiveness in search interfaces.
- Lowers render pressure from event-heavy interactions.
- Helps keep UI and network behavior predictable.

## Common Mistakes

- Debouncing state updates that should feel instant in UI.
- Using throttle for text search when debounce is usually better.
- Forgetting cleanup for timers in effects.
- Applying timing utilities without measuring actual bottlenecks.

## Quick Self-Check

- Did I choose debounce or throttle based on interaction type?
- Is the delay value reasonable for UX?
- Are timer cleanups implemented correctly?
- Did this actually reduce unnecessary updates or requests?
