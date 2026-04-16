import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AddIcon, CartAddIcon, CartIcon, CloseIcon, RemoveIcon, TrashIcon } from './icons'
import { useCart } from '../hooks/useCart'
import './cart.css'

const CLOSE_ANIMATION_MS = 220

function getFocusableElements(container) {
  if (!container) return []

  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
}

function getStockMessage(item) {
  if (item.stock === 0) {
    return {
      text: 'No stock available',
      toneClass: 'cart-item-stock--danger'
    }
  }

  const remainingStock = Math.max(item.stock - item.quantity, 0)

  if (remainingStock === 0) {
    return {
      text: 'No more stock available',
      toneClass: 'cart-item-stock--warning'
    }
  }

  return {
    text: `In cart: ${item.quantity} | Remaining: ${remainingStock}`,
    toneClass: 'cart-item-stock--default'
  }
}

function CartPanel({ formatPrice }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const titleId = useId()
  const toggleButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const modalRef = useRef(null)
  const wasOpenRef = useRef(false)
  const closeTimerRef = useRef(null)
  const {
    cartItems,
    totalItems,
    totalPriceInCents,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart()

  const openCart = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    wasOpenRef.current = true
    setIsClosing(false)
    setIsOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    if (!isOpen || isClosing) return

    setIsClosing(true)
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      closeTimerRef.current = null
    }, CLOSE_ANIMATION_MS)
  }, [isOpen, isClosing])

  useEffect(() => {
    if (isOpen && !isClosing) {
      requestAnimationFrame(() => closeButtonRef.current?.focus())
      return
    }

    if (wasOpenRef.current) {
      toggleButtonRef.current?.focus()
      wasOpenRef.current = false
    }
  }, [isOpen, isClosing])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeCart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

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

  function handleDialogKeyDown(event) {
    if (isClosing) return
    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements(modalRef.current)
    if (!focusableElements.length) {
      event.preventDefault()
      modalRef.current?.focus()
      return
    }

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement

    if (event.shiftKey) {
      if (activeElement === firstFocusable || !modalRef.current?.contains(activeElement)) {
        event.preventDefault()
        lastFocusable.focus()
      }
      return
    }

    if (activeElement === lastFocusable) {
      event.preventDefault()
      firstFocusable.focus()
    }
  }

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="cart-toggle"
        type="button"
        onClick={openCart}
        aria-haspopup="dialog"
        aria-expanded={isOpen && !isClosing}
        aria-label={`Open cart (${totalItems} items)`}
      >
        <CartIcon size={18} aria-hidden="true" />
        <span>Cart</span>
        <span className="cart-badge">{totalItems}</span>
      </button>

      {isOpen && (
        <div
          className={`cart-overlay ${isClosing ? 'is-closing' : ''}`}
          role="presentation"
          onClick={closeCart}
        >
          <aside
            ref={modalRef}
            className={`cart-modal ${isClosing ? 'is-closing' : ''} ${!cartItems.length ? 'cart-modal--empty' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleDialogKeyDown}
          >
            <header className="cart-modal-head">
              <h2 id={titleId}>Cart</h2>
              <button
                ref={closeButtonRef}
                className="cart-icon-button"
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
              >
                <CloseIcon size={18} aria-hidden="true" />
              </button>
            </header>

            {!cartItems.length ? (
              <div className="cart-empty">
                <div className="cart-empty-icon" aria-hidden="true">
                  <CartAddIcon size={36} />
                </div>
                <p className="cart-empty-title">Your cart is empty</p>
                <p className="cart-empty-text">
                  Add products from the catalog to see them here.
                </p>
                <button
                  className="cart-empty-cta"
                  type="button"
                  onClick={closeCart}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {cartItems.map((item) => {
                    const stockInfo = getStockMessage(item)

                    return (
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

                      <p className={`cart-item-stock ${stockInfo.toneClass}`}>
                        {stockInfo.text}
                      </p>
                    </li>
                    )
                  })}
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
