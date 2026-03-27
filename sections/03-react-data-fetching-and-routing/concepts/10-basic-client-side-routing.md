# Basic Client-Side Routing

## Goal

Understand how a simple client-side router decides which component to render based on the URL.

## Core Idea

In client-side routing, the browser URL changes without reloading the full page.

A router reads `window.location.pathname` and renders a matching view/component.

This approach is the foundation of libraries like React Router.

## Key Principle

Route state is URL-driven.  
Rendering is path-driven.

The URL acts as the single source of truth for the rendered view.

## Data Flow

Initial load -> read current pathname -> match route -> render component.

Navigation click -> `pushState` updates URL -> router updates internal path state -> new route component renders.

Back/forward browser actions -> `popstate` event fires -> router syncs state -> correct route renders again.

## Example

```jsx
function Router({ routes, defaultComponent: DefaultComponent }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onLocationChange)
    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  const Page = routes[currentPath] ?? DefaultComponent
  return <Page />
}
```

```jsx
function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
```

## Why This Pattern Is Useful

- Gives SPA navigation without full document reloads
- Keeps route logic explicit and testable
- Clarifies the foundation behind routing libraries
- Enables shareable URLs for each view

## Common Mistakes

- Updating URL with `pushState` but not updating UI state
- Ignoring `popstate` and breaking back/forward navigation
- Forgetting a fallback/default route
- Mixing full reload links for internal SPA routes

## Quick Self-Check

- Does my router read from `window.location.pathname`?
- Do route changes trigger UI rerendering?
- Do browser back/forward buttons work correctly?
- Do I have a default/fallback route when no match exists?
