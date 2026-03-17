# Component Reusability

Component reusability means creating one component and rendering it many times with different data.

## Why Reuse Components?

- Less duplicated code
- Easier maintenance
- More consistent UI

## Reusable Component with Props

```jsx
function UserCard({ name, userName }) {
  return (
    <article>
      <strong>{name}</strong>
      <span>@{userName}</span>
    </article>
  );
}
```

Use the same component with different props:

```jsx
<UserCard name="Kael" userName="kaelsyntax" />
<UserCard name="Gemma" userName="gemma123" />
<UserCard name="Elon Musk" userName="elonmusk" />
```

## Data-Driven Rendering

You can store data in an array and render with `map`:

```jsx
const users = [
  { id: 1, name: "Kael", userName: "kaelsyntax" },
  { id: 2, name: "Gemma", userName: "gemma123" },
  { id: 3, name: "Elon Musk", userName: "elonmusk" }
];

return (
  <section>
    {users.map((user) => (
      <UserCard
        key={user.id}
        name={user.name}
        userName={user.userName}
      />
    ))}
  </section>
);
```

## Good Practices

- Keep component responsibilities small
- Use clear prop names
- Use stable `key` values when rendering lists

## Common Mistakes

- Hardcoding data inside a reusable component
- Forgetting `key` in `map`
- Passing wrong prop names (`username` vs `userName`)
