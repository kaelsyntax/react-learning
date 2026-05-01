# When to Create a Custom Hook

## Goal

Understand when it is actually useful to create a custom hook and avoid unnecessary abstractions.

## Core Idea

Custom hooks should not be created all the time. They should only be created when they add real value to the code.

## Key Principle

Create a custom hook when it improves the code, not just because you can.

## Example

```jsx
// Logic repeated across components → extract into a custom hook
import { useState } from 'react'

function useSearch() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return { query, setQuery, isLoading, setIsLoading }
}
```

## Data Flow

Duplicated or complex logic appears → evaluate its reuse value → extract into a custom hook → components consume a cleaner API.

## When This Pattern Is Useful

- When you have duplicated logic across multiple components.
- When the logic is complex and affects readability.
- When you want to reuse behavior in different places.
- When separating logic from UI makes the component cleaner.

The goal is not abstraction for its own sake, but to improve clarity and maintainability.

## Common Mistakes

- Creating hooks when the logic is very simple.
- Extracting logic used only once without clear benefit.
- Adding abstraction that increases complexity instead of reducing it.
- Overusing custom hooks and making code harder to follow.

## Quick Self-Check

- Am I solving a real problem?
- Will this make the code easier to read?
- Will I reuse this logic?
