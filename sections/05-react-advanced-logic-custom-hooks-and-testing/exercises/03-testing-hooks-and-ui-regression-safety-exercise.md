# Exercise 03: Testing Hooks and UI Regression Safety

## Goal

Create a practical testing layer that validates hook behavior and user-facing component flows.

## Concepts Practiced

- Hook behavior testing
- Component interaction testing
- Outcome-based assertions
- Happy path and edge-case coverage
- Regression safety for future refactors

## Scenario

You already have working logic and UI.

Now you want confidence to refactor safely by adding focused tests for:

- custom hook behavior
- component-level user interactions

You can apply this directly to an existing project (for example, Project 04).

## Requirements

1. **Write at least one hook test** that validates state/action behavior.
2. **Write at least one component test** that validates a user interaction flow.
3. **Cover one edge case** (error state, empty value, reset behavior, or invalid input).
4. **Use outcome-focused assertions** (what users/consumers observe).
5. **Document a mini regression checklist** (3-5 checks) for critical flows.

## Constraints

- Do not test private implementation details.
- Prefer user-focused queries and avoid selectors tied to implementation details.
- Keep tests readable and intention-revealing.
- Do not skip edge-case coverage.

## Expected Result

- You can verify hook behavior independently.
- You can verify user-visible behavior through component tests.
- Core flows are protected against regressions during refactors.
- Testing strategy is clear enough to extend over time.

## Self-Check

- [ ] Did I test hook behavior through its public API?
- [ ] Did I test component behavior from the user perspective?
- [ ] Do tests include at least one edge case?
- [ ] Are assertions focused on outcomes instead of internals?
- [ ] Do I have a small repeatable regression checklist?

