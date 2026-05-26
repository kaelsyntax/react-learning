# Component Memoization with React.memo

## Goal

Understand how `React.memo` helps prevent unnecessary component re-renders and when it is worth using.

## Core Idea

`React.memo` wraps a component and skips re-rendering it when its props are equal to the previous render (shallow comparison).

This is useful when a parent re-renders often but a child receives the same props.

`React.memo` is not a default rule for every component. It is a targeted optimization after profiling.

## Key Principle

Use `React.memo` where it reduces real render cost, not everywhere.

## Example

```jsx
import { memo, useState } from 'react'

function CatalogPage({ products }) {
  const [count, setCount] = useState(0)

  return (
    <section>
      <button onClick={() => setCount((value) => value + 1)}>
        Count: {count}
      </button>
      <ProductList products={products} />
    </section>
  )
}

const ProductList = memo(function ProductList({ products }) {
  console.log('ProductList rendered')

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  )
})
```

If `products` keeps the same reference, `ProductList` can skip re-render when only `count` changes.

## Data Flow

Parent state updates -> parent re-renders -> React performs shallow prop comparison -> memoized child re-renders only if props changed.

## Why This Pattern Is Useful

- Reduces repeated work in expensive child components.
- Helps isolate heavy UI sections from unrelated parent updates.
- Improves responsiveness in large lists and rich layouts.
- Works well with stable props created by `useMemo` and `useCallback`.

## Common Mistakes

- Wrapping everything with `React.memo` without profiling first.
- Passing new object/function props every render and expecting memo to help.
- Assuming memo removes all re-renders automatically.
- Forgetting that shallow comparison is reference-based.

## Quick Self-Check

- Did I profile before adding `React.memo`?
- Is the memoized component expensive enough to justify it?
- Are the props stable across renders?
- Did I verify performance improved after applying it?
