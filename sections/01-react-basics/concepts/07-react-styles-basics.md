# React Styles Basics

This note covers the basic styling workflow in React using regular CSS files.

## `className` in JSX

In React, use `className` instead of `class`.

```jsx
export function App() {
  return <section className="card">Hello</section>;
}
```

## Importing CSS Files

A component can import its stylesheet directly:

```jsx
import "./assets/app.css";
```

## Global vs Local Styles

- Global styles: base styles for the whole app (`index.css`)
- Local/component styles: styles for one component (`app.css`)

Recommended:

- Put reset/base layout in `index.css`
- Put component UI styles in component CSS files

## BEM Naming Convention

BEM helps keep class names clear and scalable.

- Block: `tw-follow-card`
- Element: `tw-follow-card__button`
- Modifier: `tw-follow-card__button--following`

Example:

```html
<article class="tw-follow-card">
  <button class="tw-follow-card__button tw-follow-card__button--following">
    Following
  </button>
</article>
```

## Dynamic Classes in React

Use conditional `className` when UI state changes.

```jsx
const buttonClass = isFollowing
  ? "tw-follow-card__button tw-follow-card__button--following"
  : "tw-follow-card__button";

return <button className={buttonClass}>{isFollowing ? "Following" : "Follow"}</button>;
```

You can also use template literals for short dynamic cases:

```jsx
return (
  <button
    className={`tw-follow-card__button ${
      isFollowing ? "tw-follow-card__button--following" : ""
    }`}
  >
    {isFollowing ? "Following" : "Follow"}
  </button>
);
```

## Common Mistakes

- Using `class` instead of `className`
- Wrong CSS import path
- Duplicating global styles inside component files
- Inconsistent class naming
