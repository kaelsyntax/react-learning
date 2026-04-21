import { useEffect, useRef, useState } from 'react'
import { AddIcon, CartIcon, RemoveIcon } from './icons'
import { formatPrice } from '../utils/format-price'

const STOCK_NOTICE_MS = 1400

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
  const [stockNotice, setStockNotice] = useState('')
  const noticeTimerRef = useRef(null)
  const canIncreaseQuantity = !isOutOfStock && !isAtStockLimit
  const shouldShowQuantityStepper = isOutOfStock || inCartQuantity > 0

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current)
      }
    }
  }, [])

  function showStockNotice(message) {
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current)
    }

    setStockNotice(message)
    noticeTimerRef.current = setTimeout(() => {
      setStockNotice('')
      noticeTimerRef.current = null
    }, STOCK_NOTICE_MS)
  }

  function handleIncrease() {
    if (!canIncreaseQuantity) {
      showStockNotice(isOutOfStock ? 'Out of stock' : 'No more stock available')
      return
    }

    setStockNotice('')
    onIncreaseQuantity(product)
  }

  function handleDecrease() {
    if (inCartQuantity === 0) return

    setStockNotice('')
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
        <span className="product-stock">
          {isOutOfStock
            ? 'No stock available'
            : inCartQuantity > 0
            ? `Remaining: ${remainingStock} (in cart: ${inCartQuantity})`
            : `Stock: ${product.stock}`}
        </span>
      </div>

      <div className="product-actions">
        {shouldShowQuantityStepper ? (
          <div className="product-quantity-stepper" role="group" aria-label={`Quantity controls for ${product.title}`}>
            <button
              className="product-stepper-button product-stepper-button--minus"
              type="button"
              onClick={handleDecrease}
              disabled={inCartQuantity === 0}
              aria-label={`Decrease quantity of ${product.title}`}
            >
              <RemoveIcon size={14} aria-hidden="true" />
            </button>

            <span className="product-quantity-value" aria-live="polite">
              {inCartQuantity}
            </span>

            <button
              className={`product-stepper-button product-stepper-button--plus ${canIncreaseQuantity ? '' : 'is-disabled'}`}
              type="button"
              onClick={handleIncrease}
              aria-disabled={!canIncreaseQuantity}
              aria-label={`Increase quantity of ${product.title}`}
            >
              <AddIcon size={14} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button className="product-add-button" type="button" onClick={handleIncrease}>
            <CartIcon size={16} aria-hidden="true" />
            <span>Add to cart</span>
          </button>
        )}

        <p className={`product-stock-notice ${stockNotice ? 'is-visible' : ''}`} aria-live="polite">
          {stockNotice}
        </p>
      </div>
    </li>
  )
}

export default ProductCard
