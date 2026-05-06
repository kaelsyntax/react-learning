# Exercise 01: Custom Hook Extraction and API Design

## Goal

Refactor repeated component logic into a reusable custom hook with a clear, stable API.

## Concepts Practiced

- Identifying duplication and extraction opportunities
- Separating logic from UI
- Designing hook inputs and outputs
- Naming hooks and actions clearly
- Keeping hook APIs small and predictable

## Scenario

You have two components with similar state and interaction logic (search state, filter state, toggle state, or controlled input logic).

You want to avoid duplicated logic and expose a clean API that both components can consume.

## Requirements

1. **Identify duplicated logic** in at least two components.
2. **Create one custom hook** that encapsulates that logic.
3. **Design a clear API**:
   - explicit inputs (if needed)
   - explicit outputs (state + actions)
4. **Refactor both components** to consume the hook.
5. **Keep components render-focused** after refactor.

## Constraints

- Do not move JSX/UI rendering into the hook.
- Do not return unnecessary values "just in case".
- Keep naming intentional (`useSomething`, clear action names).
- Avoid adding optimization tools unless needed.

## Expected Result

- Duplicated logic is removed from components.
- Hook API is readable and easy to use.
- Components become smaller and easier to reason about.
- Behavior remains unchanged after refactor.
- Both components consume the same hook without duplicating state logic.

## Self-Check

- [ ] Did I remove duplicated logic from at least two components?
- [ ] Is the hook API clear at first glance?
- [ ] Are components mostly rendering and interaction wiring now?
- [ ] Did I avoid exposing unnecessary internal details?
- [ ] Is behavior stable after extraction?
