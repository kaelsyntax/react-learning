# Context, Reducer, and Custom Hooks Composition

## Goal

Compose shared feature state with `Context + useReducer + custom hooks` so logic stays scalable and UI remains clean.

## Core Idea

This composition splits responsibilities into three layers:

- `reducer`: defines state transitions
- `provider` (context layer): owns state and exposes feature actions/selectors
- custom hook: gives components a clean API (`useCart`, `useFilters`)

Instead of components managing state internals, they call semantic actions like `addToCart` or `removeFromCart`.

## Key Principle

Expose intention, not implementation details.

Components should consume feature APIs from hooks, not manipulate reducer internals directly.

## Example Composition Pattern

```jsx
// cart-context.jsx
function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems)

  function addToCart(product) {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product })
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const totalItems = getTotalItems(cartItems)

  const value = { cartItems, totalItems, addToCart, clearCart }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
```

```jsx
// useCart.js
function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

## Data Flow

UI event -> hook action (`addToCart`) -> `dispatch(action)` -> reducer returns next state -> provider updates context value -> consuming UI rerenders.

## Why This Pattern Is Useful

- Keeps feature logic centralized and reusable
- Prevents prop drilling for shared feature state
- Makes components smaller and easier to reason about
- Improves maintainability as feature complexity grows

## Common Mistakes

- Exposing raw `dispatch` everywhere instead of semantic actions
- Putting unrelated feature values inside one context
- Skipping guard checks in custom hooks used outside their provider scope
- Mixing reducer logic with UI concerns in components

## Quick Self-Check

- Is state transition logic in a reducer instead of scattered handlers?
- Does context expose a focused feature API?
- Do UI components consume a custom hook instead of raw context internals?
- Could this feature scale without turning components into logic containers?
