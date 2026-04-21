import './products.css'
import { useFilters } from '../hooks/useFilters'
import { useProductsTransition } from '../hooks/useProductsTransition'
import ProductCard from './ProductCard'
import ProductsEmptyState from './ProductsEmptyState'

function getInCartQuantity(cartItems, productId) {
    const cartItem = cartItems.find((item) => item.id === productId)
    return cartItem ? cartItem.quantity : 0
}

function Products({
    products,
    cartItems = [],
    onIncreaseQuantity = () => {},
    onDecreaseQuantity = () => {}
}) {
    const { resetFilters, hasActiveFilters } = useFilters()
    const {
        visibleProducts,
        productsSectionRef,
        isEmptyMounted,
        isEmptyExiting,
        setProductCardElement
    } = useProductsTransition(products)

    if (isEmptyMounted) {
        return (
        <section
            ref={productsSectionRef}
            className="products products--empty"
            aria-label="Products"
        >
            <ProductsEmptyState
            isExiting={isEmptyExiting}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            />
        </section>
        )
    }

    const enterOrderByProductId = new Map(
        visibleProducts
        .filter((item) => !item.isExiting)
        .map((item, index) => [item.product.id, index])
    )

    const productCards = visibleProducts.map((item) => {
        const { product, isExiting } = item
        const inCartQuantity = getInCartQuantity(cartItems, product.id)
        const remainingStock = Math.max(product.stock - inCartQuantity, 0)
        const isAtStockLimit = remainingStock === 0
        const isOutOfStock = product.stock === 0
        const needsTightImageCrop = [1, 3, 4, 12, 16].includes(product.id)
        const enterSequence = enterOrderByProductId.get(product.id) ?? 0
        const cardEnterDelayMs = isExiting ? 0 : Math.min(enterSequence * 45, 280)

        return (
        <ProductCard
            key={product.id}
            product={product}
            isExiting={isExiting}
            cardRef={(node) => setProductCardElement(product.id, node)}
            cardEnterDelayMs={cardEnterDelayMs}
            needsTightImageCrop={needsTightImageCrop}
            isAtStockLimit={isAtStockLimit}
            isOutOfStock={isOutOfStock}
            inCartQuantity={inCartQuantity}
            remainingStock={remainingStock}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
        />
        )
    })

    return (
        <section ref={productsSectionRef} className="products" aria-label="Products">
        <ul className="products-grid">{productCards}</ul>
        </section>
    )
}

export default Products
