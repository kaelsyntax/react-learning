# Identifying Performance Bottlenecks

## Goal

Learn how to detect real performance bottlenecks in React applications before applying optimization techniques.

## Core Idea

Performance bottlenecks are parts of the UI that feel slow under real interactions.

Not every re-render is a bottleneck.

The most common sources are expensive calculations, unnecessary re-renders, heavy component trees, and uncontrolled async updates.

You should identify the slow area first, then optimize only what is actually expensive.

## Key Principle

Do not optimize assumptions. Optimize measured bottlenecks.

## Example

```jsx
import { useState } from 'react'

function ProductList({ products }) {
  const [query, setQuery] = useState('')

  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />

      <ul>
        {filtered.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </section>
  )
}
```

Possible optimizations after measuring:

- Debounce input updates
- Memoize expensive derived data
- Reduce rendered items
- Apply pagination or virtualization

If typing feels slow, the bottleneck may be in filtering cost, rendering too many list items, or both.

## Data Flow

User interaction triggers state update -> component re-renders -> derived data recalculates -> children render -> UI response becomes fast or slow depending on the workload.

## Why This Pattern Is Useful

- Prevents random or premature optimizations.
- Focuses effort on the real slow path.
- Improves user-perceived speed with fewer code changes.
- Helps prioritize high-impact fixes first.

## Common Mistakes

- Optimizing because code "looks expensive" without measuring.
- Adding memoization everywhere by default.
- Ignoring list size and render depth in large UIs.
- Treating every re-render as a bug.

## Quick Self-Check

- Did I identify where slowness happens from the user perspective?
- Can I point to the specific component or calculation causing delay?
- Did I validate the bottleneck before and after changes?
- Did I optimize only the expensive path?
- Can I explain why something is slow instead of guessing?
