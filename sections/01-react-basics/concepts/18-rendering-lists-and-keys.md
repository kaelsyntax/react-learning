# Rendering Lists and Keys

In React, rendering repeated UI is usually done by mapping arrays.

## Rendering with `map`

```jsx
const users = [
  { id: 1, name: "Kael", userName: "KaelSyntax100", initialIsFollowing: true },
  { id: 2, name: "Gemma", userName: "Gemma12", initialIsFollowing: false },
  { id: 3, name: "Mike", userName: "mikegr", initialIsFollowing: false }
];

return (
  <section>
    {users.map((user) => (
      <TwitterFollowCard
        key={user.id}
        name={user.name}
        userName={user.userName}
        initialIsFollowing={user.initialIsFollowing}
      />
    ))}
  </section>
);
```

## Why `key` Is Important

`key` helps React identify each item between renders.

This improves update correctness when items are added, removed, or reordered.

## Which `key` Should You Use?

Use a stable unique value, usually:

- database `id`
- slug/uuid

Avoid (in dynamic lists):

- array index as key (`key={index}`)
- random values (`Math.random()`)

## Common Mistakes

- Forgetting the `key` prop
- Using unstable keys
- Passing `key` to the child and trying to read it as normal prop (React does not expose `key` inside props)
