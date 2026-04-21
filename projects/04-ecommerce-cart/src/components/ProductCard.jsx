import { CartIcon } from './icons'
import { formatPrice } from '../utils/format-price'

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
  onAddToCart
}) {
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
        <button
          className="product-add-button"
          type="button"
          disabled={isAtStockLimit}
          onClick={() => onAddToCart(product)}
        >
          <CartIcon size={16} aria-hidden="true" />
          <span>
            {isOutOfStock
              ? 'Out of stock'
              : isAtStockLimit
              ? 'No more stock'
              : 'Add to cart'}
          </span>
        </button>
      </div>
    </li>
  )
}

export default ProductCard
