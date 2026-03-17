# The Special `children` Prop

In React, `children` is a special prop that contains whatever is placed between a component's opening and closing tags.

## Basic Example

```jsx
function Card({ children }) {
  return <section className="card">{children}</section>;
}
```

Usage:

```jsx
<Card>
  <h2>Profile</h2>
  <p>Frontend developer</p>
</Card>
```

Here, both `<h2>` and `<p>` are received inside `children`.

## Why `children` Is Useful

- Flexible component composition
- Reusable wrapper components
- Cleaner APIs than passing many separate element props

## `children` vs Element Props

- `children`: content between tags
- Element prop: JSX passed through a named prop (`icon`, `badge`, `footer`)

Both are valid. Use `children` for the main inner content.

## Practical Pattern

```jsx
function Panel({ title, children }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}
```

```jsx
<Panel title="Account">
  <button>Follow</button>
</Panel>
```

## Common Mistakes

- Forgetting to render `{children}` inside the component
- Trying to mutate `children`
- Overusing element props when `children` is enough
