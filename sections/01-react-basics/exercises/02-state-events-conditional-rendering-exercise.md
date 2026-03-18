# Exercise 02: State, Events, and Conditional Rendering

## Goal

Add interactive behavior to a reusable component using `useState`, event handlers, and conditional UI.

## Concepts Practiced

- `useState`
- Event handling (`onClick`, `onMouseEnter`, `onMouseLeave`)
- Conditional rendering
- Conditional classes
- Derived values from state

## Scenario

Starting from a reusable follow card, implement follow/unfollow interactions with UI feedback.

## Requirements

1. **Add local state** for follow status:
    - `isFollowing`
2. **Initialize state** from a prop:
    - `initialIsFollowing`
3. **Toggle follow status** on button click.
4. **Show button text** based on state:
    - `Follow` / `Following`
5. **Handle hover interactions** when following:
    - Change text to `Unfollow`
    - Apply danger style (red variant)
6. **Use conditional class names** for button styles.
7. **Use functional state update** for toggling:
    - `setIsFollowing((prev) => !prev)`

## Constraints

- Do not mutate props.
- Do not store derived values as extra state (for example, do not store `buttonText` as state).
- Keep logic readable and small.

## Expected Result

- UI updates immediately on click.
- Hover behavior changes only when the card is in following state.
- No visual glitches from hardcoded styles.

## Self-Check

- [ ] Did I use `initialIsFollowing` as initial state value?
- [ ] Did I use functional updates for toggle?
- [ ] Did I compute text/class from state instead of duplicating state?
- [ ] Did I handle hover behavior correctly (scoped to following state, via local state or CSS)?
