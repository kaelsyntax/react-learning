import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from '../../src/App.jsx'
import { CartProvider } from '../../src/context/cart-context.jsx'
import { FiltersProvider } from '../../src/context/filters-context.jsx'

function AppWithProviders() {
  return (
    <CartProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </CartProvider>
  )
}

describe('Cart UI flow', () => {
  beforeEach(() => {
    window.localStorage.clear()
    Element.prototype.animate = vi.fn().mockReturnValue({
      cancel: vi.fn(),
      finished: Promise.resolve(),
    })
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 761px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('adds one product and reflects quantity and total in cart modal', async () => {
    render(<AppWithProviders />)

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    fireEvent.click(addButtons[0])

    const openCartButton = await screen.findByRole('button', {
      name: 'Open cart (1 items)',
    })
    fireEvent.click(openCartButton)

    const cartDialog = await screen.findByRole('dialog', { name: 'Cart' })
    const quantity = within(cartDialog).getByLabelText('Quantity')

    expect(quantity.textContent).toBe('1')
    expect(within(cartDialog).getByText('Total:')).not.toBeNull()
    expect(within(cartDialog).getAllByText('$179.99').length).toBeGreaterThan(0)
  })
})
