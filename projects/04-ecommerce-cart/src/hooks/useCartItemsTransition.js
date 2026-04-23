import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const CART_ITEM_EXIT_ANIMATION_MS = 180
const CART_ITEM_FLIP_ANIMATION_MS = 240

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
  const exitTimersRef = useRef(new Map())

  useEffect(() => {
    setVisibleCartItems((previous) => buildVisibleCartItems(previous, cartItems))
  }, [cartItems])

  useEffect(() => {
    const timers = exitTimersRef.current

    visibleCartItems.forEach((entry) => {
      const id = entry.item.id

      if (!entry.isExiting) {
        if (timers.has(id)) {
          clearTimeout(timers.get(id))
          timers.delete(id)
        }
        return
      }

      if (timers.has(id)) return

      const timeoutId = setTimeout(() => {
        setVisibleCartItems((current) =>
          current.filter((currentEntry) => currentEntry.item.id !== id)
        )
        timers.delete(id)
      }, CART_ITEM_EXIT_ANIMATION_MS)

      timers.set(id, timeoutId)
    })

    const currentIds = new Set(visibleCartItems.map((entry) => entry.item.id))
    timers.forEach((timeoutId, id) => {
      if (currentIds.has(id)) return
      clearTimeout(timeoutId)
      timers.delete(id)
    })
  }, [visibleCartItems])

  useEffect(() => {
    return () => {
      exitTimersRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
      exitTimersRef.current.clear()
    }
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const nextRects = new Map()
    const previousRects = previousItemRectsRef.current

    visibleCartItems.forEach((entry) => {
      if (entry.isExiting) return

      const element = itemElementsRef.current.get(entry.item.id)
      if (!element) return

      const nextRect = element.getBoundingClientRect()
      nextRects.set(entry.item.id, nextRect)

      if (prefersReducedMotion) return

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
