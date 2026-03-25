# Fetch Lifecycle with useEffect

## Goal

Understand how to run a fetch when search state changes and model the request lifecycle in React state.

## Core Idea

`useEffect` is used to synchronize your component with external systems, such as HTTP APIs.

In a search app, the common lifecycle is:

1. Idle (no request yet)
2. Loading (request in progress)
3. Success (data received)
4. Error (request failed)

React does not manage this lifecycle automatically. You model it with state.

## Key Principle

Rendering should stay pure. Fetching is a side effect, so it belongs in `useEffect`.

## Data Flow

User submits username -> parent `username` state updates -> effect runs -> request starts -> state changes to loading -> response updates success/error state -> UI re-renders.

## Example

```jsx
import { useEffect, useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    async function fetchUser() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
          throw new Error('User not found')
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        setUser(null)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [username])
}
```

The effect reacts to `username`, not to every keystroke in the input.

## Why This Pattern Is Useful

- Clear separation between user action and side effects
- Predictable UI updates for loading/success/error
- Easy to extend with abort, caching, and retries

## Common Mistakes

- Running fetch on every render (missing dependency array)
- Forgetting to reset `error` before a new request
- Treating HTTP errors as success (not checking `response.ok`)
- Mixing form state and request state without clear boundaries

## Quick Self-Check

- Are you running fetch inside `useEffect` with correct dependencies?
- Do you model at least `isLoading`, `error`, and data state?
- Are you checking `response.ok` before reading success data?
- Does your UI react correctly to each lifecycle step?
