# Props Are Immutable

In React, props are read-only values passed from parent to child.

The child component must not modify them.

## What "Immutable" Means

If a component receives props, it should treat them as fixed input.

```jsx
function UserCard({ name }) {
  // name = "Other"; // Do not do this
  return <strong>{name}</strong>;
}
```

## Why Props Must Not Be Mutated

- Predictable data flow (parent -> child)
- Easier debugging
- Clear component responsibilities

## Use `const` for Derived Values

If you need a modified version of a prop, create a new value:

```jsx
function UserCard({ userName }) {
  const normalizedUserName = userName.toLowerCase().replace(/\s+/g, "");
  const displayUserName = `@${normalizedUserName}`;

  return <span>{displayUserName}</span>;
}
```

This keeps the original prop unchanged.

## Bad vs Good

Bad (mutating input):

```jsx
function Profile({ user }) {
  user.role = "admin"; // avoid mutation
  return <p>{user.role}</p>;
}
```

Good (create new object):

```jsx
function Profile({ user }) {
  const nextUser = { ...user, role: "admin" };
  return <p>{nextUser.role}</p>;
}
```

## Common Mistakes

- Reassigning destructured props
- Mutating nested object props
- Confusing prop changes with state updates
