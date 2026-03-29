# Exercise 03: Custom Hooks, Debounce, and Lazy Routes

## Goal

Refactor logic into reusable hooks and optimize route loading with lazy-loaded components.

## Concepts Practiced

- Custom hooks for async logic
- Debounce with `useEffect` and timers
- Cleanup for async and timed effects
- Race-condition mitigation with abort logic
- Route-level lazy loading with `React.lazy` and `Suspense`
- Separation of concerns (logic vs UI)
- Pragmatic use of performance tools

## Scenario

Your app works, but now you want cleaner architecture and better performance behavior.

You will:

- extract fetch logic into `useFetchUser`
- extract debounce logic into `useDebounce`
- lazy-load route pages to reduce initial bundle weight

## Requirements

1. **Create `useFetchUser(username)` hook** that returns:
   - `user`
   - `isLoading`
   - `error`
2. **Implement safe fetch lifecycle** inside hook:
   - use `AbortController`
   - ignore `AbortError`
   - reset stale state when a new request starts
3. **Create `useDebounce(value, delay)` hook**:
   - delay updates with `setTimeout`
   - cleanup pending timeout on change/unmount
4. **Integrate hooks within the route component** (e.g., `User` page).
5. **Lazy-load route components** using `React.lazy`.
6. **Wrap route rendering with `Suspense` fallback**.

## Constraints

- Keep hooks free of JSX/UI rendering.
- Do not duplicate fetch logic across components.
- Avoid over-optimizing with `useMemo`/`useCallback` unless justified.
- Do not trigger unnecessary re-fetches due to unstable dependencies.

## Expected Result

- Route component is simpler and focused on rendering.
- Fetch/debounce logic is reusable and isolated in hooks.
- No stale request override issues during rapid route/input changes.
- Lazy routes load with visible fallback and without runtime errors.

## Self-Check

- [ ] Does `useFetchUser` encapsulate async lifecycle correctly?
- [ ] Does `useDebounce` cleanup old timers?
- [ ] Is hook logic reusable outside a single component?
- [ ] Are routes lazy-loaded with `Suspense`?
- [ ] Did I keep optimization choices pragmatic and readable?
