# Components vs Elements

This note clarifies a common React confusion: component and element are not the same thing.

## What is an Element?

A React element is the result of JSX. It describes what should appear in the UI.

```jsx
const titleElement = <h1>Hello</h1>;
```

`titleElement` is an element (a description object), not a reusable component.

## What is a Component?

A component is a function (or class) that returns React elements.

```jsx
function Title() {
  return <h1>Hello</h1>;
}
```

`Title` is reusable and can receive props.

## Side-by-Side Example

```jsx
const element = <Title />; // element created from a component
```

`<Title />` is JSX that creates an element whose type is the `Title` component.

## Practical Difference

- Element: a UI value you render
- Component: a reusable UI factory

You can pass an element as prop:

```jsx
<Card badge={<span>verified</span>} />
```

You can pass data/behavior to a component:

```jsx
<TwitterFollowCard userName="kaelsyntax" isFollowing />
```

## Common Mistakes

- Thinking JSX always means component
- Naming components with lowercase letters
- Trying to use a plain element like a component factory
