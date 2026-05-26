# React Profiling Fundamentals

## Goal

Learn how to use React DevTools Profiler to measure render cost and detect real performance bottlenecks.

## Core Idea

The Profiler records how long React takes to render components during real interactions.

Instead of guessing, you can inspect commits, render duration, and component update patterns.

This helps you optimize based on evidence, not assumptions.

The React Profiler measures React rendering activity, not every browser performance issue.

## Key Principle

Profile first, then optimize the slow path.

## Example

```jsx
import { useState } from 'react'

function SearchPanel({ products }) {
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

Profile flow:

- Open React DevTools -> Profiler
- Start recording
- Type quickly in the search input
- Stop recording and inspect commits with highest duration
- Identify which components rendered and why

## Data Flow

User interacts with UI -> React updates state -> Profiler records commit data -> you inspect render duration and updated components -> you choose targeted optimizations.

## Why This Pattern Is Useful

- Reveals real slow interactions from user flows.
- Shows where render time is spent in the component tree.
- Prevents unnecessary optimizations in non-critical areas.
- Makes before/after performance comparisons objective.

## Common Mistakes

- Profiling once and assuming results are final.
- Testing unrealistic interactions that users never do.
- Optimizing components with low cost while ignoring expensive commits.
- Adding memoization without validating impact in a second profile run.

## Quick Self-Check

- Can I record a user flow and read commit durations?
- Can I identify which component updates are expensive?
- Did I compare before/after profiling after an optimization?
- Did I optimize the bottleneck instead of random components?
