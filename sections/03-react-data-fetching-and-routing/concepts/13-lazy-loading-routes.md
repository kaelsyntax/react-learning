# Lazy Loading Routes

## Goal

Improve initial load performance by loading route components only when they are needed.

## Core Idea

With route-level lazy loading, the app does not download every page on first load.

Instead, each route component is fetched when that route is visited for the first time.

Lazy loading is a form of code splitting at the route level.

## Key Principle

Load less code upfront.  
Defer non-critical route bundles.

## Data Flow

App starts -> only core shell loads -> user navigates to route -> lazy import is requested -> fallback UI renders while loading -> route component resolves and renders.

## Example

```jsx
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const User = lazy(() => import('./pages/User'))

function App() {
  return (
    <Suspense fallback={<p>Loading route...</p>}>
      {/* route matching logic here */}
    </Suspense>
  )
}
```

## Why This Pattern Is Useful

- Reduces initial JavaScript bundle size
- Improves first-load performance for multi-route apps
- Delays heavy page code until it is actually needed
- Fits naturally with route-based app structure

## Common Mistakes

- Forgetting to wrap lazy components with `Suspense`
- Lazy-loading tiny components where complexity is not worth it
- Showing no fallback UI during lazy load
- Assuming lazy loading replaces data fetching optimization

## Quick Self-Check

- Am I splitting at route boundaries?
- Do lazy routes always render inside `Suspense`?
- Is the fallback clear and lightweight?
- Is lazy loading applied where it gives real benefit?
