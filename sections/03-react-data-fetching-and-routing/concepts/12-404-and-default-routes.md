# 404 and Default Routes

## Goal

Handle unmatched URLs safely and define a predictable default route behavior.

## Core Idea

A router should always render something.

If no route matches the current path, show a fallback 404 view instead of leaving the UI blank or broken.

A missing route should never break the application flow.

## Key Principle

Route matching should end with a safe fallback.

Default route handles the expected entry path (usually `/`), while 404 handles unknown paths.

## Data Flow

App reads pathname -> checks known routes in order -> if one matches, render that page -> if none match, render 404 fallback.

## Example

```jsx
if (currentPath === '/') {
  return <Home navigate={navigate} />
}

if (currentPath.startsWith('/user/')) {
  const username = decodeURIComponent(currentPath.replace('/user/', ''))
  return <User username={username} />
}

return (
  <main className="app">
    <section className="card card--notfound">
      <h1>404</h1>
      <p>Page not found.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </section>
  </main>
)
```

## Why This Pattern Is Useful

- Prevents blank screens for unknown URLs
- Improves UX with clear feedback
- Makes routing behavior explicit and robust
- Helps debugging incorrect links or malformed paths

## Common Mistakes

- Forgetting a fallback route entirely
- Putting broad matches before specific ones
- Returning `null` for unknown routes
- Treating default route and 404 as the same case

## Quick Self-Check

- Do I have a fallback 404 route?
- Is route order from specific to generic?
- Does `/` render a default entry page?
- Does an unknown path always produce a clear UI state?
