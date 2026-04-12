import { useEffect, useState } from 'react'
import { AddIcon, CartIcon, CloseIcon, RemoveIcon, TrashIcon } from './icons'
import { useCart } from '../hooks/useCart'
import './cart.css'

function CartPanel({ formatPrice }) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    cartItems,
    totalItems,
    totalPriceInCents,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart()

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [isOpen])

  return (
    <>
      <button
        className="cart-toggle"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open cart (${totalItems} items)`}
      >
        <CartIcon size={18} aria-hidden="true" />
        <span>Cart</span>
        <span className="cart-badge">{totalItems}</span>
      </button>

      {isOpen && (
        <div className="cart-overlay" role="presentation" onClick={() => setIsOpen(false)}>
          <aside
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="cart-modal-head">
              <h2>Cart</h2>
              <button
                className="cart-icon-button"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                <CloseIcon size={18} aria-hidden="true" />
              </button>
            </header>

            {!cartItems.length ? (
              <p className="cart-empty">Your cart is empty.</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-main">
                        <p className="cart-item-title">{item.title}</p>
                        <p className="cart-item-meta">
                          {formatPrice(item.priceInCents)} each
                        </p>
                      </div>

                      <div className="cart-item-controls">
                        <button
                          className="cart-icon-button"
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <RemoveIcon size={16} aria-hidden="true" />
                        </button>

                        <span className="cart-quantity" aria-label="Quantity">
                          {item.quantity}
                        </span>

                        <button
                          className="cart-icon-button"
                          type="button"
                          onClick={() => addToCart(item)}
                          disabled={item.quantity >= item.stock}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <AddIcon size={16} aria-hidden="true" />
                        </button>

                        <button
                          className="cart-icon-button cart-icon-button--danger"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <TrashIcon size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="cart-footer">
                  <p className="cart-total">
                    Total: <strong>{formatPrice(totalPriceInCents)}</strong>
                  </p>
                  <button className="cart-clear" type="button" onClick={clearCart}>
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

export default CartPanel
