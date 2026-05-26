# Stable Callbacks with useCallback

## Goal

Understand how `useCallback` helps keep function references stable and when that improves performance.

## Core Idea

`useCallback` preserves the same function reference between renders until dependencies change.

This is useful when function identity matters, especially with memoized children (`React.memo`) or effect dependencies.

`useCallback` does not make code automatically faster. It is useful only when unstable function references cause extra work.

## Key Principle

Stabilize callbacks only when reference changes create real rendering or effect costs.

## Example

```jsx
import { memo, useCallback, useState } from 'react'

function CatalogPage({ products }) {
  const [query, setQuery] = useState('')

  const handleSelect = useCallback((id) => {
    console.log('Selected product id:', id)
  }, [])

  return (
    <section>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />
      <ProductList products={products} onSelect={handleSelect} />
    </section>
  )
}

const ProductList = memo(function ProductList({ products, onSelect }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.id)}>{product.title}</button>
        </li>
      ))}
    </ul>
  )
})
```

If `handleSelect` is recreated on every render, a memoized child can still re-render because the function prop reference changed.

## Data Flow

Parent state updates -> parent re-renders -> `useCallback` returns same function reference if dependencies are unchanged -> memoized children can skip re-render when other props are also unchanged.

## Why This Pattern Is Useful

- Reduces unnecessary re-renders in memoized child trees.
- Prevents effect re-runs caused only by unstable function references.
- Improves predictability when passing handlers deeply.
- Complements `React.memo` and `useMemo` in performance-sensitive flows.

## Common Mistakes

- Using `useCallback` for every handler by default.
- Forgetting dependencies and creating stale closures.
- Expecting gains when children are not memoized.
- Confusing callback stability with business-logic correctness.

## Quick Self-Check

- Is function reference stability relevant in this path?
- Did unstable callbacks cause measurable extra renders or effect runs?
- Are dependencies complete and correct?
- Did profiling confirm improvement after adding `useCallback`?
