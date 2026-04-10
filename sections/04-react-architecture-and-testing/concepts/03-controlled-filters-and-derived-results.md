# Controlled Filters and Derived Results

## Goal

Connect filter inputs to React state and derive visible results directly from source data on each render.

## Core Idea

Filter controls should be controlled inputs:

- the input value comes from state
- user interaction updates that same state

Then, visible results should be derived from `products + filters` during render.

## Key Principle

Keep a single source of truth for filter values.

Derived results should be recalculated on every render from current state and data.

## Example Controlled Inputs

```jsx
function Filters({ filters, onCategoryChange, onMinPriceChange }) {
  return (
    <>
      <select value={filters.category} onChange={onCategoryChange}>
        <option value="all">All</option>
        <option value="keyboards">Keyboards</option>
      </select>

      <input
        type="range"
        min="0"
        max="100000"
        value={filters.minPriceInCents}
        onChange={onMinPriceChange}
      />
    </>
  )
}
```

## Example Derived Results

```jsx
const filteredProducts = products.filter((product) => {
  const matchesCategory =
    filters.category === 'all' || product.category === filters.category
  const matchesMinPrice = product.priceInCents >= filters.minPriceInCents

  return matchesCategory && matchesMinPrice
})
```

## Data Flow

User changes filter input -> `filters` state updates -> render runs -> `filteredProducts` is recalculated -> UI reflects the current filter criteria.

## Why This Pattern Is Useful

- Keeps UI and controls synchronized
- Avoids stale or duplicated derived state (`filteredProducts` in `useState`)
- Makes filter behavior deterministic and easier to debug
- Scales cleanly when adding new filter criteria

## Common Mistakes

- Uncontrolled inputs mixed with controlled state
- Storing `filteredProducts` in state as a second source of truth
- Filtering in event handlers only (instead of deriving in render)
- Using mismatched units (`minPrice` vs `priceInCents`)

## Quick Self-Check

- Are all filter inputs controlled by `filters` state?
- Are results derived from `products + filters` every render?
- Can a refresh/render recompute the same result without extra state?
- Is there only one source of truth for each filter value?
