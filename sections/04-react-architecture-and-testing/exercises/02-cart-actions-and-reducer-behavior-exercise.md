# Exercise 02: Cart Actions and Reducer Behavior

## Goal

Model cart updates with `useReducer` and verify that each action produces predictable, immutable state transitions.

## Concepts Practiced

- Action-driven state modeling
- Pure reducer functions
- Immutable update patterns for collections
- Clear action naming (`ADD_ITEM`, `DECREASE_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`)
- Derived aggregates (`totalItems`, `totalPriceInCents`)

## Scenario

Your cart feature now has multiple user interactions.

You need a reducer that handles cart behavior safely as actions increase in complexity, including quantity rules and stock limits.

## Requirements

1. **Define cart action types** for add/decrease/remove/clear flows.
2. **Implement reducer transitions**:
   - add new product with `quantity: 1`
   - increase quantity when item already exists
   - prevent increasing quantity beyond available stock
   - decrease quantity and remove item when it reaches `0`
   - remove item directly by `id`
   - clear full cart
3. **Dispatch semantic actions** from provider helper functions.
4. **Expose derived aggregates**:
   - `totalItems`
   - `totalPriceInCents`
5. **Use reducer state as single source of truth** for cart data.

## Constraints

- Reducer must stay pure (no side effects).
- Do not mutate arrays/objects in reducer transitions.
- Avoid vague action names (`UPDATE_CART`, `SET_STATE`).
- Do not store totals as separate mutable state.

## Expected Result

- Cart actions are predictable and easy to trace through the reducer.
- Quantity/stock rules behave correctly in edge cases.
- Totals update correctly from current cart state.
- Cart logic scales without spreading rules across UI files.

## Self-Check

- [ ] Does each action map to one clear transition?
- [ ] Is reducer logic pure and immutable?
- [ ] Are reducer transitions isolated from UI logic?
- [ ] Are stock limits enforced in transitions?
- [ ] Are totals derived from `cartItems`?
- [ ] Can I read action intent without opening UI components?
