# When to Use Props vs Context

## Goal

Choose the right state-sharing strategy by understanding when props are enough and when Context becomes the better architectural tool.

## Core Idea

Props and Context are complementary, not rivals.

- Props are explicit and ideal for short, direct parent-to-child flows.
- Context is useful when multiple distant components need the same state/actions.

## Key Principle

Default to props first.

Adopt Context when prop chains become noisy, fragile, or hard to maintain across boundaries.

## Practical Heuristic

Use props when:

- only a few levels need the data
- ownership and flow are clear
- intermediate components are not overloaded with prop forwarding

Use Context when:

- many distant components need the same source of truth
- prop forwarding appears in multiple branches
- shared actions/data define a feature boundary (filters, cart, auth)

## Example Contrast

```jsx
// Props fit well for local flow:
<Filters
  categories={categories}
  formatPrice={formatPrice}
/>
```

```jsx
// Context fits shared feature state:
<FiltersProvider>
  <App />
</FiltersProvider>
```

## Data Flow

`props` path -> explicit parent-to-child value passing through components.

`context` path -> provider owns shared value -> descendants consume it directly where needed.

## Why This Pattern Is Useful

- Prevents overusing Context for small local state
- Prevents overusing props for wide shared state
- Keeps architecture scalable and understandable
- Helps teams reason about ownership and boundaries

## Common Mistakes

- Treating Context as a default replacement for props
- Treating prop passing as always bad drilling
- Moving local state to global context too early
- Creating oversized contexts with unrelated responsibilities

## Quick Self-Check

- How many levels/components actually need this state?
- Is prop passing still clear and low-friction?
- Are distant branches consuming the same data/actions?
- Would Context reduce complexity here, or just add indirection?
