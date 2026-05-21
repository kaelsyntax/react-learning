# React Rendering Mental Model

## Goal

Understand what triggers renders in React and how to distinguish expected re-renders from performance issues.

## Core Idea

Renders are normal and necessary in React.

Not every re-render is a performance problem.

The real problem is unnecessary or too frequent re-renders that do not improve visible UI.

Rendering components and updating the DOM are different steps.

A re-render means React re-executes component functions to produce a new UI description.

This does not automatically mean the real DOM changes.

## Key Principle

Measure first, optimize second.

## Example

```jsx
import { useState } from 'react'

function Parent() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Count: {count}</p>
      <Child label="Static label" />
    </section>
  )
}

function Child({ label }) {
  console.log('Child rendered')
  return <p>{label}</p>
}
```

Even if Child receives the same primitive prop, React may still re-execute Child when its parent renders again.

A re-render does not necessarily mean the DOM changes.

## Data Flow

User interaction updates state -> React schedules update -> component renders again -> child components may also re-render -> React commits DOM changes if output changed.

## Why This Pattern Is Useful

- Gives a clear mental model before applying memoization.
- Helps avoid premature optimization.
- Improves debugging when UI feels slow.
- Makes profiler results easier to interpret.

## Common Mistakes

- Assuming every re-render is bad.
- Optimizing without measuring bottlenecks first.
- Confusing React development behavior (`StrictMode`) with production behavior.
- Recreating objects/functions every render without understanding impact.

## Quick Self-Check

- Can I explain what usually triggers a re-render in React?
- Can I separate normal re-renders from unnecessary ones?
- Do I know when I should profile before optimizing?
- Can I explain the difference between component rendering and DOM updates?
