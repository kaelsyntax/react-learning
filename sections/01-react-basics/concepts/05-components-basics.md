# Components

## What is a component?

A React component is a reusable piece of UI.

In modern React, a component is usually a JavaScript function that returns JSX.

## Basic Component Example

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

Use it like this:

```jsx
<Button text="Button 1" />
```

## `props` and Destructuring

`props` are data passed from a parent component to a child component.

Without destructuring:

```jsx
function Button(props) {
  return <button>{props.text}</button>;
}
```

With destructuring (cleaner):

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

## Key Characteristics

- Reusable: you can render the same component many times
- Composable: components can contain other components
- Dynamic: components receive data through `props`

## Naming Rule: PascalCase

Component names must start with uppercase letters (PascalCase):

- Valid: `ButtonSubmit`
- Invalid: `buttonSubmit`

React uses this rule to distinguish custom components from native HTML tags.

## Composition Example

```jsx
function Card({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

```jsx
<Card title="Profile">
  <p>Frontend developer</p>
</Card>
```

## Common Mistakes

- Forgetting `return` in a component function
- Writing component names in lowercase
- Calling components like normal functions instead of using JSX syntax
