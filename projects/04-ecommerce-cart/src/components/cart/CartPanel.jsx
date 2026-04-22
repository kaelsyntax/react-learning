import { useEffect, useId, useState } from 'react'
import { AddIcon, CartAddIcon, CartIcon, CloseIcon, RemoveIcon, TrashIcon } from '../shared/icons'
import { useCart } from '../../hooks/useCart'
import { useCartPanelModal } from '../../hooks/useCartPanelModal'
import { formatPrice } from '../../utils/format-price'
import './cart.css'

const CART_VIEW_SWAP_MS = 180
const CART_TOTAL_ROLL_MS = 210

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
  const hasItems = cartItems.length > 0
  const targetView = hasItems ? 'items' : 'empty'
  const [renderedCartView, setRenderedCartView] = useState(targetView)
  const isCartViewClosing = targetView !== renderedCartView
  const [totalRollState, setTotalRollState] = useState({
    from: totalPriceInCents,
    to: totalPriceInCents,
    direction: ''
  })

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
                  {cartItems.map((item) => {
                    const stockInfo = getStockMessage(item)

                    return (
                      <li key={item.id} className="cart-item">
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
                            <p className="cart-item-title">{item.title}</p>
                            <p className="cart-item-meta">
                              {formatPrice(item.priceInCents)} each
                            </p>
                          </div>
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
