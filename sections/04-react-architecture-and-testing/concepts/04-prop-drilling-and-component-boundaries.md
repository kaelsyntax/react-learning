# Prop Drilling and Component Boundaries

## Goal

Understand when passing props across layers is fine, when it becomes prop drilling pain, and how to design clear component boundaries.

## Core Idea

Passing data and handlers through props is the default React pattern.

That is not a problem by itself.

The problem appears when intermediate components only forward props they do not use, or when too many levels depend on passing the same values.

## Key Principle

Start with props.

Only move to Context when data needs to cross multiple unrelated component boundaries.

## Example: Acceptable Prop Flow

```jsx
function App() {
  const [filters, setFilters] = useState({ category: 'all', minPriceInCents: 0 })

  return (
    <Filters
      filters={filters}
      onCategoryChange={(event) =>
        setFilters((prev) => ({ ...prev, category: event.target.value }))
      }
    />
  )
}

function Filters({ filters, onCategoryChange }) {
  return (
    <CategoryFilter
      value={filters.category}
      onChange={onCategoryChange}
    />
  )
}
```

## Component Boundary Heuristic

- `App` owns screen-level state and orchestration
- `Filters` groups filter-related UI and delegates subcontrols
- `CategoryFilter` and `PriceFilter` stay focused on one input each

Boundaries should reflect responsibilities, not just visual structure or nesting.

## Data Flow

State owner (`App`) -> props -> boundary component (`Filters`) -> props -> leaf components -> user interaction -> state update -> rerender with fresh props.

## Why This Pattern Is Useful

- Keeps ownership explicit and predictable
- Makes components easier to test in isolation
- Reduces accidental coupling between unrelated UI blocks
- Prepares the codebase for Context only when truly needed

## Common Mistakes

- Treating any prop passing as "bad" drilling
- Pushing state too deep into leaf components without clear ownership
- Creating giant parent components with unclear boundaries
- Introducing Context too early for short prop chains

## Quick Self-Check

- Which component truly owns this state?
- Are intermediate components using the props or only forwarding them?
- Is the prop chain still short and understandable?
- Would Context simplify architecture now, or just add indirection?
