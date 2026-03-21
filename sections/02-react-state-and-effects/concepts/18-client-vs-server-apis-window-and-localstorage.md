# Client vs Server APIs (`window`, `localStorage`)

## Goal

Understand why some browser APIs are unavailable in server environments.

## Core Idea

APIs like `window`, `document`, and `localStorage` exist only in the browser runtime.

In SSR (server-side rendering), those globals are not available by default.

## Typical Problem

Trying to access `localStorage` during server execution causes runtime errors.

## Safe Guard Example

```jsx
const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  const saved = localStorage.getItem('board')
}
```

## React-Oriented Practice

- Prefer reading/writing browser APIs inside `useEffect`.
- Add environment guards when logic may run outside the browser.

## Why This Matters

- Prevents SSR crashes.
- Makes code portable across client/server environments.
- Clarifies where side effects should run.

## Common Mistakes

- Accessing `window` directly at module top level in shared code.
- Assuming `localStorage` always exists.
- Forgetting environment checks in universal apps.
