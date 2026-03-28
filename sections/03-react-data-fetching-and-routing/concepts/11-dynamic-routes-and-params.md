# Dynamic Routes and Params

## Goal

Understand how dynamic URL segments map to data and component rendering.

## Core Idea

A dynamic route contains variable parts (params), such as `/user/:username`.

Instead of hardcoding one route per user, we define a route pattern and read the parameter from the current path.

Dynamic routes allow a single component to handle multiple data instances.

## Key Principle

The URL determines both the view and the data context.

Dynamic params should be parsed from the path and passed as explicit props to the matched page component.

## Data Flow

User navigates -> URL updates -> router reads pathname -> matches dynamic route -> extracts param -> component receives param -> data is fetched/rendered.

## Example

```jsx
if (currentPath.startsWith('/user/')) {
  const username = decodeURIComponent(currentPath.replace('/user/', ''))
  return <User username={username} />
}
```

```jsx
// Creating the route safely from input
navigate(`/user/${encodeURIComponent(value)}`)
```

## Why This Pattern Is Useful

- Supports many resource pages with one route pattern
- Keeps URLs meaningful and shareable
- Connects navigation directly to data lookup
- Scales better than static route-per-item definitions

## Common Mistakes

- Forgetting `encodeURIComponent` when building dynamic URLs
- Forgetting `decodeURIComponent` when reading params
- Parsing route params with brittle string logic in many places
- Allowing malformed params to crash rendering

## Quick Self-Check

- Does my route pattern support dynamic segments?
- Am I encoding params on navigation and decoding on read?
- Is param extraction centralized and predictable?
- Does the page receive params as clear props?
