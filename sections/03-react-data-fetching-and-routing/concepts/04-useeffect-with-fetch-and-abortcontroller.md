# useEffect with Fetch and AbortController

## Goal

Prevent stale requests and unsafe updates when fetching data in `useEffect`.

## Core Idea

When a dependency changes (for example, a username), React re-runs the effect.  
If the previous request is still in flight, it can resolve late and override newer data.

`AbortController` lets you cancel the previous request during cleanup.

## Key Principle

Every effect that starts an async request should define a cleanup strategy.

For `fetch`, that strategy is usually: create an `AbortController`, pass `signal`, and call `abort()` in cleanup.

## Data Flow

Dependency changes -> effect starts -> create controller -> fetch with `signal` -> dependency changes/unmount -> cleanup aborts previous request -> only the latest valid request should update UI state.

## Example

```jsx
useEffect(() => {
  if (!username) return

  const controller = new AbortController()
  const signal = controller.signal

  async function fetchUser() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal
      })

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

  return () => {
    controller.abort()
  }
}, [username])
```

## Note

Aborted requests still enter `finally`, so loading coordination may need extra care in more advanced flows.

## Why This Pattern Is Useful

- Avoids race conditions between old and new requests
- Prevents stale responses from overriding fresh state
- Makes effect lifecycle explicit and safer
- Reduces noisy errors when components unmount

## Common Mistakes

- Starting fetch in `useEffect` without cleanup
- Forgetting to pass `signal` to `fetch`
- Treating `AbortError` as a real user-facing error
- Updating state for old requests after dependency changes

## Quick Self-Check

- Do you create a new `AbortController` inside the effect?
- Do you pass `signal` into `fetch`?
- Do you call `controller.abort()` in cleanup?
- Do you ignore `AbortError` in `catch`?
