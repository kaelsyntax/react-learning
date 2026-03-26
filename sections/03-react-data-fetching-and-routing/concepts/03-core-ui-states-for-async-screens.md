# Core UI States for Async Screens

## Goal

Model UI states clearly during async requests so users always understand what is happening.

## Core Idea

Fetching data is not just about getting a response. The UI must represent each phase of the request lifecycle.

For most data-driven screens, these are the core states:

1. Initial / Idle: no request yet
2. Loading: request in progress
3. Error: request failed
4. Empty: request succeeded but no useful data
5. Success: valid data available

These states should be mutually exclusive in the UI whenever possible.

## Key Principle

Each async UI should have explicit state rendering rules.  
Avoid ambiguous screens where users cannot tell if data is loading, broken, or empty.

## Data Flow

Initial render -> no search yet -> search starts -> `isLoading` true -> request resolves -> set success data or error -> UI renders the matching state block.

## Example

```jsx
function UserResult({ user, isLoading, error, hasSearched }) {
  if (isLoading) return <p>Loading user...</p>
  if (error) return <p role="alert">Error: {error}</p>
  if (!hasSearched) return <p>Type a username and press Search.</p>
  if (!user) return <p>No user found.</p>

  return (
    <article>
      <h2>{user.login}</h2>
      <p>{user.bio ?? 'No bio available'}</p>
    </article>
  )
}
```

## Why This Pattern Is Useful

- Better UX clarity during network delays
- Less confusion when request returns no data
- Cleaner conditional rendering logic
- Easier testing and debugging

## Common Mistakes

- Showing stale success data while loading a new query
- Treating `null` data and error as the same UI state
- Forgetting an initial state (`hasSearched`) for first render
- Hiding all feedback behind one generic message

## Quick Self-Check

- Do you render initial, loading, error, empty, and success explicitly?
- Can users distinguish first-load state from no-results state?
- Do you reset or handle stale UI when a new request starts?
- Is error feedback visible and specific enough?
