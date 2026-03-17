# Elements as Props

An element prop means passing JSX as a prop to another component.

This is different from passing plain strings, booleans, or functions.

## Basic Idea

```jsx
<UserCard badge={<span>@kaelsyntax</span>} />
```

Here, `badge` is a React element.

## Example: Badge as Prop

Parent:

```jsx
<TwitterFollowCard
  userName="kaelsyntax"
  name="Kael"
  verifiedBadge={<span className="verified-badge">verified</span>}
/>
```

Child:

```jsx
export function TwitterFollowCard({ name, verifiedBadge }) {
  return (
    <strong>
      {name} {verifiedBadge}
    </strong>
  );
}
```

## Course-Style Example: `formattedUserName` as Element

```jsx
// Parent (App)
const formattedUserName = <span>@kaelsyntax</span>;

<TwitterFollowCard
  name="Kael"
  formattedUserName={formattedUserName}
/>
```

```jsx
// Child
function TwitterFollowCard({ name, formattedUserName }) {
  return (
    <strong>
      {name} {formattedUserName}
    </strong>
  );
}
```

In this case, `formattedUserName` is a JSX element, so this is elements-as-props.

## Example: Button/Icon as Prop

```jsx
<Card action={<button>View profile</button>} />
```

Inside the component:

```jsx
function Card({ action }) {
  return <footer>{action}</footer>;
}
```

## Why Use Elements as Props?

- Flexible UI composition
- Reuse the same component with different visual parts
- Keep parent in control of what to render

## Function Props vs Element Props

- Function prop: pass behavior (`onFollow`, `formatUserName`)
- Element prop: pass JSX/UI (`badge`, `icon`, `action`)

## Common Mistakes

- Confusing formatted strings with elements
- Passing too much complex JSX and making parent hard to read
- Forgetting that `children` is also a special element prop pattern
