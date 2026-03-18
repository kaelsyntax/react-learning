# Exercise 01: Components, Props, and Styles

## Goal

Build a small reusable UI block using component composition, explicit props, and clean styling.

## Concepts Practiced

- JSX structure
- Reusable components
- Explicit props
- Boolean props
- Function props (formatters)
- Element props (badge/icon)
- `className` and CSS organization (container vs component)

## Scenario

Create a `UserCard`-style component that displays:

- avatar
- name
- username
- role/tag badge (optional, passed as element prop)

The card must be reusable for multiple users.

## Requirements

1. **Create a reusable component** (example: `UserCard`).
2. **Pass data via props** (`name`, `userName`, `avatarUrl`).
3. **Use one boolean prop** (example: `isVerified`) to alter visual output.
4. **Pass one function prop** to format username:
    - `formatUserName`
5. **Pass one element prop** for badge/icon:
    - `badge`
6. **Apply styles** with clear classes (prefer BEM-like naming).
7. **Keep spacing/layout** in the parent container and internal styles in the component.

## Constraints

- Do not use local state in this exercise.
- Do not mutate props.
- Keep props API explicit and readable.

## Expected Result

- At least 3 cards rendered using the same component.
- One card includes a badge via element prop.
- Username is displayed through formatter function prop.
- Styling is consistent and easy to scale.

## Self-Check

- [ ] Did I avoid hardcoding user data inside the child component?
- [ ] Did I keep the component reusable?
- [ ] Did I separate container layout from card internal styling?
- [ ] Did I use clear prop names?
- [ ] Did I use the spread operator (...user) only when it improved readability and kept props clear?
