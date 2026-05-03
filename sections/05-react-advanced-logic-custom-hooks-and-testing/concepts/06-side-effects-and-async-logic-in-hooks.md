# Side Effects and Async Logic in Hooks

## Goal

Understand how to manage side effects and async flows inside custom hooks in a predictable way.

## Core Idea

A custom hook is a good place to centralize async behavior (fetching, loading states, and error handling) so components stay focused on UI.

When you move this logic into a hook, you can reuse the same async pattern in different components.

## Key Principle

Keep rendering pure in components and run async side effects inside `useEffect` in the custom hook.

## Example

```jsx
import { useEffect, useState } from 'react'

function useProducts(query) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setProducts([])
      setError(null)
      return
    }

    let isCancelled = false

    async function fetchProducts() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/products?search=${query}`)

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        if (!isCancelled) {
          setProducts(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setProducts([])
          setError(err)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isCancelled = true
    }
  }, [query])

  return { products, isLoading, error }
}
```

## Data Flow

Component updates input -> passes query to hook -> hook runs useEffect -> async logic updates isLoading/error/products -> component renders UI.

## Why This Pattern Is Useful

- Keeps async complexity out of UI components.
- Makes loading/error/data handling reusable.
- Improves consistency across screens that fetch data.
- Makes testing easier because behavior is centralized.

## Common Mistakes

- Triggering effects with wrong dependencies.
- Forgetting to reset `error` before a new request.
- Updating state after unmount (missing cleanup).
- Mixing UI rendering decisions directly into the hook.
- Not handling empty input or invalid params early.

## Quick Self-Check

- Is async logic inside the hook instead of scattered across components?
- Do I expose clear `isLoading`, `error`, and data state?
- Did I add cleanup to prevent stale updates?
- Is the hook API simple for components to consume?
