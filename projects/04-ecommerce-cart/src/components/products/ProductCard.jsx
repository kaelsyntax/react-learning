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
  const {
    stepperFeedback,
    canIncreaseQuantity,
    canShowQuantityStepper,
    shouldShowQuantityStepper,
    blockedIncreaseReason,
    handleIncrease,
    handleDecrease
  } = useProductCardStepper({
    product,
    isOutOfStock,
    isAtStockLimit,
    inCartQuantity,
    onIncreaseQuantity,
    onDecreaseQuantity
  })

  return (
    <li
      ref={cardRef}
      className={`product-card ${isExiting ? 'is-exiting' : ''}`}
      style={{ '--product-enter-delay': `${cardEnterDelayMs}ms` }}
    >
      <div className="product-image-wrap">
        {inCartQuantity > 0 && (
          <span className="product-in-cart-badge" aria-label={`${inCartQuantity} in cart`}>
            In cart · {inCartQuantity}
          </span>
        )}
        <img
          className={`product-image ${needsTightImageCrop ? 'product-image--tight-crop' : ''}`}
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

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
