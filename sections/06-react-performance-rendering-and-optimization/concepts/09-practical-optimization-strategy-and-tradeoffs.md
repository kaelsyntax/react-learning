# Practical Optimization Strategy and Tradeoffs

## Goal

Learn a practical decision process for React optimization and understand tradeoffs before applying performance techniques.

## Core Idea

Every optimization has a cost.

You can gain better runtime performance, but also increase code complexity, maintenance cost, and cognitive load.

The right strategy is to optimize only the measured bottleneck that impacts user experience.

Sometimes the simplest solution is already fast enough.

## Key Principle

Prioritize high-impact fixes with low complexity, and avoid blanket optimizations.

## Example

```jsx
import { useEffect, useState } from 'react'

function SearchPage({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timerId)
  }, [query, onSearch])

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search titles"
    />
  )
}
```

Tradeoff example:

- Benefit: fewer requests and smoother typing flow.
- Cost: delayed feedback and slightly more logic complexity.

## Data Flow

User reports or profiler identifies slow path -> validate root cause -> choose smallest optimization that fixes it -> measure before/after -> keep or revert based on real impact.

## Why This Pattern Is Useful

- Prevents overengineering.
- Keeps performance work aligned with user impact.
- Improves maintainability while still solving real bottlenecks.
- Builds repeatable optimization decision-making habits.

## Common Mistakes

- Optimizing everything "just in case".
- Treating memoization tools as default architecture.
- Ignoring readability and maintenance tradeoffs.
- Keeping optimizations that show no measurable improvement.

## Quick Self-Check

- Did I identify a real bottleneck first?
- What is the tradeoff of this optimization?
- Is the performance gain worth the added complexity?
- Did I measure before and after to confirm value?
