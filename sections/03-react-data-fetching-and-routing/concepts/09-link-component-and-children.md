# Link Component and `children`

## Goal

Build a reusable navigation component that supports SPA behavior and flexible content.

## Core Idea

A custom `Link` component wraps navigation behavior in one place (`preventDefault`, client navigation, URL update).

`children` allows components to be more flexible and composable.

This mimics how libraries like React Router implement client-side navigation.

## Key Principle

Keep navigation logic centralized in a single component, while letting UI content vary through `children`.

## Data Flow

User clicks `Link` -> component intercepts default behavior -> client navigation function runs -> route state changes -> matching view renders.

## Example

```jsx
function Link({ to, children, navigate }) {
  const handleClick = (event) => {
    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
```

```jsx
<Link to="/about" navigate={navigate}>About</Link>
<Link to="/profile" navigate={navigate}>My Profile</Link>
```

## Why This Pattern Is Useful

- Reuses navigation logic across the app
- Keeps route transitions consistent
- Makes links composable (`text`, `icons`, or custom content)
- Reduces duplicated click-handling code

## Common Mistakes

- Hardcoding link label instead of using `children`
- Forgetting `event.preventDefault()` for SPA navigation
- Putting route logic in many buttons instead of one reusable component
- Ignoring accessibility basics (clear text, correct `href`)
- Using `<a href>` directly for internal navigation in SPA

## Quick Self-Check

- Does my `Link` accept `children` for flexible content?
- Is navigation logic centralized in the component?
- Am I preventing full page reload for SPA routes?
- Do links still expose proper `href` values?
