# Exercise 03: Persistence and Effects

## Goal

Persist game progress in `localStorage` and synchronize it safely with React state using `useEffect`.

## Concepts Practiced

- Side effects in React
- `useEffect` as synchronization tool
- Dependency arrays
- `localStorage` + JSON serialization
- Lazy initialization in `useState`
- Client vs server API guards
- Effect cleanup awareness

## Scenario

Your game resets when the page reloads. Add persistence so players can continue where they left off.

The game state should load from `localStorage` on startup and save on each relevant state change.

## Requirements

1. **Initialize state with lazy functions** that try to read from `localStorage`.
2. **Serialize complex values** correctly:
    - `JSON.stringify` when saving
    - `JSON.parse` when loading
3. **Sync state to storage** with `useEffect` when dependencies change:
    - board
    - turn
    - winner/result
4. **Use clear dependency arrays** in effects.
5. **Add environment safety guard** for non-browser contexts:
    - check `typeof window !== 'undefined'` where relevant
6. **Reset storage on game reset** so UI and persistence stay consistent.

## Constraints

- Do not call browser APIs unsafely at module top level in shared code.
- Do not forget JSON conversion for arrays/objects.
- Keep effects focused on synchronization tasks only.

## Expected Result

- Reloading the page restores last game state.
- State updates automatically persist after each move.
- Reset clears both UI state and persisted data.
- No runtime errors from browser-only APIs in non-browser environments.

## Self-Check

- [ ] Did I use lazy initialization to avoid unnecessary reads on every render?
- [ ] Did I serialize and parse storage values correctly?
- [ ] Are my effects using the right dependency arrays?
- [ ] Did I keep side effects inside `useEffect` instead of render logic?
- [ ] Did I guard browser-only APIs when needed?
