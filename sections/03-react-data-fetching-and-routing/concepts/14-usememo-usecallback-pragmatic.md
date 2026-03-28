# useMemo and useCallback (Pragmatic Usage)

## Goal

Use `useMemo` and `useCallback` only where they provide clear value, not by default.

## Core Idea

`useMemo` memoizes computed values.  
`useCallback` memoizes function references.

They are performance tools, not correctness tools.

## Key Principle

`useCallback` and `useMemo` do not prevent renders.  
They stabilize references and avoid unnecessary recalculations when needed.

## Note

Most components do not need memoization. Optimize only when there is a real performance concern.

## Data Flow

State changes -> component renders -> memoized value/function is reused if dependencies did not change -> heavy recomputation or child re-render pressure can be reduced.

## Example

```jsx
import { useMemo, useCallback, useState } from 'react'

function UserList({ users, onSelect }) {
  const [query, setQuery] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.login.toLowerCase().includes(query.toLowerCase())
    )
  }, [users, query])

  const handleSelect = useCallback(
    (username) => {
      onSelect(username)
    },
    [onSelect]
  )

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredUsers.map((user) => (
        <button key={user.id} onClick={() => handleSelect(user.login)}>
          {user.login}
        </button>
      ))}
    </>
  )
}
```

## Why This Pattern Is Useful

- Avoids expensive recalculations in hot render paths
- Helps memoized child components receive stable props
- Improves performance in large lists or heavy computations
- Encourages intentional optimization

## Common Mistakes

- Wrapping everything in `useMemo`/`useCallback` without measuring
- Expecting these hooks to stop parent renders
- Using incomplete dependency arrays
- Adding complexity where there is no real performance issue

## Quick Self-Check

- Is there a measurable bottleneck?
- Is my computation expensive enough to memoize?
- Do I need stable function identity for a memoized child?
- Does this optimization improve clarity or only add noise?
