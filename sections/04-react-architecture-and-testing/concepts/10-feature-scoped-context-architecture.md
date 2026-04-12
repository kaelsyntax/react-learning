# Feature-Scoped Context Architecture

## Goal

Design context boundaries around features so shared state stays modular, predictable, and maintainable as the app grows.

## Core Idea

Context architecture should follow feature boundaries, not a single global container for everything.

Instead of creating one oversized app context, create focused contexts per feature domain:

- `FiltersContext` for filter state/actions
- `CartContext` for cart collection/actions

## Key Principle

Scope context to the smallest subtree that needs it.

Keep each context responsible for one feature domain.

## Example Feature Split

```jsx
<App>
  <FiltersProvider>
    <CatalogPage />
  </FiltersProvider>

  <CartProvider>
    <CartSidebar />
  </CartProvider>
</App>
```

Note: In smaller apps, wrapping the full `App` with one or more providers is an acceptable tradeoff for simplicity.

```jsx
// filters-context.jsx
const value = { filters, handleCategoryChange, handleMinPriceChange }

// cart-context.jsx
const value = { cartItems, totalItems, addToCart, removeFromCart, clearCart }
```

## Data Flow

Feature provider owns feature state -> provider exposes feature state and actions -> feature UI consumes only relevant context -> updates remain isolated by domain.

## Why This Pattern Is Useful

- Prevents giant "god" context objects
- Reduces accidental coupling between unrelated features
- Makes testing and refactoring easier per feature
- Makes ownership boundaries easier to read and reason about

## Common Mistakes

- Putting filters, cart, auth, and UI toggles into one context
- Wrapping the entire app by default without scope reasoning
- Exposing unrelated values/actions from the same provider
- Letting one context become a dumping ground over time

## Quick Self-Check

- Does this context represent one coherent feature domain?
- Is its provider scope intentional and minimal?
- Are consumers reading only feature-relevant values?
- Would splitting this context reduce complexity?
