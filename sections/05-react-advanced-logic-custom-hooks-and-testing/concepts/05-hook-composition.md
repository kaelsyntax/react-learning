# Hook Composition

## Goal

Understand how to combine small custom hooks to build more powerful and reusable logic.

## Core Idea

Hook composition means using one custom hook inside another.

Instead of building one giant hook, split logic into focused hooks (search, filters, pagination, async state) and compose them into a higher-level hook.

## Key Principle

Compose small hooks with clear responsibilities to build scalable behavior.

## Example

```jsx
import { useState } from 'react'

function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  return { query, setQuery }
}

function useCategoryFilter(initialCategory = 'all') {
  const [category, setCategory] = useState(initialCategory)
  return { category, setCategory }
}

function useProductExplorer(products) {
  const { query, setQuery } = useSearch()
  const { category, setCategory } = useCategoryFilter()

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.title
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
  }
}
```

## Data Flow

Component provides source data -> composed hook uses smaller hooks -> each hook manages one concern -> composed hook returns unified API -> component renders with less logic.

## Why This Pattern Is Useful

- Encourages single-responsibility hooks.
- Improves reuse of logic in different features.
- Makes complex behavior easier to reason about.
- Simplifies testing by validating small hooks separately.
- Keeps component code cleaner and more declarative.

## Common Mistakes

- Creating one mega-hook instead of composing focused hooks.
- Coupling hooks too tightly so they cannot be reused independently.
- Returning an overloaded API with too many values/actions.
- Hiding too many side effects in composed hooks without clear naming.
- Introducing optimization tools too early without understanding the base flow.

## Quick Self-Check

- Did I split responsibilities clearly across hooks?
- Can each smaller hook be reused on its own?
- Is the final composed API easy for components to consume?
- Is composition reducing complexity or just moving it?
