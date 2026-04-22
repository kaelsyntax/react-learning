import { useRef } from 'react'
import { AddIcon, CartIcon, RemoveIcon } from '../shared/icons'
import { formatPrice } from '../../utils/format-price'
import { useProductCardStepper } from '../../hooks/useProductCardStepper'

function ProductCard({
  product,
  isExiting,
  cardRef,
  cardEnterDelayMs,
  needsTightImageCrop,
  isAtStockLimit,
  isOutOfStock,
  inCartQuantity,
  remainingStock,
  onIncreaseQuantity,
  onDecreaseQuantity
}) {
  const displayedStock = isOutOfStock ? 0 : inCartQuantity > 0 ? remainingStock : product.stock
  const minusButtonRef = useRef(null)
  const plusButtonRef = useRef(null)
  const {
    stepperFeedback,
    canIncreaseQuantity,
    canShowQuantityStepper,
    shouldShowQuantityStepper,
    blockedIncreaseReason,
    handleIncrease,
    handleDecrease,
    handleStepperFocus,
    handleStepperBlur
  } = useProductCardStepper({
    product,
    isOutOfStock,
    isAtStockLimit,
    inCartQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity
  })

  function focusPlusButtonWithRetry() {
    const focusPlusButton = () => {
      if (!plusButtonRef.current) return false
      plusButtonRef.current.focus()
      return document.activeElement === plusButtonRef.current
    }

    requestAnimationFrame(() => {
      if (focusPlusButton()) return
      setTimeout(() => {
        focusPlusButton()
      }, 60)
    })
  }

  function handleStepperGroupBlur(event) {
    const nextFocusedNode = event.relatedTarget
    if (event.currentTarget.contains(nextFocusedNode)) return
    handleStepperBlur()
  }

  function handleStepperGroupFocus(event) {
    const focusTarget = event.target
    const isKeyboardStyleFocus =
      typeof focusTarget?.matches === 'function' && focusTarget.matches(':focus-visible')

    if (isKeyboardStyleFocus) {
      handleStepperFocus()
    }
  }

  function handleStepperKeyDown(event) {
    const increaseKeys = ['ArrowUp', 'ArrowRight']
    const decreaseKeys = ['ArrowDown', 'ArrowLeft']

    function focusButton(buttonRef) {
      if (!buttonRef.current || buttonRef.current.disabled) return
      buttonRef.current.focus()
    }

    if (increaseKeys.includes(event.key)) {
      event.preventDefault()
      focusButton(plusButtonRef)
      handleIncrease()
      return
    }

    if (decreaseKeys.includes(event.key)) {
      event.preventDefault()
      focusButton(minusButtonRef)
      handleDecrease()
    }
  }

  function handleAddButtonActivate(event) {
    const isKeyboardActivation = event.detail === 0
    handleIncrease()

    if (isKeyboardActivation) {
      event.currentTarget.blur()
      focusPlusButtonWithRetry()
    }
  }

  return (
    <li
      ref={cardRef}
      className={`product-card ${isExiting ? 'is-exiting' : ''}`}
      style={{ '--product-enter-delay': `${cardEnterDelayMs}ms` }}
    >
      <img
        className={`product-image ${needsTightImageCrop ? 'product-image--tight-crop' : ''}`}
        src={product.image}
        alt={product.title}
        loading="lazy"
      />

      <div className="product-content">
        <div className="product-category-row">
          <p className="product-category">{product.category}</p>
          <span
            className={`product-in-cart-badge ${inCartQuantity > 0 ? 'is-visible' : 'is-empty'}`}
            aria-hidden={inCartQuantity === 0}
            aria-label={inCartQuantity > 0 ? `${inCartQuantity} in cart` : undefined}
          >
            <span className="product-in-cart-label">In cart ·</span>
            <span className="product-in-cart-count-wrap" aria-live="polite">
              <span key={inCartQuantity} className="product-in-cart-count">
                {inCartQuantity}
              </span>
            </span>
          </span>
        </div>
        <h2 className="product-title">{product.title}</h2>
        <p className="product-brand">{product.brand}</p>
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-meta">
        <strong className="product-price">{formatPrice(product.priceInCents)}</strong>
        <span
          className={`product-stock ${stepperFeedback === 'blocked-plus' ? 'is-blocked' : ''}`}
        >
          {`Stock: ${displayedStock}`}
        </span>
      </div>

      <div className="product-actions">
        <div className="product-action-switcher">
          <button
            className={`product-add-button ${shouldShowQuantityStepper ? 'is-hidden' : 'is-visible'}`}
            type="button"
            onClick={handleAddButtonActivate}
            aria-hidden={canShowQuantityStepper && shouldShowQuantityStepper}
            tabIndex={shouldShowQuantityStepper ? -1 : 0}
          >
            <CartIcon size={16} aria-hidden="true" />
            <span>Add to cart</span>
          </button>

          <div
            className={`product-quantity-stepper ${shouldShowQuantityStepper ? 'is-visible' : 'is-hidden'}`}
            role="group"
            aria-label={`Quantity controls for ${product.title}`}
            aria-hidden={!shouldShowQuantityStepper}
            onFocus={handleStepperGroupFocus}
            onBlur={handleStepperGroupBlur}
            onKeyDown={handleStepperKeyDown}
          >
            <button
              className={`product-stepper-button product-stepper-button--minus ${stepperFeedback === 'minus' ? 'is-pulsing' : ''}`}
              type="button"
              ref={minusButtonRef}
              onClick={handleDecrease}
              disabled={!shouldShowQuantityStepper || inCartQuantity === 0}
              aria-label={`Decrease quantity of ${product.title}`}
              tabIndex={shouldShowQuantityStepper ? 0 : -1}
            >
              <RemoveIcon size={14} aria-hidden="true" />
            </button>

            <span
              className={`product-quantity-value ${stepperFeedback === 'plus' ? 'is-bump-up' : ''} ${stepperFeedback === 'minus' ? 'is-bump-down' : ''}`}
              aria-live="polite"
            >
              <span className={`product-quantity-text ${stepperFeedback === 'blocked-plus' ? 'is-blocked' : ''}`}>
                {inCartQuantity}
              </span>
            </span>

            <button
              className={`product-stepper-button product-stepper-button--plus ${canIncreaseQuantity ? '' : 'is-disabled'} ${stepperFeedback === 'plus' ? 'is-pulsing' : ''} ${stepperFeedback === 'blocked-plus' ? 'is-blocked-pulse' : ''}`}
              type="button"
              ref={plusButtonRef}
              onClick={handleIncrease}
              disabled={!shouldShowQuantityStepper}
              aria-disabled={!canIncreaseQuantity}
              aria-label={`Increase quantity of ${product.title}`}
              title={blockedIncreaseReason}
              tabIndex={shouldShowQuantityStepper ? 0 : -1}
            >
              <AddIcon size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProductCard
