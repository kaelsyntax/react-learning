import { useEffect, useRef, useState } from 'react'
import { AddIcon, CartIcon, RemoveIcon } from './icons'
import { formatPrice } from '../utils/format-price'

const STEPPER_FEEDBACK_MS = 220
const STEPPER_AUTO_COLLAPSE_MS = 2000

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
  const [stepperFeedback, setStepperFeedback] = useState('')
  const [isStepperCollapsed, setIsStepperCollapsed] = useState(false)
  const [stepperInteractionToken, setStepperInteractionToken] = useState(0)
  const feedbackTimerRef = useRef(null)
  const canIncreaseQuantity = !isOutOfStock && !isAtStockLimit
  const canShowQuantityStepper = isOutOfStock || inCartQuantity > 0
  const shouldShowQuantityStepper = canShowQuantityStepper && !isStepperCollapsed
  const displayedStock = isOutOfStock ? 0 : inCartQuantity > 0 ? remainingStock : product.stock

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isOutOfStock) {
      setIsStepperCollapsed(false)
      return
    }

    if (inCartQuantity === 0) {
      setIsStepperCollapsed(false)
    }
  }, [inCartQuantity, isOutOfStock])

  useEffect(() => {
    const shouldAutoCollapse = inCartQuantity > 0 && !isOutOfStock && !isStepperCollapsed
    if (!shouldAutoCollapse) return undefined

    const timeoutId = setTimeout(() => {
      setIsStepperCollapsed(true)
    }, STEPPER_AUTO_COLLAPSE_MS)

    return () => clearTimeout(timeoutId)
  }, [inCartQuantity, isOutOfStock, isStepperCollapsed, stepperInteractionToken])

  function markStepperInteraction() {
    setIsStepperCollapsed(false)
    setStepperInteractionToken((current) => current + 1)
  }

  function triggerStepperFeedback(type) {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current)
    }

    setStepperFeedback(type)
    feedbackTimerRef.current = setTimeout(() => {
      setStepperFeedback('')
      feedbackTimerRef.current = null
    }, STEPPER_FEEDBACK_MS)
  }

  function handleIncrease() {
    markStepperInteraction()

    if (!canIncreaseQuantity) {
      triggerStepperFeedback('blocked-plus')
      return
    }

    triggerStepperFeedback('plus')
    onIncreaseQuantity(product)
  }

  function handleDecrease() {
    markStepperInteraction()

    if (inCartQuantity === 0) return

    triggerStepperFeedback('minus')
    onDecreaseQuantity(product.id)
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
        <p className="product-category">{product.category}</p>
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
            onClick={handleIncrease}
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
          >
            <button
              className={`product-stepper-button product-stepper-button--minus ${stepperFeedback === 'minus' ? 'is-pulsing' : ''}`}
              type="button"
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
              onClick={handleIncrease}
              disabled={!shouldShowQuantityStepper}
              aria-disabled={!canIncreaseQuantity}
              aria-label={`Increase quantity of ${product.title}`}
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
