import './products.css'
import { useFilters } from '../../hooks/useFilters'
import { useProductsTransition } from '../../hooks/useProductsTransition'
import ProductCard from './ProductCard'
import ProductsEmptyState from './ProductsEmptyState'

const TIGHT_CROP_PRODUCT_IDS = new Set([1, 3, 4, 12, 16])

function getInCartQuantity(cartItems, productId) {
  const cartItem = cartItems.find((item) => item.id === productId)
  return cartItem ? cartItem.quantity : 0
}

function getEnterOrderByProductId(visibleProducts) {
  return new Map(
    visibleProducts
      .filter((item) => !item.isExiting)
      .map((item, index) => [item.product.id, index])
  )
}

function buildProductCardViewModel(item, cartItems, enterOrderByProductId) {
  const { product, isExiting } = item
  const inCartQuantity = getInCartQuantity(cartItems, product.id)
  const remainingStock = Math.max(product.stock - inCartQuantity, 0)
  const isAtStockLimit = remainingStock === 0
  const isOutOfStock = product.stock === 0
  const needsTightImageCrop = TIGHT_CROP_PRODUCT_IDS.has(product.id)
  const enterSequence = enterOrderByProductId.get(product.id) ?? 0
  const cardEnterDelayMs = isExiting ? 0 : Math.min(enterSequence * 45, 280)
  const shouldPrioritizeImage = !isExiting && enterSequence === 0

  return {
    product,
    isExiting,
    inCartQuantity,
    remainingStock,
    isAtStockLimit,
    isOutOfStock,
    needsTightImageCrop,
    cardEnterDelayMs,
    shouldPrioritizeImage
  }
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

  const enterOrderByProductId = getEnterOrderByProductId(visibleProducts)

  const productCards = visibleProducts.map((item) => {
    const cardViewModel = buildProductCardViewModel(
      item,
      cartItems,
      enterOrderByProductId
    )

    return (
      <ProductCard
        key={cardViewModel.product.id}
        product={cardViewModel.product}
        isExiting={cardViewModel.isExiting}
        cardRef={(node) => setProductCardElement(cardViewModel.product.id, node)}
        cardEnterDelayMs={cardViewModel.cardEnterDelayMs}
        shouldPrioritizeImage={cardViewModel.shouldPrioritizeImage}
        needsTightImageCrop={cardViewModel.needsTightImageCrop}
        isAtStockLimit={cardViewModel.isAtStockLimit}
        isOutOfStock={cardViewModel.isOutOfStock}
        inCartQuantity={cardViewModel.inCartQuantity}
        remainingStock={cardViewModel.remainingStock}
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
