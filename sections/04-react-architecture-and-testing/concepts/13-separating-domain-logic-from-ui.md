# Separating Domain Logic from UI

## Goal

Separate business rules from presentation components so features stay easier to maintain, test, and evolve.

## Core Idea

UI components should focus on rendering and user interactions.

Domain logic should handle state transitions and business rules.

In practice, cart transitions and selectors can move out of context and components into dedicated domain files.

## Key Principle

Keep decision-making logic close to the domain, not inside JSX.

Components orchestrate actions; domain functions decide how state changes.

## Example Separation Pattern

```jsx
// domain/cart/cart-transitions.js
function addItemTransition(cartItems, product) {
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (!existingItem) {
    return [...cartItems, { ...product, quantity: 1 }]
  }

  if (existingItem.quantity >= existingItem.stock) {
    return cartItems
  }

  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  )
}
```

```jsx
// UI component
function ProductCard({ product }) {
  const { addToCart } = useCart()
  return <button onClick={() => addToCart(product)}>Add to cart</button>
}
```

## Data Flow

UI event -> feature action (`addToCart`) -> reducer/domain transition logic -> next state -> UI rerender.

## Why This Pattern Is Useful

- Keeps components simpler and more readable
- Reduces duplicated business logic across UI layers
- Improves testability with pure domain functions
- Makes refactors safer by isolating responsibilities behind stable domain functions

## Common Mistakes

- Writing business rules directly inside JSX handlers
- Mixing pricing/stock/quantity rules with presentation concerns
- Repeating the same state-transition logic in multiple files
- Leaving reducers bloated instead of extracting reusable transitions

## Quick Self-Check

- Are business rules outside of rendering components?
- Can the same domain function be reused by multiple UI pieces?
- Would a visual redesign leave domain rules untouched?
- Is the context layer orchestration-focused instead of logic-heavy?
