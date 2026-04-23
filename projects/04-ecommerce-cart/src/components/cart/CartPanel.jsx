import { useEffect, useId, useRef, useState } from 'react'
import { AddIcon, CartAddIcon, CartIcon, CloseIcon, RemoveIcon, TrashIcon } from '../shared/icons'
import { useCart } from '../../hooks/useCart'
import { useCartPanelModal } from '../../hooks/useCartPanelModal'
import { useCartItemsTransition } from '../../hooks/useCartItemsTransition'
import { formatPrice } from '../../utils/format-price'
import './cart.css'

const CART_VIEW_SWAP_MS = 180
const CART_TOTAL_ROLL_MS = 210
const STOCK_TONE_PULSE_MS = 160

function getStockMessage(item) {
  if (item.stock === 0) {
    return {
      text: 'Out of stock',
      toneClass: 'cart-item-stock--danger'
    }
  }

  const remainingStock = Math.max(item.stock - item.quantity, 0)

  if (remainingStock === 0) {
    return {
      text: 'No units left',
      toneClass: 'cart-item-stock--danger'
    }
  }

  if (remainingStock <= 2) {
    return {
      text: `Low stock: ${remainingStock}`,
      toneClass: 'cart-item-stock--warning'
    }
  }

  return {
    text: `Stock: ${remainingStock}`,
    toneClass: 'cart-item-stock--default'
  }
}

