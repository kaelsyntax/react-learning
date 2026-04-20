import { useEffect, useRef, useState } from 'react'
import './products.css'
import { CartIcon, FilterIcon } from './icons'
import { useFilters } from '../hooks/useFilters'

const PRODUCT_EXIT_ANIMATION_MS = 220

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

function toVisibleProduct(product) {
    return {
        product,
        isExiting: false
    }
}

function Products({ products, cartItems = [], onAddToCart = () => {} }) {
    const { resetFilters, hasActiveFilters } = useFilters()
    const [visibleProducts, setVisibleProducts] = useState(() =>
        products.map(toVisibleProduct)
    )
    const exitTimersRef = useRef(new Map())

    useEffect(() => {
        setVisibleProducts((previous) => {
            const nextProductsById = new Map(products.map((product) => [product.id, product]))
            const previousById = new Map(
                previous.map((item) => [item.product.id, item])
            )

            const nextVisible = []

            products.forEach((product) => {
                const previousItem = previousById.get(product.id)

                if (previousItem) {
                    nextVisible.push({
                        product,
                        isExiting: false
                    })
                    return
                }

                nextVisible.push(toVisibleProduct(product))
            })

            previous.forEach((item) => {
                const id = item.product.id
                if (nextProductsById.has(id)) return

                nextVisible.push({
                    product: item.product,
                    isExiting: true
                })
            })

            return nextVisible
        })
    }, [products])

    useEffect(() => {
        const timers = exitTimersRef.current

        visibleProducts.forEach((item) => {
            const id = item.product.id

            if (!item.isExiting) {
                if (timers.has(id)) {
                    clearTimeout(timers.get(id))
                    timers.delete(id)
                }
                return
            }

            if (timers.has(id)) return

            const timeoutId = setTimeout(() => {
                setVisibleProducts((current) =>
                    current.filter((currentItem) => currentItem.product.id !== id)
                )
                timers.delete(id)
            }, PRODUCT_EXIT_ANIMATION_MS)

            timers.set(id, timeoutId)
        })

        const currentIds = new Set(visibleProducts.map((item) => item.product.id))
        timers.forEach((timeoutId, id) => {
            if (currentIds.has(id)) return
            clearTimeout(timeoutId)
            timers.delete(id)
        })
    }, [visibleProducts])

    useEffect(() => {
        return () => {
            exitTimersRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
            exitTimersRef.current.clear()
        }
    }, [])

    const shouldShowEmptyState = products.length === 0 && visibleProducts.length === 0

    if (shouldShowEmptyState) {
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

    let enterSequence = 0
    const productCards = visibleProducts.map((item) => {
        const { product, isExiting } = item
        const inCartQuantity = getInCartQuantity(cartItems, product.id)
        const remainingStock = Math.max(product.stock - inCartQuantity, 0)
        const isAtStockLimit = remainingStock === 0
        const isOutOfStock = product.stock === 0
        const needsTightImageCrop = [1, 3, 4, 12, 16].includes(product.id)
        const cardEnterDelayMs = isExiting ? 0 : Math.min(enterSequence * 45, 280)

        if (!isExiting) {
            enterSequence += 1
        }

        return (
            <li
                key={product.id}
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
    })

    return (
        <section className="products" aria-label="Products">
            <ul className="products-grid">
                {productCards}
            </ul>
        </section>
    )
}

export default Products
