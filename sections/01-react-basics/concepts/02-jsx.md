# JSX

JSX is a syntax extension for JavaScript used in React to describe UI in a declarative way.

It looks like HTML, but it is JavaScript under the hood.

JSX is not HTML; it follows JavaScript and React-specific rules.

## What is JSX?

JSX lets you write markup-like code inside JavaScript:

```jsx
const title = <h1>Hello, React</h1>;
```

React transforms JSX into regular JavaScript function calls.

## Basic Rules

- Use `camelCase` for DOM properties (`className`, `htmlFor`, `onClick`).
- Close all tags (`<img />`, `<input />`).
- Return a single parent element (or a fragment `<>...</>`).
- Put JavaScript expressions inside `{}`.

### Fragments

If you need to return multiple elements, you must wrap them in a single parent. To avoid adding extra nodes (like unnecessary `<div>`s) to the DOM, use **Fragments**:

```jsx
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>
```

## Expressions in JSX

You can use expressions like:

- variables: `{name}`
- math: `{2 + 2}`
- function calls: `{formatDate(today)}`
- ternary conditions: `{isLoggedIn ? "Welcome" : "Please log in"}`

Example:

```jsx
const name = "Kael";
const age = 20;

const element = <h1>I'm {name} and I'm {age} years old.</h1>;
```

## Important Note

Inside JSX, you can use expressions, not statements.

- Valid: `{isOpen ? "Open" : "Closed"}`
- Invalid: `{if (isOpen) { ... }}`
