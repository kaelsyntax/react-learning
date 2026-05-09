import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
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
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
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

  afterEach(() => {
    cleanup()
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

  it('increases quantity and updates total in cart modal', async () => {
    render(<AppWithProviders />)

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    fireEvent.click(addButtons[0])

    const openCartButton = await screen.findByRole('button', {
      name: 'Open cart (1 items)',
    })
    fireEvent.click(openCartButton)

    const cartDialog = await screen.findByRole('dialog', { name: 'Cart' })

    const increaseButton = within(cartDialog).getByRole('button', {
      name: 'Increase quantity of MX Mechanical',
    })
    fireEvent.click(increaseButton)

    const cartItemTitle = within(cartDialog).getByText('MX Mechanical')
    const cartItem = cartItemTitle.closest('li')
    const quantity = within(cartItem).getByLabelText('Quantity')

    expect(quantity.textContent).toBe('2')
    expect(within(cartDialog).getAllByText('$359.98').length).toBeGreaterThan(0)
  })

  it('removes one item and keeps remaining cart item visible', async () => {
    render(<AppWithProviders />)

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    fireEvent.click(addButtons[0])
    fireEvent.click(addButtons[1])

    const openCartButton = await screen.findByRole('button', {
      name: 'Open cart (2 items)',
    })
    fireEvent.click(openCartButton)

    const cartDialog = await screen.findByRole('dialog', { name: 'Cart' })

    const removeFirstItemButton = within(cartDialog).getByRole('button', {
      name: 'Remove MX Mechanical from cart',
    })
    fireEvent.click(removeFirstItemButton)

    await waitForElementToBeRemoved(() =>
      within(cartDialog).queryByText('MX Mechanical')
    )
    expect(within(cartDialog).getByText('K70 RGB Pro')).not.toBeNull()
  })

  it('clears cart and shows empty state', async () => {
    render(<AppWithProviders />)

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i })
    fireEvent.click(addButtons[0])

    const openCartButton = await screen.findByRole('button', {
      name: 'Open cart (1 items)',
    })
    fireEvent.click(openCartButton)

    const cartDialog = await screen.findByRole('dialog', { name: 'Cart' })

    const clearCartButton = within(cartDialog).getByRole('button', {
      name: 'Clear cart',
    })
    fireEvent.click(clearCartButton)

    expect(await within(cartDialog).findByText('Your cart is empty')).not.toBeNull()
  })
})
