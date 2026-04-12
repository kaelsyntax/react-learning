# State Modeling for Collections and Aggregates

## Goal

Model collection state (lists of entities) and derive aggregate values (counts, totals) from that source in a predictable way.

## Core Idea

When managing a collection (cart items, selected users, playlist tracks), the collection itself should be the source of truth.

Aggregate values like total quantity or total price should be derived from that collection, not stored as duplicated state.

## Key Principle

Store normalized collection data (each item follows a consistent shape and identity).

Derive aggregates from collection state at render or selector level.

## Example Collection Model

```jsx
// Source of truth: collection of cart items
const [cartItems, setCartItems] = useState([
  { id: 1, title: 'Keyboard', priceInCents: 8999, quantity: 2 },
  { id: 2, title: 'Mouse', priceInCents: 2999, quantity: 1 }
])
```

## Example Aggregate Derivation

```jsx
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

const totalPriceInCents = cartItems.reduce(
  (sum, item) => sum + item.priceInCents * item.quantity,
  0
)
```

## Data Flow

Collection actions update the source list -> render recalculates aggregates -> UI reflects updated totals and counts consistently.

## Why This Pattern Is Useful

- Keeps totals/counts always aligned with real item state
- Prevents synchronization bugs from duplicated aggregate state
- Makes update logic easier to reason about (`add`, `remove`, `increase`, `decrease`)
- Scales naturally when moving to `useReducer`

## Common Mistakes

- Storing both `cartItems` and `totalPrice` in separate mutable state
- Duplicating entity meaning across different arrays
- Mixing incompatible item shapes inside one collection
- Forgetting to enforce quantity constraints (e.g., stock limits)

## Quick Self-Check

- What is the single collection source of truth?
- Are totals/counts derived from that collection?
- Does each entity follow a stable shape (`id`, `quantity`, etc.)?
- If item quantity changes, do aggregates update automatically?
