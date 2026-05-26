# Code Splitting with lazy and Suspense

## Goal

Understand how `lazy` and `Suspense` reduce initial bundle cost by loading non-critical UI only when needed.

## Core Idea

Code splitting divides the app into smaller chunks instead of shipping everything in the first load.

`lazy` loads a component on demand, and `Suspense` provides a fallback UI while that component is loading.

This can improve initial loading speed and perceived performance, especially in larger apps.

## Key Principle

Load critical UI first, defer secondary UI until the user needs it.

## Example

```jsx
import { lazy, Suspense, useState } from 'react'

const FavoritesPanel = lazy(() => import('./FavoritesPanel'))

function AppShell() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  return (
    <section>
      <button onClick={() => setIsFavoritesOpen((value) => !value)}>
        Toggle favorites
      </button>

      {isFavoritesOpen ? (
        <Suspense fallback={<p>Loading favorites...</p>}>
          <FavoritesPanel />
        </Suspense>
      ) : null}
    </section>
  )
}
```

Here, `FavoritesPanel` is not loaded during initial app load. It is loaded only when the user opens it.

## Data Flow

Initial app renders critical UI -> user requests secondary section -> lazy import starts -> `Suspense` fallback appears -> chunk finishes loading -> deferred component renders.

## Why This Pattern Is Useful

- Reduces initial JavaScript payload.
- Improves first load responsiveness.
- Keeps secondary features available without blocking initial UI.
- Helps scale large applications with better loading strategy.

## Common Mistakes

- Lazy-loading critical above-the-fold components.
- Using vague fallback UI that confuses users.
- Splitting too aggressively and creating too many tiny chunks.
- Assuming code splitting replaces runtime render optimizations.
- Lazy-loading components that users need immediately.

## Quick Self-Check

- Did I keep critical UI in the initial bundle?
- Is the lazy-loaded section truly secondary?
- Is the `Suspense` fallback clear and useful?
- Did code splitting improve initial load experience?
