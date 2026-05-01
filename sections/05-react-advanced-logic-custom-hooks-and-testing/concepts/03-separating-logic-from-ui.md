# Separating Logic from UI

## Goal

Understand why separating logic from UI is important in React and how it improves code structure.

## Core Idea

In React, logic and UI are often mixed inside the same component.

Separating them means extracting logic (state, effects, calculations) into custom hooks, while keeping the component focused only on rendering the UI.

## Key Principle

Keep components responsible for UI, and move logic into reusable hooks.

## Example

```jsx
import { useState } from 'react'

// Logic separated into a custom hook
function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // fetch logic...

  return { query, setQuery, results }
}

// Component focuses only on UI
function SearchComponent() {
  const { query, setQuery, results } = useSearch()

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{/* render results */}</ul>
    </div>
  )
}
```

## Data Flow

Component → calls custom hook → hook handles logic and state → returns values → component renders UI.

## Why This Pattern Is Useful

- Keeps components clean and focused on UI.
- Makes logic reusable across different components.
- Improves readability and maintainability.
- Makes testing easier.

## Common Mistakes

- Keeping too much logic inside components.
- Mixing UI and logic unnecessarily.
- Creating hooks without real need.

## Quick Self-Check

- Is my component doing too much?
- Can this logic be reused?
- Would separating this improve readability?
