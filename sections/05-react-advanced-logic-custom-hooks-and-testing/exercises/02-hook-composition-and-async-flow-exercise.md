# Exercise 02: Hook Composition and Async Flow

## Goal

Compose multiple small hooks into one feature hook and handle async side effects with predictable state transitions.

## Concepts Practiced

- Hook composition (small hooks into a feature hook)
- Async flow inside custom hooks
- `useEffect` lifecycle and cleanup
- Managing `isLoading`, `error`, and data states
- Building reusable feature-level APIs

## Scenario

You need a feature hook that combines:

- input/query state
- optional filter state
- async data fetching

The final hook should expose one unified API for the component.

## Requirements

1. **Create at least two small hooks** for focused concerns (for example, query state and async state).
2. **Create one composed hook** that uses those hooks internally.
3. **Add async logic inside the composed hook**:
   - loading state
   - error state
   - data state
4. **Add cleanup behavior** to prevent stale updates.
5. **Consume the composed hook** in a UI component.

## Constraints

- Keep each small hook single-responsibility.
- Do not put JSX inside hooks.
- Avoid tightly coupling hooks so they cannot be reused.
- Keep the final API focused and not overloaded.

## Expected Result

- Feature logic is modular and composable.
- Async lifecycle is handled in one predictable place.
- UI component becomes simpler and render-focused.
- State updates remain stable during fast input/interaction changes.

## Self-Check

- [ ] Did I split logic into small hooks with clear responsibilities?
- [ ] Did I compose them into one feature-level hook?
- [ ] Do I expose `isLoading`, `error`, and data clearly?
- [ ] Did I implement cleanup to avoid stale async updates?
- [ ] Is component code simpler after composition?
