# Passing Objects as Props

You can pass a full object as a prop in React:

```jsx
const user = {
  name: "Kael",
  userName: "kaelsyntax",
  isFollowing: true
};

<TwitterFollowCard user={user} />
```

Child component:

```jsx
function TwitterFollowCard({ user }) {
  return (
    <>
      <strong>{user.name}</strong>
      <span>@{user.userName}</span>
    </>
  );
}
```

## Is This Always Good?

Not always. In many cases, it is better to be explicit and declarative:

```jsx
<TwitterFollowCard
  name={user.name}
  userName={user.userName}
  isFollowing={user.isFollowing}
/>
```

This makes component dependencies clearer.

## About `...user` (Spread Props)

You can also pass object fields using spread syntax:

```jsx
<TwitterFollowCard {...user} />
```

This is equivalent to passing each field manually (if names match).

It is useful in some cases, but use it carefully:

- Pros: less repetitive code
- Cons: less explicit API, easier to pass unwanted props

## Why Explicit Props Are Often Better

- Better readability
- Easier component API design
- Less coupling to external object shape
- Easier refactors and testing

## When Passing Objects Can Be Useful

- Data-driven lists from APIs
- Components that naturally represent one entity (`user`, `product`, `post`)
- Internal app layers where object shape is stable and well-known

## Recommendation

- Prefer explicit props by default (more declarative)
- Pass full objects only when it clearly improves the code

## Common Mistakes

- Mutating object props inside child components
- Passing very large objects when only a few fields are needed
- Hiding component requirements behind a vague `data` prop
