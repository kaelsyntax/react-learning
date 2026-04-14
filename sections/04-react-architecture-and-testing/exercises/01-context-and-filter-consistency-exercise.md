# Exercise 01: Context and Filter Consistency

## Goal

Implement a filter system with a single source of truth shared through context, keeping UI controlled and derived results predictable.

## Concepts Practiced

- Controlled filter inputs
- Context provider/consumer flow
- Single source of truth for UI state
- Derived data from `products + filters`
- Avoiding duplicated/derived state in `useState`

## Scenario

You are building the catalog filter layer for an ecommerce page.

The app should expose filter state through `FiltersContext`, and product results must be derived from that state without creating duplicated state containers.

## Requirements

1. **Create and provide filter state** in a context:
   - `category`
   - `minPriceInCents`
2. **Consume context values/actions** inside filter UI components.
3. **Keep both inputs controlled**:
   - category `<select>`
   - minimum price `<input type="range">`
4. **Derive filtered products** from `products + filters`.
5. **Render count feedback showing**:
   - number of filtered results
   - total number of products
6. **Support clear default behavior**:
   - `category: 'all'`
   - `minPriceInCents: 0`

## Constraints

- Do not store `filteredProducts` in `useState`.
- Do not duplicate filter state in both context and local component state.
- Keep provider value focused on filter domain only.

## Expected Result

- Changing filters immediately updates visible products.
- Filter UI stays synchronized with context state.
- Reset/default values produce full catalog again.
- No stale or conflicting state across components.

## Self-Check

- [ ] Is there one source of truth for filter inputs?
- [ ] Are filter controls fully controlled by React state?
- [ ] Are results derived instead of stored as duplicated state?
- [ ] Is filter data shared via context without prop drilling?
- [ ] Is provider value focused only on filter-related concerns?
