# Derived Data Optimization with useMemo

## Goal

Understand how `useMemo` can optimize expensive derived data calculations and when it should be applied.

## Core Idea

`useMemo` caches the result of a calculation between renders until its dependencies change.

It is useful for expensive derived data like filtering, sorting, grouping, or aggregating large collections.

`useMemo` is not for every value. It should be used when recalculation cost is meaningful.

## Key Principle

Memoize expensive calculations, not everything.

## Example

```jsx
import { useMemo, useState } from 'react'

function ProductExplorer({ products }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('price')

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    )

    return filtered.toSorted((a, b) => a[sortBy] - b[sortBy])
  }, [products, query, sortBy])

  return (
    <section>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />

      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </section>
  )
}
```

Without `useMemo`, filtering and sorting run on every render, even when unrelated state changes.

This matters mostly when calculations become expensive or run frequently.

## Data Flow

State changes -> component re-renders -> `useMemo` checks dependencies -> calculation runs only when dependencies changed -> cached result reused otherwise.

## Why This Pattern Is Useful

- Reduces repeated expensive calculations.
- Improves responsiveness in search/filter interfaces.
- Helps stabilize derived data passed to child components.
- Works well with `React.memo` in render-heavy trees.

## Common Mistakes

- Using `useMemo` for cheap calculations.
- Forgetting dependencies and getting stale results.
- Adding memoization before measuring bottlenecks.
- Assuming `useMemo` always improves performance.

## Quick Self-Check

- Is this calculation expensive enough to memoize?
- Are dependency values correct and complete?
- Did profiling show a real improvement after adding `useMemo`?
- Am I using `useMemo` for derived data, not as a default habit?
