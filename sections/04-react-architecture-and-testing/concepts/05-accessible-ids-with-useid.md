# Accessible IDs with useId

## Goal

Generate stable input IDs for accessibility without hardcoding strings or risking collisions.

## Core Idea

Form labels should be explicitly connected to their controls:

- `label` uses `htmlFor`
- input/select uses matching `id`

`useId` gives each component instance a stable unique identifier, which is ideal for reusable form components.

## Key Principle

Use `useId` for accessibility relationships (`label` -> control), not for list keys.

## Example Pattern

```jsx
import { useId } from 'react'

function PriceFilter({ value, onChange, maxPriceInCents, formatPrice }) {
  const priceId = useId()

  return (
    <label className="filter-field" htmlFor={priceId}>
      <span>Min Price: {formatPrice(value)}</span>
      <input
        id={priceId}
        type="range"
        min="0"
        max={maxPriceInCents}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
```

## Data Flow

Component renders -> `useId` provides a stable id -> `label htmlFor` matches the control `id` -> assistive technology correctly links the label and input.

## Why This Pattern Is Useful

- Improves accessibility for screen readers
- Prevents duplicated hardcoded IDs in reused components
- Keeps form components reusable and self-contained
- Avoids manual ID management in parent components

## Common Mistakes

- Hardcoding the same `id` across multiple component instances
- Forgetting to connect `htmlFor` and `id`
- Using `useId` values as React list keys
- Generating random IDs on every render

## Quick Self-Check

- Does each form field have a clear label-to-control connection?
- Are IDs generated inside reusable field components?
- Am I avoiding `useId` for list `key` values?
- Would multiple instances of this component still have unique IDs?
