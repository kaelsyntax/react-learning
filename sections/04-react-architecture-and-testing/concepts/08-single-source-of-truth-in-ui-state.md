# Single Source of Truth in UI State

## Goal

Keep UI behavior predictable by ensuring each piece of state has one authoritative owner.

## Core Idea

A single source of truth means one place owns the authoritative state value.

Everything else should be derived from that source during render.

When the same meaning is stored in multiple places, contradictions appear.

## Key Principle

Store minimal source state.

Derive secondary values from that source instead of duplicating them in `useState`.

## Example (Good)

```jsx
// Source of truth
const { filters } = useFilters()

// Derived result
const filteredProducts = products.filter((product) => {
  const matchesCategory =
    filters.category === 'all' || product.category === filters.category
  const matchesMinPrice = product.priceInCents >= filters.minPriceInCents

  return matchesCategory && matchesMinPrice
})
```

## Example (Problematic)

```jsx
const [filters, setFilters] = useState(initialFilters)
const [filteredProducts, setFilteredProducts] = useState(products)
// duplicated derived state
```

If both are state sources, one can become stale or inconsistent with the other.

## Data Flow

Single source state updates -> render recalculates derived values -> UI reflects a single consistent truth.

## Why This Pattern Is Useful

- Reduces contradictory UI states
- Simplifies reasoning and debugging
- Avoids synchronization bugs between duplicated states
- Makes refactors safer as features grow

## Common Mistakes

- Storing both source and derived versions of the same data
- Keeping duplicated flags (`selectedCategory` + `filters.category`)
- Updating one source and forgetting the other
- Treating convenience state as real source state

## Quick Self-Check

- Where is the authoritative owner of this state?
- Can this value be computed from existing state instead?
- Am I storing duplicated meaning in more than one place?
- If I update one state, do I need to manually sync another?
