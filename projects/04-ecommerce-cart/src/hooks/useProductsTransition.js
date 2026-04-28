import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const PRODUCT_EXIT_ANIMATION_MS = 220
const EMPTY_STATE_ANIMATION_MS = 220
const PRODUCT_FLIP_ANIMATION_MS = 280
const PRODUCT_PERSISTENT_REVEAL_MS = 220
const PRODUCTS_RESIZE_ANIMATION_MS = 220

function toVisibleProduct(product) {
  return {
    product,
    isExiting: false
  }
}

function buildVisibleProducts(previousVisibleProducts, nextProducts) {
  const nextProductsById = new Map(nextProducts.map((product) => [product.id, product]))
  const previousById = new Map(
    previousVisibleProducts.map((item) => [item.product.id, item])
  )
  const nextVisibleProducts = []

  nextProducts.forEach((product) => {
    const previousItem = previousById.get(product.id)

    if (previousItem) {
      nextVisibleProducts.push({
        product,
        isExiting: false
      })
      return
    }

    nextVisibleProducts.push(toVisibleProduct(product))
  })

  previousVisibleProducts.forEach((item) => {
    const id = item.product.id
    if (nextProductsById.has(id)) return

    nextVisibleProducts.push({
      product: item.product,
      isExiting: true
    })
  })

  return nextVisibleProducts
}

function clearSectionInlineStyles(sectionElement) {
  if (!sectionElement) return

  sectionElement.style.removeProperty('height')
  sectionElement.style.removeProperty('overflow')
  sectionElement.style.removeProperty('transition')
  sectionElement.style.removeProperty('will-change')
}

function hasMeaningfulMove(deltaX, deltaY) {
  return Math.abs(deltaX) >= 0.5 || Math.abs(deltaY) >= 0.5
}

function hasMeaningfulHeightChange(previousHeight, nextHeight) {
  return typeof previousHeight === 'number' && Math.abs(previousHeight - nextHeight) >= 1
}

function animatePersistentReveal(element, index) {
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

function animateFlipTransition(element, deltaX, deltaY) {
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
}

function useProductsTransition(products) {
  const [visibleProducts, setVisibleProducts] = useState(() =>
    products.map(toVisibleProduct)
  )
  const exitTimersRef = useRef(new Map())
  const cardElementsRef = useRef(new Map())
  const previousCardRectsRef = useRef(new Map())
  const productsSectionRef = useRef(null)
  const previousSectionHeightRef = useRef(null)
  const shouldAnimateSectionResizeRef = useRef(false)
  const skipNextSectionResizeAnimationRef = useRef(false)
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- transition state must sync with incoming products
    setVisibleProducts((previous) => buildVisibleProducts(previous, products))
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
        // Avoid extra layout reads on the exit path.
        skipNextSectionResizeAnimationRef.current = true
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
    const exitTimers = exitTimersRef.current
    const sectionElement = productsSectionRef.current

    return () => {
      exitTimers.forEach((timeoutId) => clearTimeout(timeoutId))
      exitTimers.clear()

      if (emptyExitTimerRef.current) {
        clearTimeout(emptyExitTimerRef.current)
      }

      if (sectionResizeTimeoutRef.current) {
        clearTimeout(sectionResizeTimeoutRef.current)
        sectionResizeTimeoutRef.current = null
      }

      clearSectionInlineStyles(sectionElement)
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
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
      if (!previousRect) {
        if (shouldAnimatePersistentCards) {
          animatePersistentReveal(element, index)
        }
        return
      }

      const deltaX = previousRect.left - nextRect.left
      const deltaY = previousRect.top - nextRect.top

      if (!hasMeaningfulMove(deltaX, deltaY)) {
        if (shouldAnimatePersistentCards) {
          animatePersistentReveal(element, index)
        }
        return
      }

      animateFlipTransition(element, deltaX, deltaY)
    })

    const currentSection = productsSectionRef.current

    if (skipNextSectionResizeAnimationRef.current) {
      skipNextSectionResizeAnimationRef.current = false
      clearSectionInlineStyles(currentSection)
      if (currentSection) {
        previousSectionHeightRef.current = currentSection.getBoundingClientRect().height
      }

      previousCardRectsRef.current = nextRects
      pendingFilterTransitionRef.current = false
      shouldAnimateSectionResizeRef.current = false
      return
    }

    if (currentSection && shouldAnimateSectionResize && !prefersReducedMotion) {
      const previousSectionHeight = previousSectionHeightRef.current
      const nextSectionHeight = currentSection.getBoundingClientRect().height

      if (hasMeaningfulHeightChange(previousSectionHeight, nextSectionHeight)) {
        if (sectionResizeTimeoutRef.current) {
          clearTimeout(sectionResizeTimeoutRef.current)
          sectionResizeTimeoutRef.current = null
        }

        currentSection.style.height = `${previousSectionHeight}px`
        currentSection.style.overflow = 'hidden'
        currentSection.style.willChange = 'height'
        currentSection.style.transition = 'none'

        requestAnimationFrame(() => {
          if (!currentSection.isConnected) return
          currentSection.style.transition = `height ${PRODUCTS_RESIZE_ANIMATION_MS}ms cubic-bezier(0.2, 0.75, 0.2, 1)`
          currentSection.style.height = `${nextSectionHeight}px`
        })

        sectionResizeTimeoutRef.current = setTimeout(() => {
          clearSectionInlineStyles(productsSectionRef.current)
          sectionResizeTimeoutRef.current = null
        }, PRODUCTS_RESIZE_ANIMATION_MS)
      } else {
        clearSectionInlineStyles(currentSection)
      }
    } else {
      clearSectionInlineStyles(currentSection)
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

      // eslint-disable-next-line react-hooks/set-state-in-effect -- empty-state mount must reflect transition state
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

  const setProductCardElement = useCallback((productId, node) => {
    if (node) {
      cardElementsRef.current.set(productId, node)
      return
    }

    cardElementsRef.current.delete(productId)
    previousCardRectsRef.current.delete(productId)
  }, [])

  return {
    visibleProducts,
    productsSectionRef,
    isEmptyMounted,
    isEmptyExiting,
    setProductCardElement
  }
}

export { useProductsTransition }
