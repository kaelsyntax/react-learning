# Exercise 03: Lists, Keys, and Composition

## Goal

Render reusable cards from structured data using `map`, stable `key` values, and component composition.

## Concepts Practiced

- Rendering lists with `map`
- Stable keys in React
- Reusable component composition
- Parent-driven data flow
- Combining multiple prop types in real UI

## Scenario

Create a users array in a parent component and render all cards dynamically.

Each item should include enough data to configure each card (name, username, follow status, optional badge).

## Requirements

1. **Define an array** with at least 3 users.
2. **Render cards** using `users.map(...)`.
3. **Use a stable unique key**:
    - `key={user.id}`
4. **Pass explicit props** from each user object:
    - `name`
    - `userName`
    - `initialIsFollowing`
5. **Add optional composition data**:
    - One item with `badge` (element prop)
6. **Keep the child component reusable** (no hardcoded user data).

## Constraints

- Do not use array index as key (unless list is truly static and never changes).
- Do not pass random keys.
- Do not duplicate card markup manually for each user.

## Expected Result

- Cards render from array data only.
- React warnings about keys are gone.
- One card can include extra composed UI (badge) without breaking others.

## Self-Check

- [ ] Am I using `map` instead of repeated hardcoded components?
- [ ] Is `key` stable and unique?
- [ ] Is card data coming from the array?
- [ ] Can I add a new user with one object and render automatically?
- [ ] Did I separate the users data array from the component logic (e.g., outside the component or in a separate file)?
