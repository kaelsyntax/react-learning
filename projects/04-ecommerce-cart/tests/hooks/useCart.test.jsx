import { describe, expect, it, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { CartProvider } from '../../src/context/cart-context.jsx'
import { useCart } from '../../src/hooks/useCart.js'

function Wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>
}

describe('useCart', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('throws an error when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within CartProvider'
    )
  })

  it('returns initial cart state when used inside CartProvider', () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper })

    expect(result.current.cartItems).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPriceInCents).toBe(0)
    expect(typeof result.current.addToCart).toBe('function')
    expect(typeof result.current.decreaseQuantity).toBe('function')
    expect(typeof result.current.removeFromCart).toBe('function')
    expect(typeof result.current.clearCart).toBe('function')
  })
})

