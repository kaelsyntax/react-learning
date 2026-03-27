# Custom Hooks Basics: `useFetch`

## Goal

Extract repeated fetch logic from components into a reusable custom hook.

## Core Idea

A custom hook is a regular function that uses React hooks and starts with `use`.

Instead of keeping fetch lifecycle logic inside `App`, we move it to a hook (`useFetchUser`) and keep the component focused on UI rendering.

Custom hooks allow sharing stateful logic without sharing UI.

## Key Principle

Components should describe UI.  
Hooks should encapsulate reusable stateful logic.

## Data Flow

Component passes input (`username`) -> custom hook runs effect -> hook manages `isLoading`, `error`, `user` -> component consumes returned state and renders UI.

## Example

```jsx
// hooks/useFetchUser.js
import { useEffect, useState } from 'react'

export function useFetchUser(username) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const controller = new AbortController()
    const { signal } = controller

    async function fetchUser() {
      setIsLoading(true)
      setError(null)
      setUser(null)

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}`,
          { signal }
        )

        if (!response.ok) throw new Error('User not found')

        const data = await response.json()
        setUser(data)
      } catch (err) {
        if (err.name === 'AbortError') return

        setUser(null)
        setError(err.message)
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()

    return () => controller.abort()
  }, [username])

  return { user, isLoading, error }
}
```

```jsx
// App.jsx
const { user, isLoading, error } = useFetchUser(username)
```

## Why This Pattern Is Useful

- Keeps components smaller and easier to read
- Makes fetch logic reusable in other components
- Improves testability of logic boundaries
- Reduces duplication and inconsistent behavior

## Common Mistakes

- Naming the function without `use` prefix
- Mixing UI concerns inside the hook (JSX rendering)
- Returning too many unrelated values
- Forgetting cleanup for async requests

## Quick Self-Check

- Does the hook name start with `use`?
- Does the hook own fetch state (`isLoading`, `error`, data)?
- Is cleanup handled for in-flight requests?
- Is the component simpler after extracting logic?
- Is the hook reusable without modification?
