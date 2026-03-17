# Layout: Style Containers, Not Components

When building reusable components, handle spacing and layout in the parent container whenever possible.

## Core Idea

- Container controls layout: `display`, `gap`, `padding`, `max-width`, alignment
- Component controls internal UI: avatar size, text styles, button styles

This keeps components reusable in different contexts.

## Why This Is Better

- Cleaner component code
- Easier layout changes
- Reusable components across pages and sections

## Example

Container (`App.jsx` + `index.css`):

```css
.App {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 420px;
}
```

Component (`TwitterFollowCard.jsx` + `app.css`):

```css
.tw-follow-card {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
}
```

The vertical separation between cards should come from `.App` (`gap`), not from margin hacks inside each card.

## Common Mistakes

- Adding `margin-bottom` to every component for list spacing
- Mixing page layout rules into small reusable components
- Repeating the same spacing rules in multiple components
