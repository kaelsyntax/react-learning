# Side Effects in React

## Goal

Understand what a side effect is and why it must be handled outside render logic.

## Core Idea

A side effect is any operation that interacts with systems outside React rendering.

Typical examples:

- `localStorage`
- timers (`setTimeout`, `setInterval`)
- network requests
- subscriptions or event listeners

## Rule of Thumb

Rendering should stay pure. Side effects should be managed with `useEffect` or event handlers.

## Example

```jsx
useEffect(() => {
  localStorage.setItem('board', JSON.stringify(squares))
}, [squares])
```

## Common Mistakes

- Running side effects directly in render flow.
- Mixing rendering logic and external synchronization in the same block.

## Related Concept

See also: `13-useeffect-as-synchronization.md`

