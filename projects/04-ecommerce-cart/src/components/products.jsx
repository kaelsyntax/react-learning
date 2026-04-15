import './products.css'
import { CartIcon } from './icons'

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
    if (!products.length) {
        return <p className="products-empty">No products match current filters.</p>
    }

    return (
        <section className="products" aria-label="Products">
            <ul className="products-grid">
                {products.map((product) => {
                    const inCartQuantity = getInCartQuantity(cartItems, product.id)
                    const remainingStock = Math.max(product.stock - inCartQuantity, 0)
                    const isAtStockLimit = remainingStock === 0
                    const isOutOfStock = product.stock === 0

                    return (
                        <li key={product.id} className="product-card">
                            <img
                                className="product-image"
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
