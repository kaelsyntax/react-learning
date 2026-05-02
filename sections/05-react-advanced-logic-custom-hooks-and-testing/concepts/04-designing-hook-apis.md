# Designing Hook APIs

## Goal

Learn how to design custom hook APIs that are clear, predictable, and easy to consume from components.

## Core Idea

A hook API is the shape of what your hook receives and returns.

Good hook APIs make component code simple. Bad hook APIs create confusion, unnecessary coupling, and hard-to-maintain logic.

When designing a hook, think like an API designer: keep names clear, expose only what is needed, and keep behavior predictable.

## Key Principle

Design the hook for the component that will consume it, not for internal implementation details.

## Example

```jsx
import { useState } from 'react'

function useProductFilter(products) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase())

    const matchesCategory =
      category === 'all' || product.category === category

    return matchesQuery && matchesCategory
  })

  return {
    query,
    setQuery,
    category,
    setCategory,
    filteredProducts,
    hasFilters: query.length > 0 || category !== 'all',
  }
}
```

## Data Flow

Component passes source data -> hook manages state and filtering logic -> hook returns a clear API -> component renders UI with minimal logic.

## Why This Pattern Is Useful

- Makes component code easier to read.
- Reduces duplicated filtering logic.
- Creates a predictable contract between logic and UI.
- Makes refactors safer because behavior is centralized.

## Common Mistakes

- Returning too many values "just in case".
- Using ambiguous names (`data`, `value`, `state`) instead of explicit ones (`filteredProducts`, `query`).
- Exposing internal implementation details that components should not care about.
- Creating unstable return shapes that change often and break consumers.
- Mixing UI concerns inside the hook.

## Quick Self-Check

- Is the hook return shape clear at first glance?
- Are names explicit and meaningful?
- Am I exposing only what the component needs?
- If I read the component, does usage feel simple and natural?
