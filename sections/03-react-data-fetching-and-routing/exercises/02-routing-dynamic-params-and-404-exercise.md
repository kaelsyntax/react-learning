# Exercise 02: Routing, Dynamic Params, and 404

## Goal

Implement basic client-side routing with dynamic params and a reliable 404 fallback page.

## Concepts Practiced

- SPA navigation basics
- URL-driven rendering
- Dynamic route params (`/user/:username`)
- Param encoding and decoding
- Default route and fallback route behavior
- History API (`pushState`, `popstate`)

## Scenario

Your app now needs multiple views:

- home route (`/`)
- user route (`/user/:username`)
- unknown route fallback (`404`)

Navigation should update the UI without triggering a full page reload.

## Requirements

1. **Track the current route path** using `window.location.pathname`.
2. **Create a `navigate(to)` function** that:
   - updates URL with `pushState`
   - updates route state
3. **Render route views conditionally based on the current path**:
   - `/` -> Home page
   - `/user/:username` -> User page
   - fallback -> 404 page
4. **Extract dynamic param** from `/user/:username`.
5. **Use URL-safe param handling**:
   - `encodeURIComponent` when navigating
   - `decodeURIComponent` when reading
6. **Support browser back/forward** with `popstate` listener + cleanup.

## Constraints

- Do not use external routing libraries in this exercise.
- Do not force full page reload for internal navigation.
- Keep route matching order predictable (specific before fallback).
- Do not store duplicated route state if it can be derived from the URL.

## Expected Result

- Internal navigation updates URL and view in the same document.
- Dynamic username route works correctly.
- Unknown paths always render a 404 fallback.
- Browser back/forward keeps route UI in sync.

## Self-Check

- [ ] Is route state derived from `window.location.pathname`?
- [ ] Does `navigate` update both URL and rendered view?
- [ ] Do I encode/decode route params safely?
- [ ] Is there a clear 404 fallback?
- [ ] Does `popstate` listener work and clean up correctly?
