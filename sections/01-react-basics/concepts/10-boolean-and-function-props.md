# Boolean and Function Props

This note covers two common prop patterns in React: booleans and functions.

## Boolean Props

Boolean props are useful for states like active/inactive, open/closed, following/not following.

### Passing `true` (shorthand)

```jsx
<TwitterFollowCard isFollowing />
```

This is the same as:

```jsx
<TwitterFollowCard isFollowing={true} />
```

### Passing `false`

```jsx
<TwitterFollowCard isFollowing={false} />
```

## Function Props

Function props let a parent component pass behavior to a child component.

Example from `App.jsx`:

```jsx
const addAt = (userName) => `@${userName}`;
const formatUserName = (userName) => userName.toLowerCase().replace(/\s+/g, "");

<TwitterFollowCard
  userName="KaelSyntax"
  addAt={addAt}
  formatUserName={formatUserName}
/>
```

Then inside the child component:

```jsx
const normalizedUserName = formatUserName(userName);
const displayUserName = addAt(normalizedUserName);
```

### `formattedUserName` with Function Props

In this topic, `formattedUserName` is usually a string created by function props:

```jsx
const normalizedUserName = formatUserName(userName);
const formattedUserName = addAt(normalizedUserName);
```

This is still function-prop usage, not element-prop usage.

## Naming Convention for Event Function Props

When passing event callbacks between components, a common convention is:

- Callback prop from parent: prefix `on` (`onFollow`, `onDelete`, `onSelect`)
- Local function inside child: prefix `handle` (`handleClick`, `handleFollow`)

Example:

```jsx
function UserCard({ id, onFollow }) {
  const handleClick = () => {
    onFollow(id);
  };

  return <button onClick={handleClick}>Follow</button>;
}
```

## Why This Matters

- Boolean props control UI state and rendering.
- Function props keep components reusable and flexible.
- Parent defines the logic, child focuses on UI.

## Common Mistakes

- Assuming a missing boolean prop is `true` (it is `undefined`/falsy)
- Calling a function prop without checking if it exists (when optional)
- Naming function props unclearly (`fn`, `doIt`) instead of meaningful names
