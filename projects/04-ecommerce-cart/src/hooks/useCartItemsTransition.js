import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const CART_ITEM_EXIT_ANIMATION_MS = 180
const CART_ITEM_FLIP_ANIMATION_MS = 220

function toVisibleCartItem(item, isExiting = false) {
  return {
    item,
    isExiting
  }
}

function hasMeaningfulMove(deltaX, deltaY) {
  return Math.abs(deltaX) >= 0.5 || Math.abs(deltaY) >= 0.5
}

function buildVisibleCartItems(previousVisibleCartItems, nextCartItems) {
  const nextById = new Map(nextCartItems.map((item) => [item.id, item]))
  const consumedIds = new Set()
  const nextVisibleItems = []

  previousVisibleCartItems.forEach((entry) => {
    const id = entry.item.id
    const nextItem = nextById.get(id)

    if (nextItem) {
      consumedIds.add(id)
      nextVisibleItems.push(toVisibleCartItem(nextItem, false))
      return
    }

    nextVisibleItems.push(toVisibleCartItem(entry.item, true))
  })

  nextCartItems.forEach((item) => {
    if (consumedIds.has(item.id)) return
    nextVisibleItems.push(toVisibleCartItem(item, false))
  })

  return nextVisibleItems
}

function useCartItemsTransition(cartItems) {
  const [visibleCartItems, setVisibleCartItems] = useState(() =>
    cartItems.map((item) => toVisibleCartItem(item))
  )
  const itemElementsRef = useRef(new Map())
  const previousItemRectsRef = useRef(new Map())
  const exitAnimationsRef = useRef(new Map())
  const skipNextFlipRef = useRef(false)

  const removeVisibleItem = useCallback((itemId) => {
    setVisibleCartItems((current) =>
      current.filter((currentEntry) => currentEntry.item.id !== itemId)
    )
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCartItems((previous) => buildVisibleCartItems(previous, cartItems))
  }, [cartItems])

  useEffect(() => {
    const activeExits = exitAnimationsRef.current
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    visibleCartItems.forEach((entry) => {
      const id = entry.item.id

      if (!entry.isExiting) {
        if (activeExits.has(id)) {
          const activeExit = activeExits.get(id)

          if (activeExit.animation) {
            activeExit.animation.cancel()
          }

          if (activeExit.timeoutId) {
            clearTimeout(activeExit.timeoutId)
          }

          activeExits.delete(id)
        }

        const element = itemElementsRef.current.get(id)
        if (element) {
          element.style.removeProperty('height')
          element.style.removeProperty('min-height')
          element.style.removeProperty('overflow')
          element.style.removeProperty('will-change')
        }
        return
      }

      if (activeExits.has(id)) return

      if (prefersReducedMotion) {
        removeVisibleItem(id)
        return
      }

      const element = itemElementsRef.current.get(id)
      if (!element) {
        const timeoutId = setTimeout(() => {
          activeExits.delete(id)
          removeVisibleItem(id)
        }, CART_ITEM_EXIT_ANIMATION_MS)

        activeExits.set(id, { timeoutId })
        return
      }

      const computedStyles = getComputedStyle(element)
      const currentRect = element.getBoundingClientRect()
      const currentHeight = Math.max(currentRect.height, 1)

      element.style.height = `${currentHeight}px`
      element.style.minHeight = `${currentHeight}px`
      element.style.overflow = 'hidden'
      element.style.willChange = 'height, min-height, opacity, transform, padding, margin'

      const animation = element.animate(
        [
          {
            height: `${currentHeight}px`,
            minHeight: `${currentHeight}px`,
            opacity: 1,
            transform: 'translateY(0)',
            paddingTop: computedStyles.paddingTop,
            paddingBottom: computedStyles.paddingBottom,
            marginTop: computedStyles.marginTop,
            marginBottom: computedStyles.marginBottom,
            borderColor: computedStyles.borderColor
          },
          {
            height: '0px',
            minHeight: '0px',
            opacity: 0,
            transform: 'translateY(4px)',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginTop: '0px',
            marginBottom: '0px',
            borderColor: 'rgba(148, 163, 184, 0)'
          }
        ],
        {
          duration: 170,
          easing: 'cubic-bezier(0.24, 0.7, 0.34, 1)',
          fill: 'forwards'
        }
      )

      const finishExit = () => {
        if (!activeExits.has(id)) return

        const activeExit = activeExits.get(id)
        if (activeExit?.timeoutId) {
          clearTimeout(activeExit.timeoutId)
        }

        activeExits.delete(id)
        skipNextFlipRef.current = true
        removeVisibleItem(id)
      }

      animation.addEventListener('finish', finishExit, { once: true })

      const timeoutId = setTimeout(() => {
        finishExit()
      }, CART_ITEM_EXIT_ANIMATION_MS + 80)

      activeExits.set(id, { animation, timeoutId })
    })

    const currentIds = new Set(visibleCartItems.map((entry) => entry.item.id))
    activeExits.forEach((activeExit, id) => {
      if (currentIds.has(id)) return

      if (activeExit.animation) {
        activeExit.animation.cancel()
      }

      if (activeExit.timeoutId) {
        clearTimeout(activeExit.timeoutId)
      }

      activeExits.delete(id)
    })
  }, [visibleCartItems, removeVisibleItem])

  useEffect(() => {
    return () => {
      exitAnimationsRef.current.forEach((activeExit) => {
        if (activeExit.animation) {
          activeExit.animation.cancel()
        }

        if (activeExit.timeoutId) {
          clearTimeout(activeExit.timeoutId)
        }
      })

      exitAnimationsRef.current.clear()
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const nextRects = new Map()
    const previousRects = previousItemRectsRef.current
    const hasExitingItems =
      visibleCartItems.some((entry) => entry.isExiting) ||
      exitAnimationsRef.current.size > 0
    const shouldSkipFlip = skipNextFlipRef.current

    if (shouldSkipFlip) {
      skipNextFlipRef.current = false
    }

    visibleCartItems.forEach((entry) => {
      if (entry.isExiting) return

      const element = itemElementsRef.current.get(entry.item.id)
      if (!element) return

      const nextRect = element.getBoundingClientRect()
      nextRects.set(entry.item.id, nextRect)

      if (prefersReducedMotion) return
      if (hasExitingItems) return
      if (shouldSkipFlip) return

      const previousRect = previousRects.get(entry.item.id)
      if (!previousRect) return

      const deltaX = previousRect.left - nextRect.left
      const deltaY = previousRect.top - nextRect.top

      if (!hasMeaningfulMove(deltaX, deltaY)) return

      element.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: 'translate(0, 0)' }
        ],
        {
          duration: CART_ITEM_FLIP_ANIMATION_MS,
          easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)'
        }
      )
    })

    previousItemRectsRef.current = nextRects
  }, [visibleCartItems])

  const setCartItemElement = useCallback((itemId, node) => {
    if (node) {
      itemElementsRef.current.set(itemId, node)
      return
    }

    itemElementsRef.current.delete(itemId)
    previousItemRectsRef.current.delete(itemId)
  }, [])

  return {
    visibleCartItems,
    setCartItemElement
  }
}

export { useCartItemsTransition }
