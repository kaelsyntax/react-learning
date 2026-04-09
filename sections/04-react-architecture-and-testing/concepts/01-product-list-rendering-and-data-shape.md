# Product List Rendering and Data Shape

## Goal

Render a product catalog from structured data and define a stable product shape that can scale to filters and cart logic.

## Core Idea

In React, list UIs should come from data, not from hardcoded, repeated JSX.

This works best when every product follows a stable, predictable data shape (consistent key names and value types).

## Key Principle

Design the data model first, then let the UI render from that model.

## Example Data Shape

```json
{
  "id": 1,
  "title": "Mechanical Keyboard K68",
  "brand": "KeyNova",
  "priceInCents": 8999,
  "category": "keyboards",
  "stock": 12,
  "description": "Compact mechanical keyboard...",
  "image": "https://..."
}
```

## Example Rendering Pattern

```jsx
function Products({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.brand}</p>
        </li>
      ))}
    </ul>
  )
}
```

## Data Flow

Mock/source data → `products` array → `map()` → product cards → reusable UI from a stable model

## Why This Pattern Is Useful

- Keeps UI predictable as the catalog grows
- Makes filters easier (price/category depend on stable fields)
- Makes cart actions easier (reliable `id`, `priceInCents`, `stock`)
- Reduces bugs caused by inconsistent property names

## Common Mistakes

- Mixing field names (`price` vs `priceInCents`) across items
- Missing unique `id` values
- Hardcoding cards instead of mapping data
- Storing formatted price strings instead of numeric source values

## Quick Self-Check

- Do all products share the same keys and value types?
- Is each rendered item keyed with a stable unique `id`?
- Is price stored as numeric source data (`priceInCents`)?
- Could filters/cart use this model without extra hacks?
