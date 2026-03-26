# Derived UI State vs Stored State

## Goal

Decide what should be stored in React state and what should be computed from existing state.

## Core Idea

Not every value in the UI needs its own `useState`.

If a value can be calculated from current state on each render, it is derived state and should usually not be stored separately.

## Key Principle

Store source-of-truth state.  
Derive presentation state.

This keeps state smaller and avoids contradictions between duplicated values.

Derived state should be recalculated on every render instead of persisted.

## Data Flow

Source state updates (`user`, `loading`, `error`) -> render runs -> derived flags are recalculated -> UI shows the correct branch.

## Note

Some values like `hasSearched` can also be derived depending on how state is modeled.

## Example

```jsx
function UserPanel({ user, loading, error, hasSearched }) {
  const isIdle = !hasSearched && !loading && !error
  const isEmpty = hasSearched && !loading && !error && !user
  const isSuccess = Boolean(user) && !loading && !error

  if (loading) return <p>Loading...</p>
  if (error) return <p role="alert">Error: {error}</p>
  if (isIdle) return <p>Type a username and press Search.</p>
  if (isEmpty) return <p>No user found.</p>
  if (isSuccess) return <p>{user.login}</p>

  return null
}
```

## Why This Pattern Is Useful

- Reduces unnecessary `useState` variables
- Prevents out-of-sync UI flags
- Makes rendering logic easier to reason about
- Improves maintainability as the screen grows

## Common Mistakes

- Storing `isSuccess` in state while `user` already implies success
- Storing `isEmpty` separately and forgetting to update it
- Creating many boolean states that can conflict
- Duplicating derived values across multiple components

## Quick Self-Check

- Is this value true source data or just a UI interpretation?
- Can this value be computed from existing state every render?
- Would storing it create a risk of inconsistency?
- Can I remove one `useState` by deriving the value instead?