function CartPanel() {
  const {
    isOpen,
    isClosing,
    floatingToggleRef,
    closeButtonRef,
    modalRef,
    isToggleVisible,
    isToggleHiddenForModal,
    handleDialogKeyDown,
    handleOpenCart,
    closeCart
  } = useCartPanelModal()
  const titleId = useId()
  const {
    cartItems,
    totalItems,
    totalPriceInCents,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart()
  const { visibleCartItems, setCartItemElement } = useCartItemsTransition(cartItems)
  const hasItems = cartItems.length > 0
  const targetView = hasItems ? 'items' : 'empty'
  const [renderedCartView, setRenderedCartView] = useState(targetView)
  const isCartViewClosing = targetView !== renderedCartView
  const [totalRollState, setTotalRollState] = useState({
    from: totalPriceInCents,
    to: totalPriceInCents,
    direction: ''
  })
  const continueShoppingButtonRef = useRef(null)
  const previousRenderedCartViewRef = useRef(renderedCartView)
  const previousCartMetricsRef = useRef({
    isOpen: false,
    totalItems,
    totalPriceInCents
  })
  const [cartLiveMessage, setCartLiveMessage] = useState('')
  const [stockTonePulseById, setStockTonePulseById] = useState({})
  const previousStockTonesRef = useRef(new Map())
  const stockTonePulseTimersRef = useRef(new Map())

  useEffect(() => {
    if (!isCartViewClosing) return undefined

    const timeoutId = setTimeout(() => {
      setRenderedCartView(targetView)
    }, CART_VIEW_SWAP_MS)

    return () => clearTimeout(timeoutId)
  }, [isCartViewClosing, targetView])

  useEffect(() => {
    setTotalRollState((current) => {
      if (totalPriceInCents === current.to) return current

      return {
        from: current.to,
        to: totalPriceInCents,
        direction: totalPriceInCents > current.to ? 'up' : 'down'
      }
    })
  }, [totalPriceInCents])

  useEffect(() => {
    if (!totalRollState.direction) return undefined

    const timeoutId = setTimeout(() => {
      setTotalRollState((current) => ({
        from: current.to,
        to: current.to,
        direction: ''
      }))
    }, CART_TOTAL_ROLL_MS)

    return () => clearTimeout(timeoutId)
  }, [totalRollState.direction])

  useEffect(() => {
    const previousView = previousRenderedCartViewRef.current
    const switchedToEmptyView = previousView === 'items' && renderedCartView === 'empty'
    previousRenderedCartViewRef.current = renderedCartView

    if (!switchedToEmptyView || !isOpen || isClosing) return undefined

    const animationFrameId = requestAnimationFrame(() => {
      continueShoppingButtonRef.current?.focus()
    })

    return () => cancelAnimationFrame(animationFrameId)
  }, [renderedCartView, isOpen, isClosing])

  useEffect(() => {
    const previousMetrics = previousCartMetricsRef.current

    if (!isOpen) {
      previousCartMetricsRef.current = {
        isOpen: false,
        totalItems,
        totalPriceInCents
      }
      return
    }

    if (
      previousMetrics.isOpen &&
      (previousMetrics.totalItems !== totalItems ||
        previousMetrics.totalPriceInCents !== totalPriceInCents)
    ) {
      if (totalItems === 0) {
        setCartLiveMessage('Cart is now empty.')
      } else {
        setCartLiveMessage(
          `Cart updated. ${totalItems} item${totalItems === 1 ? '' : 's'}. Total ${formatPrice(totalPriceInCents)}.`
        )
      }
    }

    previousCartMetricsRef.current = {
      isOpen: true,
      totalItems,
      totalPriceInCents
    }
  }, [isOpen, totalItems, totalPriceInCents])

  useEffect(() => {
    const nextStockTones = new Map()
    const pulseTimers = stockTonePulseTimersRef.current

    cartItems.forEach((item) => {
      const itemId = String(item.id)
      const nextToneClass = getStockMessage(item).toneClass
      const previousToneClass = previousStockTonesRef.current.get(itemId)

      nextStockTones.set(itemId, nextToneClass)

      if (!previousToneClass || previousToneClass === nextToneClass) return

      setStockTonePulseById((current) => ({ ...current, [itemId]: true }))

      if (pulseTimers.has(itemId)) {
        clearTimeout(pulseTimers.get(itemId))
      }

      const timeoutId = setTimeout(() => {
        setStockTonePulseById((current) => {
          if (!current[itemId]) return current

          const next = { ...current }
          delete next[itemId]
          return next
        })
        pulseTimers.delete(itemId)
      }, STOCK_TONE_PULSE_MS)

      pulseTimers.set(itemId, timeoutId)
    })

    pulseTimers.forEach((timeoutId, itemId) => {
      if (nextStockTones.has(itemId)) return

      clearTimeout(timeoutId)
      pulseTimers.delete(itemId)
      setStockTonePulseById((current) => {
        if (!current[itemId]) return current

        const next = { ...current }
        delete next[itemId]
        return next
      })
    })

    previousStockTonesRef.current = nextStockTones
  }, [cartItems])

  useEffect(() => {
    return () => {
      stockTonePulseTimersRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
      stockTonePulseTimersRef.current.clear()
    }
  }, [])

  return (
    <>
      <button
        ref={floatingToggleRef}
        className={`cart-toggle cart-toggle--floating ${isToggleVisible ? 'is-visible' : ''} ${isToggleHiddenForModal ? 'is-hidden-for-modal' : ''}`}
        type="button"
        onClick={handleOpenCart}
        aria-haspopup="dialog"
        aria-expanded={isToggleVisible && isOpen && !isClosing}
        aria-label={`Open cart (${totalItems} items)`}
        aria-hidden={!isToggleVisible || isToggleHiddenForModal}
        tabIndex={isToggleVisible && !isToggleHiddenForModal ? 0 : -1}
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
            className={`cart-modal ${isClosing ? 'is-closing' : ''} ${renderedCartView === 'empty' ? 'cart-modal--empty' : ''}`}
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
                className="cart-icon-button cart-icon-button--close"
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
              >
                <CloseIcon size={18} aria-hidden="true" />
              </button>
            </header>
            <p className="cart-a11y-live" role="status" aria-live="polite" aria-atomic="true">
              {cartLiveMessage}
            </p>

            {renderedCartView === 'empty' ? (
              <div className={`cart-view cart-view--empty ${isCartViewClosing ? 'is-closing' : ''}`}>
                <div className="cart-empty">
                  <div className="cart-empty-icon" aria-hidden="true">
                    <CartAddIcon size={36} />
                  </div>
                  <p className="cart-empty-title">Your cart is empty</p>
                  <p className="cart-empty-text">
                    Add products from the catalog to see them here.
                  </p>
                  <button
                    ref={continueShoppingButtonRef}
                    className="cart-empty-cta"
                    type="button"
                    onClick={closeCart}
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className={`cart-view cart-view--items ${isCartViewClosing ? 'is-closing' : ''}`}>
                <ul className="cart-items">
                  {visibleCartItems.map((entry) => {
                    const { item, isExiting } = entry
                    const stockInfo = getStockMessage(item)
                    const lineTotalInCents = item.priceInCents * item.quantity

                    return (
                      <li
                        key={item.id}
                        className={`cart-item ${isExiting ? 'is-exiting' : ''}`}
                        ref={(node) => setCartItemElement(item.id, node)}
                      >
                        <div className="cart-item-head">
                          <div className="cart-item-thumb" aria-hidden="true">
                            <img
                              className="cart-item-image"
                              src={item.image}
                              alt=""
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          <div className="cart-item-main">
                            <div className="cart-item-title-row">
                              <p className="cart-item-title">{item.title}</p>
                              <span className="cart-item-line-total">
                                <span className="cart-item-line-total-label">Subtotal</span>
                                <strong>{formatPrice(lineTotalInCents)}</strong>
                              </span>
                            </div>
                            {item.brand ? <p className="cart-item-brand">{item.brand}</p> : null}
                            <p className="cart-item-meta">
                              <span className="cart-item-unit-price">{formatPrice(item.priceInCents)} each</span>
                            </p>
                          </div>
                        </div>

                        <div className="cart-item-controls">
                          <div className="cart-quantity-stepper" role="group" aria-label={`Quantity controls for ${item.title}`}>
                            <button
                              className="cart-icon-button cart-icon-button--stepper"
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={isExiting}
                              aria-label={`Decrease quantity of ${item.title}`}
                            >
                              <RemoveIcon size={16} aria-hidden="true" />
                            </button>

                            <span className="cart-quantity" aria-label="Quantity">
                              {item.quantity}
                            </span>

                            <button
                              className="cart-icon-button cart-icon-button--stepper"
                              type="button"
                              onClick={() => addToCart(item)}
                              disabled={isExiting || item.quantity >= item.stock}
                              aria-label={`Increase quantity of ${item.title}`}
                            >
                              <AddIcon size={16} aria-hidden="true" />
                            </button>
                          </div>

                          <p className={`cart-item-stock ${stockInfo.toneClass} ${stockTonePulseById[String(item.id)] ? 'is-tone-pulse' : ''}`}>
                            {stockInfo.text}
                          </p>

                          <button
                            className="cart-icon-button cart-icon-button--danger cart-item-remove"
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            disabled={isExiting}
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <TrashIcon size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <footer className="cart-footer">
              <p className="cart-total">
                <span className="cart-total-label">Total:</span>
                <strong className="cart-total-value">
                  {totalRollState.direction ? (
                    <span className={`cart-total-roll-track is-roll-${totalRollState.direction}`}>
                      <span className="cart-total-roll-number cart-total-roll-number--from">
                        {formatPrice(totalRollState.from)}
                      </span>
                      <span className="cart-total-roll-number cart-total-roll-number--to">
                        {formatPrice(totalRollState.to)}
                      </span>
                    </span>
                  ) : (
                    <span className="cart-total-value-text">
                      {formatPrice(totalRollState.to)}
                    </span>
                  )}
                </strong>
              </p>
              <button
                className="cart-clear"
                type="button"
                onClick={clearCart}
                disabled={!cartItems.length}
              >
                Clear cart
              </button>
            </footer>
          </aside>
        </div>
      )}
    </>
  )
}

export default CartPanel
