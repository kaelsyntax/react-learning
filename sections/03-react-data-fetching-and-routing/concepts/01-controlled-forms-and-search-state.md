# Controlled Forms and Search State

## Goal

Understand how to manage form input with React state and pass validated search data to a parent component.

## Core Idea

A controlled input is an input whose value is fully managed by React state.

This means:

- The input `value` comes from state.
- The input updates through `onChange` and `setState`.
- The DOM is no longer the source of truth - React state is.

For search flows, a common pattern is:

1. Keep temporary input state in the form component.
2. On submit, validate and normalize (`trim`).
3. Send the final value upward via callback (`onSearch`).

## Data Flow

User types -> local state updates -> form submits -> parent receives final value -> app reacts (for example, fetch).

## Why This Pattern Is Useful

- Predictable input behavior
- Easy validation before submit
- Clear data flow: child emits action, parent owns final search state

## Example

```jsx
import { useState } from 'react'

function SearchForm({ onSearch }) {
  const [search, setSearch] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmed = search.trim()
    if (!trimmed) return

    onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search GitHub username..."
      />
      <button type="submit">Search</button>
    </form>
  )
}
```

Parent receives final state:

```jsx
const [username, setUsername] = useState('')

function handleSearch(value) {
  setUsername(value)
}

<SearchForm onSearch={handleSearch} />
```

## Common Mistakes

- Using input without `value` + `onChange` (uncontrolled by accident)
- Forgetting `preventDefault()` in submit
- Sending raw input without trimming
- Storing duplicated search state in both parent and child without a clear reason

## Quick Self-Check

- Is your input controlled by state?
- Are you preventing default form reload?
- Are you validating empty/whitespace values?
- Does the parent receive only the final cleaned value?
