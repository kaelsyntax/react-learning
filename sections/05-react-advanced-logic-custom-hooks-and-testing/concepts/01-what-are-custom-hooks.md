# What Are Custom Hooks

## Goal

Understand what custom hooks are and be able to use them in real situations.

## Core Idea

Custom Hooks are reusable logic in React.

They are functions that can contain React hooks, state, effects, and any kind of logic.

Encapsulate reusable logic into a function that can be shared across multiple components.

Their main purpose is to avoid repeating code and to separate logic from UI, making components cleaner and easier to maintain.

## Key Principle

Separate logic from UI to improve readability and maintainability.

## Example

```jsx
import { useState } from 'react'

function useSomething() {
  const [state, setState] = useState(null)

  // logic

  return { state, setState }
}
```

## Data Flow

The component calls the custom hook → the hook manages state and logic → returns values/functions → the component consumes them in the UI.

## Why This Pattern Is Useful

- Avoids repeating logic across components.
- Makes code easier to maintain.
- Improves organization and readability.

## Common Mistakes

- Making hooks too specific instead of reusable.
- Using unclear or overly specific names (e.g. "useReduxFetch" instead of "useFetch").

## Quick Self-Check

- Do I understand what a custom hook is?
- Can I explain it without looking at notes?
- Can I create a simple one from scratch?
