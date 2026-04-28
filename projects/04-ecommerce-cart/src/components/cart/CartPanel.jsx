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
const STEPPER_SYMBOL_PULSE_MS = 140
const CART_BADGE_ROLL_MS = 170

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
  const [badgeRollState, setBadgeRollState] = useState({
    from: totalItems,
    to: totalItems,
    direction: ''
  })
  const [badgeLiveMessage, setBadgeLiveMessage] = useState('')
  const continueShoppingButtonRef = useRef(null)
  const previousRenderedCartViewRef = useRef(renderedCartView)
  const previousBadgeCountRef = useRef(totalItems)
  const previousCartMetricsRef = useRef({
    isOpen: false,
    totalItems,
    totalPriceInCents
  })
  const [cartLiveMessage, setCartLiveMessage] = useState('')
  const [stockTonePulseById, setStockTonePulseById] = useState({})
  const previousStockTonesRef = useRef(new Map())
  const stockTonePulseTimersRef = useRef(new Map())
  const badgeLiveResetTimerRef = useRef(null)
  const pendingRemoveFocusRef = useRef(null)
  const [stepperSymbolPulseByKey, setStepperSymbolPulseByKey] = useState({})
  const stepperSymbolPulseTimersRef = useRef(new Map())

  useEffect(() => {
    if (!isCartViewClosing) return undefined

    const timeoutId = setTimeout(() => {
      setRenderedCartView(targetView)
    }, CART_VIEW_SWAP_MS)

    return () => clearTimeout(timeoutId)
  }, [isCartViewClosing, targetView])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBadgeRollState((current) => {
      if (totalItems === current.to) return current

      return {
        from: current.to,
        to: totalItems,
        direction: totalItems > current.to ? 'up' : 'down'
      }
    })
  }, [totalItems])

  useEffect(() => {
    if (!badgeRollState.direction) return undefined

    const timeoutId = setTimeout(() => {
      setBadgeRollState((current) => ({
        from: current.to,
        to: current.to,
        direction: ''
      }))
    }, CART_BADGE_ROLL_MS)

    return () => clearTimeout(timeoutId)
  }, [badgeRollState.direction])

  useEffect(() => {
    const previousBadgeCount = previousBadgeCountRef.current
    if (previousBadgeCount === totalItems) return

    if (!isOpen) {
      const delta = totalItems - previousBadgeCount
      const units = Math.abs(delta)
      const itemLabel = units === 1 ? 'item' : 'items'

      const nextMessage =
        totalItems === 0
          ? 'Cart is now empty.'
          : delta > 0
            ? `${units} ${itemLabel} added. ${totalItems} total in cart.`
            : `${units} ${itemLabel} removed. ${totalItems} total in cart.`

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBadgeLiveMessage(nextMessage)

      if (badgeLiveResetTimerRef.current) {
        clearTimeout(badgeLiveResetTimerRef.current)
      }

      badgeLiveResetTimerRef.current = setTimeout(() => {
        setBadgeLiveMessage('')
        badgeLiveResetTimerRef.current = null
      }, 1400)
    } else if (badgeLiveMessage) {
      setBadgeLiveMessage('')
      if (badgeLiveResetTimerRef.current) {
        clearTimeout(badgeLiveResetTimerRef.current)
        badgeLiveResetTimerRef.current = null
      }
    }

    previousBadgeCountRef.current = totalItems
  }, [totalItems, isOpen, badgeLiveMessage])

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const stockTonePulseTimers = stockTonePulseTimersRef.current

    return () => {
      stockTonePulseTimers.forEach((timeoutId) => clearTimeout(timeoutId))
      stockTonePulseTimers.clear()

      if (badgeLiveResetTimerRef.current) {
        clearTimeout(badgeLiveResetTimerRef.current)
        badgeLiveResetTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const stepperSymbolPulseTimers = stepperSymbolPulseTimersRef.current

    return () => {
      stepperSymbolPulseTimers.forEach((timeoutId) => clearTimeout(timeoutId))
      stepperSymbolPulseTimers.clear()
    }
  }, [])

  useEffect(() => {
    const pendingFocusTarget = pendingRemoveFocusRef.current
    if (!pendingFocusTarget || !isOpen || renderedCartView !== 'items') return

    const targetEntry = visibleCartItems.find(
      (entry) => String(entry.item.id) === pendingFocusTarget.itemId
    )

    if (!targetEntry || targetEntry.isExiting) return

    const modalElement = modalRef.current
    if (!modalElement) return

    const preferredSelectors = [
      'remove',
      'increase',
      'decrease'
    ].map(
      (action) =>
        `button[data-cart-item-id="${pendingFocusTarget.itemId}"][data-cart-action="${action}"]:not(:disabled)`
    )

    let nextFocusTarget = null

    for (const selector of preferredSelectors) {
      nextFocusTarget = modalElement.querySelector(selector)
      if (nextFocusTarget) break
    }

    if (!nextFocusTarget) {
      nextFocusTarget = modalElement.querySelector(
        'button[data-cart-action="remove"]:not(:disabled), button[data-cart-action="increase"]:not(:disabled), button[data-cart-action="decrease"]:not(:disabled)'
      )
    }

    if (nextFocusTarget) {
      nextFocusTarget.focus()
    }

    pendingRemoveFocusRef.current = null
  }, [visibleCartItems, renderedCartView, isOpen, modalRef])

  function handleRemoveWithFocus(itemId) {
    const currentIndex = cartItems.findIndex((item) => item.id === itemId)
    const nextFocusableItem =
      cartItems[currentIndex + 1] ?? cartItems[currentIndex - 1] ?? null

    pendingRemoveFocusRef.current = nextFocusableItem
      ? { itemId: String(nextFocusableItem.id) }
      : null

    removeFromCart(itemId)
  }

  function triggerStepperSymbolPulse(itemId, action) {
    const pulseKey = `${itemId}:${action}`
    const pulseTimers = stepperSymbolPulseTimersRef.current

    setStepperSymbolPulseByKey((current) => ({ ...current, [pulseKey]: true }))

    if (pulseTimers.has(pulseKey)) {
      clearTimeout(pulseTimers.get(pulseKey))
    }

    const timeoutId = setTimeout(() => {
      setStepperSymbolPulseByKey((current) => {
        if (!current[pulseKey]) return current

        const next = { ...current }
        delete next[pulseKey]
        return next
      })
      pulseTimers.delete(pulseKey)
    }, STEPPER_SYMBOL_PULSE_MS)

    pulseTimers.set(pulseKey, timeoutId)
  }

  function handleDecreaseWithFeedback(item) {
    triggerStepperSymbolPulse(item.id, 'decrease')
    decreaseQuantity(item.id)
  }

  function handleIncreaseWithFeedback(item) {
    triggerStepperSymbolPulse(item.id, 'increase')
    addToCart(item)
  }

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
        <span className="cart-badge" aria-hidden="true">
          {badgeRollState.direction ? (
            <span className={`cart-badge-roll-track is-roll-${badgeRollState.direction}`}>
              <span className="cart-badge-roll-number cart-badge-roll-number--from">
                {badgeRollState.from}
              </span>
              <span className="cart-badge-roll-number cart-badge-roll-number--to">
                {badgeRollState.to}
              </span>
            </span>
          ) : (
            <span className="cart-badge-value">{badgeRollState.to}</span>
          )}
        </span>
      </button>
      <p className="cart-a11y-live" role="status" aria-live="polite" aria-atomic="true">
        {badgeLiveMessage}
      </p>

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
                    const decreasePulseKey = `${item.id}:decrease`
                    const increasePulseKey = `${item.id}:increase`
                    const isDecreasePulsing = Boolean(stepperSymbolPulseByKey[decreasePulseKey])
                    const isIncreasePulsing = Boolean(stepperSymbolPulseByKey[increasePulseKey])

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
                              className={`cart-icon-button cart-icon-button--stepper ${isDecreasePulsing ? 'is-symbol-pulse is-symbol-pulse-down' : ''}`}
                              type="button"
                              onClick={() => handleDecreaseWithFeedback(item)}
                              disabled={isExiting}
                              data-cart-item-id={item.id}
                              data-cart-action="decrease"
                              aria-label={`Decrease quantity of ${item.title}`}
                            >
                              <RemoveIcon size={16} aria-hidden="true" />
                            </button>

                            <span className="cart-quantity" aria-label="Quantity">
                              {item.quantity}
                            </span>

                            <button
                              className={`cart-icon-button cart-icon-button--stepper ${isIncreasePulsing ? 'is-symbol-pulse is-symbol-pulse-up' : ''}`}
                              type="button"
                              onClick={() => handleIncreaseWithFeedback(item)}
                              disabled={isExiting || item.quantity >= item.stock}
                              data-cart-item-id={item.id}
                              data-cart-action="increase"
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
                            onClick={() => handleRemoveWithFocus(item.id)}
                            disabled={isExiting}
                            data-cart-item-id={item.id}
                            data-cart-action="remove"
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
