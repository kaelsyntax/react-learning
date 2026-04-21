import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './products.css'
import { useFilters } from '../hooks/useFilters'
import ProductCard from './ProductCard'
import ProductsEmptyState from './ProductsEmptyState'

const PRODUCT_EXIT_ANIMATION_MS = 220
const EMPTY_STATE_ANIMATION_MS = 220
const PRODUCT_FLIP_ANIMATION_MS = 280
const PRODUCT_PERSISTENT_REVEAL_MS = 220
const PRODUCTS_RESIZE_ANIMATION_MS = 220

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
    const cardElementsRef = useRef(new Map())
    const previousCardRectsRef = useRef(new Map())
    const productsSectionRef = useRef(null)
    const previousSectionHeightRef = useRef(null)
    const shouldAnimateSectionResizeRef = useRef(false)
    const sectionResizeTimeoutRef = useRef(null)
    const pendingFilterTransitionRef = useRef(false)
    const emptyExitTimerRef = useRef(null)
    const [isEmptyMounted, setIsEmptyMounted] = useState(() => products.length === 0)
    const [isEmptyExiting, setIsEmptyExiting] = useState(false)

    useEffect(() => {
        const currentSection = productsSectionRef.current
        if (currentSection) {
            previousSectionHeightRef.current = currentSection.getBoundingClientRect().height
            shouldAnimateSectionResizeRef.current = true
        }

        pendingFilterTransitionRef.current = true

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
                const currentSection = productsSectionRef.current
                if (currentSection) {
                    previousSectionHeightRef.current = currentSection.getBoundingClientRect().height
                    shouldAnimateSectionResizeRef.current = true
                }

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
            if (emptyExitTimerRef.current) {
                clearTimeout(emptyExitTimerRef.current)
            }
            if (sectionResizeTimeoutRef.current) {
                clearTimeout(sectionResizeTimeoutRef.current)
                sectionResizeTimeoutRef.current = null
            }
            const currentSection = productsSectionRef.current
            if (currentSection) {
                currentSection.style.removeProperty('height')
                currentSection.style.removeProperty('overflow')
                currentSection.style.removeProperty('transition')
                currentSection.style.removeProperty('will-change')
            }
        }
    }, [])

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const previousRects = previousCardRectsRef.current
        const nextRects = new Map()
        const shouldAnimatePersistentCards = pendingFilterTransitionRef.current
        const shouldAnimateSectionResize = shouldAnimateSectionResizeRef.current

        visibleProducts.forEach((item, index) => {
            if (item.isExiting) return

            const id = item.product.id
            const element = cardElementsRef.current.get(id)
            if (!element) return

            const nextRect = element.getBoundingClientRect()
            nextRects.set(id, nextRect)

            if (prefersReducedMotion) return

            const previousRect = previousRects.get(id)
            const animatePersistentReveal = () => {
                element.animate(
                    [
                        { opacity: 0.76, transform: 'translateY(8px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ],
                    {
                        duration: PRODUCT_PERSISTENT_REVEAL_MS,
                        delay: Math.min(index * 24, 140),
                        easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)'
                    }
                )
            }

            if (!previousRect) {
                if (shouldAnimatePersistentCards) {
                    animatePersistentReveal()
                }
                return
            }

            const deltaX = previousRect.left - nextRect.left
            const deltaY = previousRect.top - nextRect.top

            const hasMeaningfulMove = Math.abs(deltaX) >= 0.5 || Math.abs(deltaY) >= 0.5

            if (!hasMeaningfulMove) {
                if (shouldAnimatePersistentCards) {
                    animatePersistentReveal()
                }
                return
            }

            element.animate(
                [
                    { transform: `translate(${deltaX}px, ${deltaY}px)` },
                    { transform: 'translate(0, 0)' }
                ],
                {
                    duration: PRODUCT_FLIP_ANIMATION_MS,
                    easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)'
                }
            )
        })

        const currentSection = productsSectionRef.current
        const clearSectionResizeStyles = () => {
            if (!currentSection) return
            currentSection.style.removeProperty('height')
            currentSection.style.removeProperty('overflow')
            currentSection.style.removeProperty('transition')
            currentSection.style.removeProperty('will-change')
        }

        if (
            currentSection &&
            shouldAnimateSectionResize &&
            !prefersReducedMotion
        ) {
            const previousSectionHeight = previousSectionHeightRef.current
            const nextSectionHeight = currentSection.getBoundingClientRect().height
            const hasMeaningfulHeightChange =
                typeof previousSectionHeight === 'number' &&
                Math.abs(previousSectionHeight - nextSectionHeight) >= 1

            if (hasMeaningfulHeightChange) {
                if (sectionResizeTimeoutRef.current) {
                    clearTimeout(sectionResizeTimeoutRef.current)
                    sectionResizeTimeoutRef.current = null
                }

                currentSection.style.height = `${previousSectionHeight}px`
                currentSection.style.overflow = 'hidden'
                currentSection.style.willChange = 'height'
                void currentSection.offsetHeight
                currentSection.style.transition = `height ${PRODUCTS_RESIZE_ANIMATION_MS}ms cubic-bezier(0.2, 0.75, 0.2, 1)`
                currentSection.style.height = `${nextSectionHeight}px`

                sectionResizeTimeoutRef.current = setTimeout(() => {
                    const sectionToCleanup = productsSectionRef.current
                    if (!sectionToCleanup) return
                    sectionToCleanup.style.removeProperty('height')
                    sectionToCleanup.style.removeProperty('overflow')
                    sectionToCleanup.style.removeProperty('transition')
                    sectionToCleanup.style.removeProperty('will-change')
                    sectionResizeTimeoutRef.current = null
                }, PRODUCTS_RESIZE_ANIMATION_MS)
            } else {
                clearSectionResizeStyles()
            }
        } else {
            clearSectionResizeStyles()
        }

        if (currentSection) {
            previousSectionHeightRef.current = currentSection.getBoundingClientRect().height
        }

        previousCardRectsRef.current = nextRects
        pendingFilterTransitionRef.current = false
        shouldAnimateSectionResizeRef.current = false
    }, [visibleProducts])

    const shouldShowEmptyState = products.length === 0 && visibleProducts.length === 0

    useEffect(() => {
        if (shouldShowEmptyState) {
            if (emptyExitTimerRef.current) {
                clearTimeout(emptyExitTimerRef.current)
                emptyExitTimerRef.current = null
            }
            setIsEmptyMounted(true)
            setIsEmptyExiting(false)
            return
        }

        if (!isEmptyMounted || isEmptyExiting) return

        setIsEmptyExiting(true)
        emptyExitTimerRef.current = setTimeout(() => {
            setIsEmptyMounted(false)
            setIsEmptyExiting(false)
            emptyExitTimerRef.current = null
        }, EMPTY_STATE_ANIMATION_MS)
    }, [shouldShowEmptyState, isEmptyMounted, isEmptyExiting])

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
            <ProductCard
                key={product.id}
                product={product}
                isExiting={isExiting}
                cardRef={(node) => {
                    if (node) {
                        cardElementsRef.current.set(product.id, node)
                        return
                    }

                    cardElementsRef.current.delete(product.id)
                    previousCardRectsRef.current.delete(product.id)
                }}
                cardEnterDelayMs={cardEnterDelayMs}
                needsTightImageCrop={needsTightImageCrop}
                isAtStockLimit={isAtStockLimit}
                isOutOfStock={isOutOfStock}
                inCartQuantity={inCartQuantity}
                remainingStock={remainingStock}
                onAddToCart={onAddToCart}
                formatPrice={formatPrice}
            />
        )
    })

    return (
        <section ref={productsSectionRef} className="products" aria-label="Products">
            <ul className="products-grid">
                {productCards}
            </ul>
        </section>
    )
}

export default Products
