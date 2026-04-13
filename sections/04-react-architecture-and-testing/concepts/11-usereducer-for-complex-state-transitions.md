# useReducer for Complex State Transitions

## Goal

Manage complex state updates with explicit actions and a single transition function.

## Core Idea

When multiple actions modify the same state shape (`add`, `remove`, `decrease`, `clear`), spreading update logic across many `setState` callbacks becomes harder to reason about.

`useReducer` centralizes all transitions in one pure reducer:

- current `state`
- `action` (`type` + optional `payload`)
- next `state`

## Key Principle

Use `useReducer` when state transitions are action-driven and interrelated.

Keep the reducer pure: same input -> same output, no side effects.

## Example Reducer Pattern

```jsx
// Reducer: defines all state transitions for the cart
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItemTransition(state, action.payload)

    case 'DECREASE_ITEM':
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload)

    case 'CLEAR_CART':
      return []

    default:
      return state
  }
}
```

## Example Dispatch Usage

```jsx
const [cartItems, dispatch] = useReducer(cartReducer, [])

dispatch({ type: 'ADD_ITEM', payload: product })
dispatch({ type: 'REMOVE_ITEM', payload: productId })
```

## Data Flow

UI event -> `dispatch(action)` -> reducer computes the next state -> React rerenders with updated state.

## Why This Pattern Is Useful

- Centralizes complex transitions in one place
- Makes action intent explicit and testable
- Reduces duplicated state-update logic
- Scales better as feature rules grow

## Common Mistakes

- Writing side effects inside the reducer
- Mutating state instead of returning new structures
- Using vague action names (`UPDATE_STATE`)
- Mixing unrelated domains in one reducer too early
- Overcomplicating reducers for simple state that could stay in `useState`

## Quick Self-Check

- Are state changes expressed as clear actions?
- Is the reducer pure and mutation-free?
- Do transitions stay predictable as actions grow?
- Would this logic be harder to maintain with multiple `useState` setters?
