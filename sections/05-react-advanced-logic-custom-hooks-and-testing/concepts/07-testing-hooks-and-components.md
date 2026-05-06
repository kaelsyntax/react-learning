# Testing Hooks and Components

## Goal

Understand what to test in hooks and components, and how testing helps prevent regressions.

## Core Idea

Hooks and components have different responsibilities, so they should be tested with different focus.

- Hook tests validate behavior logic (state transitions, async states, returned API).
- Component tests validate user-visible behavior (rendering, interactions, and feedback).

## Key Principle

Test behavior and outcomes, not implementation details.

## Example

```jsx
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react'
import { useCounter } from './useCounter'
import { CounterView } from './CounterView'

test('useCounter increments value', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})

test('CounterView shows updated count after click', () => {
  render(<CounterView />)

  fireEvent.click(screen.getByRole('button', { name: /increment/i }))

  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

## Data Flow

Define expected behavior -> test hook logic in isolation -> test user interactions in components -> validate expected outcomes.

## Why This Pattern Is Useful

- Catches logic bugs before they reach UI.
- Protects critical user flows during refactors.
- Improves confidence when changing hook internals.
- Encourages better separation between logic and presentation.

## Common Mistakes

- Testing internal variables instead of public behavior.
- Writing brittle tests tied to implementation details.
- Testing only hooks or only components, but not both.
- Ignoring error, loading, and edge-case scenarios.

## Quick Self-Check

- Did I test hook behavior through its returned API?
- Did I test component behavior from the user perspective?
- Are my assertions based on outcomes, not internals?
- Do tests cover at least one happy path and one edge case?
