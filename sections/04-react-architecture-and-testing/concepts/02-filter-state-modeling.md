# Filter State Modeling

## Goal

Model filter state with a single predictable source of truth that scales as filter rules grow.

## Core Idea

When a screen has related filter inputs (for example, category and minimum price), treat them as one state model instead of unrelated state values.

This keeps updates consistent and avoids scattered state logic.

## Key Principle

Store filter inputs in state, and derive filtered results during render.

Do not store both `filters` and `filteredProducts` as separate state sources.

## Example State Shape

```jsx
const [filters, setFilters] = useState({
  category: 'all',
  minPriceInCents: 0
})
```

## Example Update Pattern

```jsx
function handleCategoryChange(event) {
  setFilters((previous) => ({
    ...previous,
    category: event.target.value
  }))
}

function handleMinPriceChange(event) {
  setFilters((previous) => ({
    ...previous,
    minPriceInCents: Number(event.target.value)
  }))
}
```

## Example Derived Filtering

```jsx
const filteredProducts = products.filter((product) => {
  const matchesCategory =
    filters.category === 'all' || product.category === filters.category
  const matchesMinPrice = product.priceInCents >= filters.minPriceInCents

  return matchesCategory && matchesMinPrice
})
```

## Data Flow

User changes filter input -> `filters` updates -> render recalculates `filteredProducts` -> UI reflects the current filter model.

## Why This Pattern Is Useful

- Keeps one source of truth for filter logic
- Makes adding new filters easier (`brand`, `maxPriceInCents`, `inStock`)
- Reduces bugs caused by duplicated/derived state in `useState`
- Makes refactoring into a Filters component or custom hook easier

## Common Mistakes

- Using separate unrelated state variables without a clear model
- Storing `filteredProducts` in state instead of deriving it
- Forgetting to convert range input values to numbers
- Repeating filter logic in multiple components

## Quick Self-Check

- Is `filters` the only source of truth for filter inputs?
- Are filtered results derived from `products + filters`?
- Do updates use object spread to keep other filter fields?
- Can I add a new filter key without rewriting the whole flow?
