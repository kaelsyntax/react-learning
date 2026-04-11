# Context Fundamentals and Provider Pattern

## Goal

Understand how React Context shares state and actions across component trees, and how the Provider pattern defines scope.

## Core Idea

Context lets you expose shared values without passing props through every intermediate component.

The Provider pattern is the mechanism that makes this work:

- create a context (`createContext`)
- place a provider at the correct tree level
- consume values from descendants

## Key Principle

Context should hold shared state with clear ownership and a defined scope.

Do not use Context just to avoid every prop; use it when multiple distant components need the same source of truth.

Provider values should stay intentional. Do not dump unrelated values into one context.

## Example Provider Pattern

```jsx
import { createContext, useState } from 'react'

export const FiltersContext = createContext(null)

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPriceInCents: 0
  })

  function handleCategoryChange(event) {
    setFilters((previous) => ({
      ...previous,
      category: event.target.value
    }))
  }

  function handleMinPriceChange(event) {
    setFilters((previous) => ({
      ...previous,
      minPriceInCents: Number(event.target.value)
    }))
  }

  const value = { filters, handleCategoryChange, handleMinPriceChange }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}
```

## Example Scope Placement

```jsx
<StrictMode>
  <FiltersProvider>
    <App />
  </FiltersProvider>
</StrictMode>
```

## Data Flow

Provider owns state -> provider exposes state/actions via context value -> descendants consume context -> user interaction triggers provider actions -> provider state updates -> consumers rerender with fresh values.

## Why This Pattern Is Useful

- Removes noisy prop chains for shared data
- Keeps shared state centralized and predictable
- Makes feature boundaries clearer (filters/cart/auth contexts)
- Prepares architecture for `useReducer` as complexity grows

## Common Mistakes

- Wrapping too high (global scope) when only a small subtree needs the context
- Recreating unstable provider values without need
- Using Context for purely local component state
- Forgetting to define a safe consumer pattern (custom hook guard)
- Putting unrelated state/actions into a single context value.

## Quick Self-Check

- Who owns this shared state and why?
- Is the provider scope as small as possible while still useful?
- Do multiple distant components consume the same values/actions?
- Would plain props still be simpler for this case?
