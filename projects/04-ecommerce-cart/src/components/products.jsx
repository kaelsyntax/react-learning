import './products.css'
import { CartIcon, FilterIcon } from './icons'
import { useFilters } from '../hooks/useFilters'

const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

function formatPrice(priceInCents) {
    return priceFormatter.format(priceInCents / 100)
}

function getInCartQuantity(cartItems, productId) {
    const cartItem = cartItems.find((item) => item.id === productId)
    return cartItem ? cartItem.quantity : 0
}

function Products({ products, cartItems = [], onAddToCart = () => {} }) {
    const { resetFilters, hasActiveFilters } = useFilters()

    if (!products.length) {
        return (
            <section className="products products--empty" aria-label="Products">
                <div className="products-empty-state" role="status" aria-live="polite">
                    <div className="products-empty-icon" aria-hidden="true">
                        <FilterIcon size={28} />
                    </div>
                    <p className="products-empty-title">No products match current filters</p>
                    <p className="products-empty-text">
                        Try widening your price range or choosing a different category.
                    </p>
                    {hasActiveFilters && (
                        <button
                            className="products-empty-reset"
                            type="button"
                            onClick={resetFilters}
                        >
                            Reset filters
                        </button>
                    )}
                </div>
            </section>
        )
    }

    return (
        <section className="products" aria-label="Products">
            <ul className="products-grid">
                {products.map((product, index) => {
                    const inCartQuantity = getInCartQuantity(cartItems, product.id)
                    const remainingStock = Math.max(product.stock - inCartQuantity, 0)
                    const isAtStockLimit = remainingStock === 0
                    const isOutOfStock = product.stock === 0
                    const needsTightImageCrop = [1, 3, 4, 12, 16].includes(product.id)
                    const cardEnterDelayMs = Math.min(index * 45, 280)

                    return (
                        <li
                            key={product.id}
                            className="product-card"
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
                                <strong className="product-price">
                                    {formatPrice(product.priceInCents)}
                                </strong>
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
                })}
            </ul>
        </section>
    )
}

export default Products
